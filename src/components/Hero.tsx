import React from 'react'

export const Hero: React.FC = () => {
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
            <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Tìm hiểu thêm
            </button>
            <button className="px-8 py-4 border-2 border-red-600 text-red-600 font-semibold rounded-full hover:bg-red-600 hover:text-white transition-all duration-300">
              Xem Video
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