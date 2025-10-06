import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Maximize, Minimize } from 'lucide-react';

interface VideoPlayerProps {
  videoSrc: string;
  onVideoEnd: () => void;
  title?: string;
  onReplay?: () => void;
  replayTrigger?: number;
  children?: React.ReactNode;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc,
  onVideoEnd,
  title,
  onReplay,
  replayTrigger,
  children
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);
  const hideVolumeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      onVideoEnd();
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      setHasError(true);
      setTimeout(onVideoEnd, 3000);
    };
    const handleLoadedData = () => {
      video.play().catch(() => {
        // Auto-play failed, user can manually play
      });
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [onVideoEnd]);

  // Auto-play when videoSrc changes (scene transition) or component mounts
  useEffect(() => {
    if (videoRef.current) {
      setHasError(false);
      setCurrentTime(0);
      setDuration(0);
      setIsPlaying(false);

      const video = videoRef.current;

      const handleCanPlay = () => {
        video.play().catch(() => {
          // Auto-play failed, user can manually play
        });
      };

      video.addEventListener('canplay', handleCanPlay);

      // Always reload the video, even if src is the same
      video.load();

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [videoSrc, title]); // Also depend on title to force reload when scene changes

  // Handle external replay trigger
  useEffect(() => {
    if (replayTrigger && replayTrigger > 0 && videoRef.current) {
      const video = videoRef.current;
      video.currentTime = 0;
      video.play().catch(() => {
        // Auto-play failed
      });
    }
  }, [replayTrigger]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Maintain fullscreen state when video source changes
  useEffect(() => {
    if (isFullscreen && containerRef.current && !document.fullscreenElement) {
      // Re-enter fullscreen if we were in fullscreen but lost it due to re-render
      containerRef.current.requestFullscreen().catch(() => {
        // Failed to re-enter fullscreen
      });
    }
  }, [videoSrc, isFullscreen]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * duration;
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Replay failed
      });
    }
    if (onReplay) {
      onReplay();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);

    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }

    hideControlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
      if (hideVolumeTimeout.current) {
        clearTimeout(hideVolumeTimeout.current);
      }
    };
  }, []);

  const handleVolumeEnter = () => {
    setShowVolumeSlider(true);
    if (hideVolumeTimeout.current) {
      clearTimeout(hideVolumeTimeout.current);
    }
  };

  const handleVolumeLeave = () => {
    if (hideVolumeTimeout.current) {
      clearTimeout(hideVolumeTimeout.current);
    }
    hideVolumeTimeout.current = setTimeout(() => {
      setShowVolumeSlider(false);
    }, 200);
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-black rounded-lg overflow-hidden shadow-2xl aspect-video flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      {title && (
        <div className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 to-transparent z-10 p-4 transition-transform duration-300 ${
          showControls ? 'translate-y-0' : '-translate-y-full'
        }`}>
          <h3 className="text-xl font-bold" style={{ color: '#ffffff' }}>{title}</h3>
        </div>
      )}

      {hasError ? (
        <div className="w-full h-full bg-gradient-to-br from-red-900 to-red-800 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#ffffff' }}>Video không tải được</h3>
            <p className="mb-4" style={{ color: '#fecaca' }}>Đang chuyển tự động...</p>
            <div className="text-sm" style={{ color: '#fca5a5' }}>File: {videoSrc}</div>
          </div>
        </div>
      ) : (
        <video
          ref={videoRef}
          src={videoSrc}
          className="max-w-full max-h-full object-contain"
          onClick={togglePlay}
          autoPlay
        />
      )}

      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-transparent p-4 transition-transform duration-300 ${
        showControls ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="p-2 backdrop-blur-sm rounded-full transition-all"
            style={{ backgroundColor: 'rgba(31, 41, 55, 0.9)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(31, 41, 55, 0.9)'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" style={{ color: '#ffffff' }} />
            ) : (
              <Play className="w-6 h-6 ml-1" style={{ color: '#ffffff' }} />
            )}
          </button>

          <button
            onClick={handleReplay}
            className="p-2 backdrop-blur-sm rounded-full transition-all"
            style={{ backgroundColor: 'rgba(31, 41, 55, 0.9)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(31, 41, 55, 0.9)'}
            title="Replay scene"
          >
            <RotateCcw className="w-5 h-5" style={{ color: '#ffffff' }} />
          </button>

          <div
            className="flex-1 h-2 rounded-full cursor-pointer"
            style={{ backgroundColor: 'rgba(55, 65, 81, 0.8)' }}
            onClick={handleProgressClick}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                backgroundColor: '#ef4444'
              }}
            />
          </div>

          <div className="text-sm font-mono" style={{ color: '#ffffff' }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          <div
            className="relative"
            onMouseEnter={handleVolumeEnter}
            onMouseLeave={handleVolumeLeave}
          >
            <button
              onClick={toggleMute}
              className="p-2 backdrop-blur-sm rounded-full transition-all"
              style={{ backgroundColor: 'rgba(31, 41, 55, 0.9)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(31, 41, 55, 0.9)'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-6 h-6" style={{ color: '#ffffff' }} />
              ) : (
                <Volume2 className="w-6 h-6" style={{ color: '#ffffff' }} />
              )}
            </button>

            <div
              className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 backdrop-blur-sm rounded-lg transition-all duration-200 ${
                showVolumeSlider ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
              }`}
              style={{ backgroundColor: 'rgba(17, 24, 39, 0.95)' }}
              onMouseEnter={handleVolumeEnter}
              onMouseLeave={handleVolumeLeave}
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="h-24 w-2 rounded-full appearance-none cursor-pointer writing-mode-vertical-lr [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                style={{
                  WebkitAppearance: 'slider-vertical',
                  backgroundColor: '#374151'
                } as React.CSSProperties}
              />
            </div>
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-2 backdrop-blur-sm rounded-full transition-all"
            style={{ backgroundColor: 'rgba(31, 41, 55, 0.9)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(31, 41, 55, 0.9)'}
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <Minimize className="w-6 h-6" style={{ color: '#ffffff' }} />
            ) : (
              <Maximize className="w-6 h-6" style={{ color: '#ffffff' }} />
            )}
          </button>
        </div>
      </div>

      {children}
    </div>
  );
};