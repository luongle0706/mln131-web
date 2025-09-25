import React, { useState, useEffect } from 'react';
import { VideoPlayer } from './VideoPlayer';
import { ChoiceMenu } from './ChoiceMenu';
import { Save, RotateCcw, Play, Trophy } from 'lucide-react';

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
  "startScene": "intro",
  "scenes": {
    "intro": {
      "id": "intro",
      "video": "/src/assets/kr3F_BAVJ3TIika8.mp4",
      "title": "Khởi đầu cuộc hành trình",
      "description": "Bạn bắt đầu cuộc hành trình tìm hiểu về chủ nghĩa xã hội khoa học",
      "choices": [
        {
          "id": "choice_1",
          "text": "Tìm hiểu về lý thuyết cơ bản",
          "nextScene": "theory_basics"
        },
        {
          "id": "choice_2",
          "text": "Khám phá ứng dụng thực tế",
          "nextScene": "practical_application"
        }
      ]
    },
    "theory_basics": {
      "id": "theory_basics",
      "video": "/src/assets/525026152_25224336970500100_8476856148373079638_n.mp4",
      "title": "Lý thuyết cơ bản",
      "description": "Tìm hiểu các nguyên lý cốt lõi của chủ nghĩa xã hội khoa học",
      "choices": [
        {
          "id": "choice_3",
          "text": "Nghiên cứu sâu hơn về triết học",
          "nextScene": "philosophy_deep"
        },
        {
          "id": "choice_4",
          "text": "Chuyển sang nghiên cứu kinh tế",
          "nextScene": "economics_study"
        }
      ]
    },
    "practical_application": {
      "id": "practical_application",
      "video": "/src/assets/525026152_25224336970500100_8476856148373079638_n.mp4",
      "title": "Ứng dụng thực tế",
      "description": "Xem xét cách áp dụng chủ nghĩa xã hội trong đời sống",
      "choices": [
        {
          "id": "choice_5",
          "text": "Nghiên cứu về xã hội lý tưởng",
          "nextScene": "ideal_society"
        },
        {
          "id": "choice_6",
          "text": "Tìm hiểu về cách mạng",
          "nextScene": "revolution_path"
        }
      ]
    },
    "philosophy_deep": {
      "id": "philosophy_deep",
      "video": "/src/assets/525026152_25224336970500100_8476856148373079638_n.mp4",
      "title": "Triết học sâu sắc",
      "description": "Khám phá các khía cạnh triết học sâu sắc",
      "isEnding": true,
      "endingTitle": "Nhà tư tưởng",
      "endingDescription": "Bạn đã trở thành một nhà tư tưởng sâu sắc về chủ nghĩa xã hội khoa học"
    },
    "economics_study": {
      "id": "economics_study",
      "video": "/src/assets/525026152_25224336970500100_8476856148373079638_n.mp4",
      "title": "Nghiên cứu kinh tế",
      "description": "Phân tích các nguyên lý kinh tế xã hội chủ nghĩa",
      "isEnding": true,
      "endingTitle": "Nhà kinh tế học",
      "endingDescription": "Bạn đã thành thạo trong việc phân tích kinh tế xã hội chủ nghĩa"
    },
    "ideal_society": {
      "id": "ideal_society",
      "video": "/src/assets/525026152_25224336970500100_8476856148373079638_n.mp4",
      "title": "Xã hội lý tưởng",
      "description": "Khám phá mô hình xã hội lý tưởng",
      "isEnding": true,
      "endingTitle": "Người xây dựng xã hội",
      "endingDescription": "Bạn đã có tầm nhìn rõ ràng về xã hội lý tưởng"
    },
    "revolution_path": {
      "id": "revolution_path",
      "video": "/src/assets/525026152_25224336970500100_8476856148373079638_n.mp4",
      "title": "Con đường cách mạng",
      "description": "Tìm hiểu về quá trình cách mạng xã hội",
      "isEnding": true,
      "endingTitle": "Nhà cách mạng",
      "endingDescription": "Bạn đã hiểu sâu sắc về con đường cách mạng"
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

  const handleChoiceSelect = (choice: Choice) => {
    const newGameState: GameState = {
      ...gameState,
      currentScene: choice.nextScene,
      visitedScenes: [...new Set([...gameState.visitedScenes, choice.nextScene])],
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
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Trò chơi Tương tác
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hành trình khám phá tri thức thông qua những câu chuyện video tương tác
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

                <button
                  onClick={startNewGame}
                  className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Bắt đầu hành trình
                </button>

                {localStorage.getItem(SAVE_KEY) && (
                  <div className="mt-4">
                    <button
                      onClick={loadGame}
                      className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/30 transition-all duration-300"
                    >
                      Tiếp tục game đã lưu
                    </button>
                  </div>
                )}

                <div className="mt-8 text-red-200 text-sm">
                  <p>🏆 Hoàn thành: {gameState.completedEndings.length} kết thúc</p>
                  <p>📚 Đã khám phá: {gameState.visitedScenes.length} cảnh</p>
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

              <button
                onClick={restartGame}
                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Chơi lại
              </button>

              <div className="mt-6 text-blue-200 text-sm">
                <p>🏆 Hoàn thành: {gameState.completedEndings.length} kết thúc</p>
                <p>📚 Đã khám phá: {gameState.visitedScenes.length} cảnh</p>
              </div>
            </div>
          </div>
        </div>
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
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
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
                className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                title="Lưu game"
              >
                <Save className="w-5 h-5" />
              </button>

              <button
                onClick={restartGame}
                className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                title="Restart game"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <VideoPlayer
              key={currentScene.id}
              videoSrc={currentScene.video}
              onVideoEnd={handleVideoEnd}
              onReplay={handleReplay}
              replayTrigger={replayTrigger}
              title={currentScene.title}
            />

            <ChoiceMenu
              choices={currentScene.choices || []}
              onChoiceSelect={handleChoiceSelect}
              onReplay={handleReplay}
              isVisible={showChoices}
            />
          </div>

          <div className="mt-6 text-center text-gray-500 text-sm">
            <p>Cảnh đã khám phá: {gameState.visitedScenes.length} | Kết thúc hoàn thành: {gameState.completedEndings.length}</p>
          </div>
        </div>
      </div>
    </section>
  );
};