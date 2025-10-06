import React, { useState } from 'react';
import { ChevronRight, RotateCcw } from 'lucide-react';

interface Choice {
  id: string;
  text: string;
  nextScene: string;
}

interface ChoiceMenuProps {
  choices: Choice[];
  onChoiceSelect: (choice: Choice) => void;
  onReplay?: () => void;
  isVisible: boolean;
}

export const ChoiceMenu: React.FC<ChoiceMenuProps> = ({
  choices,
  onChoiceSelect,
  onReplay,
  isVisible
}) => {
  const [hoveredChoice, setHoveredChoice] = useState<string | null>(null);

  if (!isVisible || !choices || choices.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20">
      <div className="bg-white/98 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-4 shadow-2xl border border-gray-200">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Lựa chọn của bạn
          </h3>
          <p className="text-gray-700">
            Hãy chọn con đường bạn muốn khám phá
          </p>
        </div>

        <div className="space-y-4">
          {choices.map((choice, index) => (
            <button
              key={choice.id}
              onClick={() => onChoiceSelect(choice)}
              onMouseEnter={() => setHoveredChoice(choice.id)}
              onMouseLeave={() => setHoveredChoice(null)}
              className={`w-full p-6 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                hoveredChoice === choice.id
                  ? 'bg-gradient-to-r from-red-500 to-amber-500 text-white shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200 text-orange-600 shadow-md hover:shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                      hoveredChoice === choice.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-300 text-gray-700'
                    }`}>
                      {index + 1}
                    </span>
                    <span className="font-semibold text-lg">
                      {choice.text}
                    </span>
                  </div>
                </div>
                <ChevronRight className={`w-6 h-6 transition-transform duration-300 ${
                  hoveredChoice === choice.id ? 'translate-x-1 text-white' : 'text-gray-500'
                }`} />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600">
              Mỗi lựa chọn sẽ dẫn bạn đến một hành trình khác nhau
            </p>
          </div>
          {onReplay && (
            <button
              onClick={onReplay}
              className="inline-flex items-center px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors ml-4"
              title="Xem lại cảnh này"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Xem lại
            </button>
          )}
        </div>
      </div>
    </div>
  );
};