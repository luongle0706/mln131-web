import React from 'react'

export const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-amber-600/20 to-yellow-600/20"></div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-red-700 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-6 leading-tight">
            Gia Đình
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 mb-8">
            trong Chủ nghĩa Xã hội Khoa học
          </h2>
        </div>

        <div className="animate-fade-in-up animation-delay-300">
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
            Khám phá vai trò của gia đình trong thời kỳ quá độ lên xã hội chủ nghĩa
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection('content-section')}
              className="px-8 py-4 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              style={{
                background: 'linear-gradient(to right, #dc2626, #b91c1c)',
                color: '#ffffff'
              }}
            >
              Tìm hiểu thêm
            </button>
            <button
              onClick={() => scrollToSection('game-section')}
              className="px-8 py-4 font-semibold rounded-full transition-all duration-300"
              style={{
                border: '2px solid #dc2626',
                color: '#dc2626',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#dc2626';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#dc2626';
              }}
            >
              Chơi game
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}