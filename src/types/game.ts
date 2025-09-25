export interface Choice {
  id: string;
  text: string;
  nextScene: string;
}

export interface Scene {
  id: string;
  video: string;
  title?: string;
  description?: string;
  choices?: Choice[];
  isEnding?: boolean;
  endingTitle?: string;
  endingDescription?: string;
}

export interface GameState {
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

export interface GameSaveData {
  gameState: GameState;
  timestamp: number;
}