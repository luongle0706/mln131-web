import React, { useState, useEffect } from 'react';
import { VideoPlayer } from './VideoPlayer';
import { ChoiceMenu } from './ChoiceMenu';
import { AnalysisContent } from './AnalysisContent';
import { Save, RotateCcw, Play, Trophy, BookOpen, GraduationCap } from 'lucide-react';

// Types defined inline to avoid import issues
interface Choice {
  id: string;
  text: string;
  nextScene: string;
}

interface Scene {
  id: string;
  video: string;
  title?: string;
  description?: string;
  choices?: Choice[];
  isEnding?: boolean;
  endingTitle?: string;
  endingDescription?: string;
}

interface GameState {
  currentScene: string;
  visitedScenes: string[];
  choiceHistory: Array<{
    sceneId: string;
    choiceId: string;
    choiceText: string;
  }>;
  completedEndings: string[];
  gameStarted: boolean;
}

interface GameSaveData {
  gameState: GameState;
  timestamp: number;
}

// Inline scenes data
const scenesData = {
  "startScene": "scene1",
  "scenes": {
    "scene1": {
      "id": "scene1",
      "video": "/videos/Scene1.mp4",
      "title": "Cảnh 1",
      "description": "Chọn một trong ba lựa chọn",
      "choices": [
        {
          "id": "choice_1",
          "text": "Dì ơi, thời đại bây giờ khác rồi ạ. Vợ chồng con bình đẳng, san sẻ với nhau là chuyện thường. Dì đừng suy nghĩ cổ hủ như vậy.",
          "nextScene": "scene1_choice1"
        },
        {
          "id": "choice_2",
          "text":  "Dạ... cũng có phần như dì nói. Con sẽ lựa lời khuyên bảo lại cô ấy sau ạ.",
          "nextScene": "scene1_choice2"
        },
        {
          "id": "choice_3",
          "text": "Vợ con đang có dự án gấp thật đó dì. Áp lực lắm ạ. Mong dì thông cảm cho cô ấy.",
          "nextScene": "scene1_choice3"
        }
      ]
    },
    "scene1_choice1": {
      "id": "scene1_choice1",
      "video": "/videos/Scene1_choice1.mp4",
      "title": "Kết quả lựa chọn 1",
      "description": "Bạn đã chọn lựa chọn 1",
      "choices": [
        {
          "id": "continue",
          "text": "Tiếp tục",
          "nextScene": "scene1_end"
        }
      ]
    },
    "scene1_choice2": {
      "id": "scene1_choice2",
      "video": "/videos/Scene1_choice2.mp4",
      "title": "Kết quả lựa chọn 2",
      "description": "Bạn đã chọn lựa chọn 2",
      "choices": [
        {
          "id": "continue",
          "text": "Tiếp tục",
          "nextScene": "scene1_end"
        }
      ]
    },
    "scene1_choice3": {
      "id": "scene1_choice3",
      "video": "/videos/Scene1_choice3.mp4",
      "title": "Kết quả lựa chọn 3",
      "description": "Bạn đã chọn lựa chọn 3",
      "choices": [
        {
          "id": "continue",
          "text": "Tiếp tục",
          "nextScene": "scene1_end"
        }
      ]
    },
    "scene1_end": {
      "id": "scene1_end",
      "video": "/videos/Scene1_end.mp4",
      "title": "Kết thúc Cảnh 1",
      "description": "Cảnh 1 đã kết thúc",
      "choices": [
        {
          "id": "continue_scene2",
          "text": "Tiếp tục đến Cảnh 2",
          "nextScene": "scene2"
        }
      ]
    },
    "scene2": {
      "id": "scene2",
      "video": "/videos/Scene2.mp4",
      "title": "Cảnh 2",
      "description": "Chọn một trong hai lựa chọn",
      "choices": [
        {
          "id": "choice_1",
          "text": "Mẹ, con biết trong chuyện này Trang cũng có phần sai khi chưa khéo léo. Mẹ đừng giận cô ấy nữa.",
          "nextScene": "scene2_choice1"
        },
        {
          "id": "choice_2",
          "text": "Con thấy Trang cũng có cái lý của nó. Mẹ và dì cũng không nên quá khắt khe, cổ hủ như vậy.",
          "nextScene": "scene2_choice2"
        }
      ]
    },
    "scene2_choice1": {
      "id": "scene2_choice1",
      "video": "/videos/Scene2_choice1.mp4",
      "title": "Kết quả lựa chọn 1",
      "description": "Bạn đã chọn lựa chọn 1 của Cảnh 2",
      "choices": [
        {
          "id": "continue",
          "text": "Tiếp tục",
          "nextScene": "scene3"
        }
      ]
    },
    "scene2_choice2": {
      "id": "scene2_choice2",
      "video": "/videos/Scene2_choice2.mp4",
      "title": "Kết quả lựa chọn 2",
      "description": "Bạn đã chọn lựa chọn 2 của Cảnh 2",
      "choices": [
        {
          "id": "continue",
          "text": "Tiếp tục",
          "nextScene": "scene3"
        }
      ]
    },
    "scene3": {
      "id": "scene3",
      "video": "/videos/Scene3.mp4",
      "title": "Cảnh 3",
      "description": "Chọn một trong ba lựa chọn",
      "choices": [
        {
          "id": "choice_1",
          "text": "Anh biết em đang dốc hết sức cho dự án này. Nhưng em à, đám giỗ hôm nay đối với mẹ không chỉ là một mâm cỗ. Nó là tất cả ký ức của mẹ về bà ngoại...",
          "nextScene": "scene3_choice1"
        },
        {
          "id": "choice_2",
          "text": "Trang, anh thực sự không hiểu nổi em nữa. Em có thực sự xem trọng gia đình này không vậy?",
          "nextScene": "scene3_choice2"
        },
        {
          "id": "choice_3",
          "text": "Thôi em đừng bận tâm. Mẹ và dì hơi quá đáng thôi. Anh hoàn toàn thông cảm cho em. Em mệt rồi, nghỉ ngơi đi.",
          "nextScene": "scene3_choice3"
        }
      ]
    },
    "scene3_choice1_A": {
      "id": "scene3_choice1_A",
      "video": "/videos/Scene3_choice1_A.mp4",
      "title": "Kết quả lựa chọn 1 (Đường A)",
      "description": "Bạn đã chọn lựa chọn 1 của Cảnh 3",
      "choices": [
        {
          "id": "continue",
          "text": "Tiếp tục",
          "nextScene": "scene3_end"
        }
      ]
    },
    "scene3_choice1_B": {
      "id": "scene3_choice1_B",
      "video": "/videos/Scene3_choice1_B.mp4",
      "title": "Kết quả lựa chọn 1 (Đường B)",
      "description": "Bạn đã chọn lựa chọn 1 của Cảnh 3",
      "choices": [
        {
          "id": "continue",
          "text": "Tiếp tục",
          "nextScene": "scene3_end"
        }
      ]
    },
    "scene3_choice2_A": {
      "id": "scene3_choice2_A",
      "video": "/videos/Scene3_choice2_A.mp4",
      "title": "Kết quả lựa chọn 2 (Đường A)",
      "description": "Bạn đã chọn lựa chọn 2 của Cảnh 3",
      "choices": [
        {
          "id": "continue",
          "text": "Tiếp tục",
          "nextScene": "scene4"
        }
      ]
    },
    "scene3_choice2_B": {
      "id": "scene3_choice2_B",
      "video": "/videos/Scene3_choice2_B.mp4",
      "title": "Kết quả lựa chọn 2 (Đường B)",
      "description": "Bạn đã chọn lựa chọn 2 của Cảnh 3",
      "choices": [
        {
          "id": "continue",
          "text": "Tiếp tục",
          "nextScene": "scene4"
        }
      ]
    },
    "scene3_choice3": {
      "id": "scene3_choice3",
      "video": "/videos/Scene3_choice3.mp4",
      "title": "Kết quả lựa chọn 3",
      "description": "Bạn đã chọn lựa chọn 3 của Cảnh 3",
      "choices": [
        {
          "id": "continue",
          "text": "Tiếp tục",
          "nextScene": "scene4"
        }
      ]
    },
    "scene3_end": {
      "id": "scene3_end",
      "video": "/videos/Scene3_end.mp4",
      "title": "Kết thúc Cảnh 3",
      "description": "Cảnh 3 đã kết thúc",
      "choices": [
        {
          "id": "continue",
          "text": "Tiếp tục đến Cảnh 4",
          "nextScene": "scene4"
        }
      ]
    },
    "scene4": {
      "id": "scene4",
      "video": "/videos/Scene4.mp4",
      "title": "Cảnh 4 - Kết thúc cuối cùng",
      "description": "Kết cục của bạn",
      "choices": []
    },
    "scene4_best": {
      "id": "scene4_best",
      "video": "/videos/Scene4_Best.mp4",
      "title": "Kết thúc tốt nhất",
      "description": "Bạn đã đạt được kết thúc tốt nhất",
      "isEnding": true,
      "endingTitle": "Kết thúc tốt nhất - Best Ending",
      "endingDescription": "Bạn đã hoàn thành câu chuyện với kết thúc tốt nhất!"
    },
    "scene4_good": {
      "id": "scene4_good",
      "video": "/videos/Scene4_Good.mp4",
      "title": "Kết thúc tốt",
      "description": "Bạn đã đạt được kết thúc tốt",
      "isEnding": true,
      "endingTitle": "Kết thúc tốt - Good Ending",
      "endingDescription": "Bạn đã hoàn thành câu chuyện với kết thúc tốt!"
    },
    "scene4_bad1": {
      "id": "scene4_bad1",
      "video": "/videos/Scene4_Bad1.mp4",
      "title": "Kết thúc xấu 1",
      "description": "Bạn đã đạt được kết thúc xấu",
      "isEnding": true,
      "endingTitle": "Kết thúc xấu - Bad Ending 1",
      "endingDescription": "Bạn đã hoàn thành câu chuyện với kết thúc xấu!"
    },
    "scene4_bad2": {
      "id": "scene4_bad2",
      "video": "/videos/Scene4_Bad2.mp4",
      "title": "Kết thúc xấu nhất",
      "description": "Bạn đã đạt được kết thúc xấu nhất",
      "isEnding": true,
      "endingTitle": "Kết thúc xấu nhất - Worst Ending",
      "endingDescription": "Bạn đã hoàn thành câu chuyện với kết thúc xấu nhất!"
    },
    "scene4_bad3": {
      "id": "scene4_bad3",
      "video": "/videos/Scene4_Bad3.mp4",
      "title": "Kết thúc xấu 3",
      "description": "Bạn đã đạt được kết thúc xấu",
      "isEnding": true,
      "endingTitle": "Kết thúc xấu - Bad Ending 3",
      "endingDescription": "Bạn đã hoàn thành câu chuyện với kết thúc xấu!"
    }
  }
};

const SAVE_KEY = 'visual_novel_save';

const initialGameState: GameState = {
  currentScene: scenesData.startScene,
  visitedScenes: [],
  choiceHistory: [],
  completedEndings: [],
  gameStarted: false
};

export const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [currentScene, setCurrentScene] = useState<Scene | null>(null);
  const [showChoices, setShowChoices] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [replayTrigger, setReplayTrigger] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showLearningSection, setShowLearningSection] = useState(false);

  useEffect(() => {
    loadGame();
  }, []);

  useEffect(() => {
    const scene = scenesData.scenes[gameState.currentScene as keyof typeof scenesData.scenes];
    if (scene) {
      setCurrentScene(scene as Scene);
      setShowChoices(false);
      setGameEnded(false);
    }
  }, [gameState.currentScene]);

  const saveGame = () => {
    const saveData: GameSaveData = {
      gameState,
      timestamp: Date.now()
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
  };

  const loadGame = () => {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        const saveData: GameSaveData = JSON.parse(saved);
        setGameState(saveData.gameState);
      }
    } catch (error) {
      console.error('Failed to load game:', error);
    }
  };

  const startNewGame = () => {
    setGameState({
      ...initialGameState,
      gameStarted: true,
      visitedScenes: [scenesData.startScene]
    });
  };

  const restartGame = () => {
    localStorage.removeItem(SAVE_KEY);
    setGameState(initialGameState);
    setShowChoices(false);
    setGameEnded(false);
    setShowAnalysis(false);
    setShowLearningSection(false);
  };

  const handleVideoEnd = () => {
    if (currentScene?.isEnding) {
      setGameEnded(true);
      setGameState(prev => ({
        ...prev,
        completedEndings: [...new Set([...prev.completedEndings, currentScene.id])]
      }));
      saveGame();
    } else if (currentScene?.choices && currentScene.choices.length > 0) {
      setShowChoices(true);
    }
  };

  const handleReplay = () => {
    setShowChoices(false);
    setReplayTrigger(prev => prev + 1); // Trigger video replay
  };

  const getConditionalScene = (baseScene: string, choice: Choice): string => {
    // Scene 3 Choice 1: depends on Scene 2 choice
    if (currentScene?.id === 'scene3' && choice.id === 'choice_1') {
      const scene2Choice = gameState.choiceHistory.find(h => h.sceneId === 'scene2');
      return scene2Choice?.choiceId === 'choice_1' ? 'scene3_choice1_A' : 'scene3_choice1_B';
    }

    // Scene 3 Choice 2: depends on Scene 1 choice
    if (currentScene?.id === 'scene3' && choice.id === 'choice_2') {
      const scene1Choice = gameState.choiceHistory.find(h => h.sceneId === 'scene1');
      return scene1Choice?.choiceId === 'choice_1' ? 'scene3_choice2_A' : 'scene3_choice2_B';
    }

    // Scene 4: depends on previously visited scenes
    if (baseScene === 'scene4') {
      const hasScene3Choice1A = gameState.visitedScenes.includes('scene3_choice1_A');
      const hasScene3Choice1B = gameState.visitedScenes.includes('scene3_choice1_B');
      const hasScene3Choice2A = gameState.visitedScenes.includes('scene3_choice2_A');
      const hasScene3Choice2B = gameState.visitedScenes.includes('scene3_choice2_B');
      const hasScene3Choice3 = gameState.visitedScenes.includes('scene3_choice3');
      const hasScene1Choice3 = gameState.choiceHistory.some(h => h.sceneId === 'scene1' && h.choiceId === 'choice_3');

      // Priority order based on requirements
      if (hasScene3Choice3 && hasScene1Choice3) {
        return 'scene4_bad3'; // Bad ending 3
      }
      if (hasScene3Choice1A) {
        return 'scene4_best'; // Best ending
      }
      if (hasScene3Choice1B) {
        return 'scene4_good'; // Good ending
      }
      if (hasScene3Choice2A || hasScene3Choice2B) {
        return 'scene4_bad2'; // Bad ending 2
      }
      if (hasScene3Choice3 ) {
        return 'scene4_bad1'; // Bad ending 1
      }
    }

    return baseScene;
  };

  const handleChoiceSelect = (choice: Choice) => {
    const nextScene = getConditionalScene(choice.nextScene, choice);

    const newGameState: GameState = {
      ...gameState,
      currentScene: nextScene,
      visitedScenes: [...new Set([...gameState.visitedScenes, nextScene])],
      choiceHistory: [
        ...gameState.choiceHistory,
        {
          sceneId: currentScene!.id,
          choiceId: choice.id,
          choiceText: choice.text
        }
      ]
    };

    setGameState(newGameState);
    setShowChoices(false);
    saveGame();
  };

  if (!gameState.gameStarted) {
    if (showLearningSection) {
      return (
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <button
                onClick={() => setShowLearningSection(false)}
                className="inline-flex items-center px-6 py-3 font-semibold rounded-full transition-all duration-300"
                style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              >
                ← Quay lại menu
              </button>
            </div>
            <AnalysisContent showCloseButton={false} />
          </div>
        </section>
      );
    }

    return (
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Trò chơi Tương tác
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hành trình khám phá tri thức thông qua trò chơi
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-red-600 to-amber-600 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-12 text-center text-white">
                <div className="mb-8">
                  <img
                    src="/lenin.png"
                    alt="Lenin"
                    className="w-24 h-24 mx-auto rounded-full shadow-2xl border-4 border-yellow-400"
                  />
                </div>

                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Chủ nghĩa xã hội khoa học
                </h3>

                <p className="text-xl text-red-100 mb-8 leading-relaxed">
                  Khám phá lý thuyết và thực tiễn thông qua những lựa chọn của bạn
                </p>

                <div className="space-y-4">
                  <button
                    onClick={startNewGame}
                    className="inline-flex items-center px-8 py-4 font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    style={{ backgroundColor: '#ffffff', color: '#dc2626' }}
                  >
                    <Play className="w-6 h-6 mr-2" />
                    Bắt đầu
                  </button>

                  {localStorage.getItem(SAVE_KEY) && (
                    <div>
                      <button
                        onClick={loadGame}
                        className="px-6 py-3 backdrop-blur-sm font-semibold rounded-full transition-all duration-300"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#ffffff' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                      >
                        Tiếp tục game đã lưu
                      </button>
                    </div>
                  )}

                  {gameState.completedEndings.length > 0 && (
                    <div>
                      <button
                        onClick={() => setShowLearningSection(true)}
                        className="inline-flex items-center px-8 py-4 font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        style={{
                          background: 'linear-gradient(to right, #3b82f6, #a855f7)',
                          color: '#ffffff'
                        }}
                      >
                        <GraduationCap className="w-6 h-6 mr-2" style={{ color: '#ffffff' }} />
                        Phần Học Tập
                      </button>
                      <p className="text-sm mt-2" style={{ color: '#fecaca' }}>Bạn đã mở khóa phần phân tích!</p>
                    </div>
                  )}
                </div>

                <div className="mt-8 text-red-200 text-sm">
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (gameEnded && currentScene?.isEnding) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl overflow-hidden shadow-2xl text-white p-12">
            <div className="text-center">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-6" />

              <h2 className="text-3xl font-bold mb-4">
                {currentScene.endingTitle}
              </h2>

              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {currentScene.endingDescription}
              </p>

              <div className="mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
                <h3 className="text-lg font-semibold mb-4">Hành trình của bạn:</h3>
                <div className="space-y-2 text-left max-h-40 overflow-y-auto">
                  {gameState.choiceHistory.map((choice, index) => (
                    <div key={index} className="text-blue-200 text-sm">
                      <span className="font-medium">Bước {index + 1}:</span> {choice.choiceText}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setShowAnalysis(true)}
                  className="inline-flex items-center px-8 py-3 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(to right, #22c55e, #10b981)',
                    color: '#ffffff'
                  }}
                >
                  <BookOpen className="w-5 h-5 mr-2" style={{ color: '#ffffff' }} />
                  Xem Phân Tích
                </button>

                <button
                  onClick={restartGame}
                  className="inline-flex items-center px-8 py-3 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  style={{ backgroundColor: '#ffffff', color: '#2563eb' }}
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Chơi lại
                </button>
              </div>

              <div className="mt-6 text-blue-200 text-sm">
                <p>🏆 Hoàn thành: {gameState.completedEndings.length} kết thúc</p>
                <p>📚 Đã khám phá: {gameState.visitedScenes.length} cảnh</p>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Modal */}
        {showAnalysis && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <AnalysisContent onClose={() => setShowAnalysis(false)} showCloseButton={true} />
            </div>
          </div>
        )}
      </section>
    );
  }

  if (!currentScene) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-gray-600 text-xl">Đang tải...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="game-section" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Trò chơi Tương tác
          </h2>
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="text-gray-600">
              <h3 className="text-2xl font-bold">{currentScene.title}</h3>
              {currentScene.description && (
                <p className="text-lg mt-1">{currentScene.description}</p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={saveGame}
                className="p-3 rounded-lg transition-colors"
                style={{ backgroundColor: '#16a34a', color: '#ffffff' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
                title="Lưu game"
              >
                <Save className="w-5 h-5" style={{ color: '#ffffff' }} />
              </button>

              <button
                onClick={restartGame}
                className="p-3 rounded-lg transition-colors"
                style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                title="Restart game"
              >
                <RotateCcw className="w-5 h-5" style={{ color: '#ffffff' }} />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <VideoPlayer
            key={currentScene.id}
            videoSrc={currentScene.video}
            onVideoEnd={handleVideoEnd}
            onReplay={handleReplay}
            replayTrigger={replayTrigger}
            title={currentScene.title}
          >
            <ChoiceMenu
              choices={currentScene.choices || []}
              onChoiceSelect={handleChoiceSelect}
              onReplay={handleReplay}
              isVisible={showChoices}
            />
          </VideoPlayer>

          <div className="mt-6 text-center text-gray-500 text-sm">
            <p>Cảnh đã khám phá: {gameState.visitedScenes.length} | Kết thúc hoàn thành: {gameState.completedEndings.length}</p>
          </div>
        </div>
      </div>
    </section>
  );
};