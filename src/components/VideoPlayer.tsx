import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';

interface VideoPlayerProps {
  videoSrc: string;
  onVideoEnd: () => void;
  title?: string;
  onReplay?: () => void;
  replayTrigger?: number;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc,
  onVideoEnd,
  title,
  onReplay,
  replayTrigger
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);

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

  return (
    <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
      {title && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent z-10 p-4">
          <h3 className="text-white text-xl font-bold">{title}</h3>
        </div>
      )}

      {hasError ? (
        <div className="w-full aspect-video bg-gradient-to-br from-red-900 to-red-800 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-white text-2xl font-bold mb-2">Video không tải được</h3>
            <p className="text-red-200 mb-4">Đang chuyển tự động...</p>
            <div className="text-sm text-red-300">File: {videoSrc}</div>
          </div>
        </div>
      ) : (
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full aspect-video object-cover"
          onClick={togglePlay}
          autoPlay
        />
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white ml-1" />
            )}
          </button>

          <button
            onClick={handleReplay}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
            title="Replay scene"
          >
            <RotateCcw className="w-5 h-5 text-white" />
          </button>

          <div
            className="flex-1 h-2 bg-white/20 rounded-full cursor-pointer"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-red-500 rounded-full transition-all"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>

          <div className="text-white text-sm font-mono">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          <button
            onClick={toggleMute}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-white" />
            ) : (
              <Volume2 className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};