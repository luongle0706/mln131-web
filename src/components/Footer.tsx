import React from 'react'
import { Book, Users, Heart } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="p-4 bg-red-600/20 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Book className="w-10 h-10 text-red-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Giáo Dục</h3>
            <p className="text-gray-400">
              Nâng cao nhận thức về vai trò của gia đình trong xã hội
            </p>
          </div>

          <div className="text-center">
            <div className="p-4 bg-amber-600/20 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Users className="w-10 h-10 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Cộng Đồng</h3>
            <p className="text-gray-400">
              Xây dựng cộng đồng gia đình mạnh mẽ và bền vững
            </p>
          </div>

          <div className="text-center">
            <div className="p-4 bg-pink-600/20 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Heart className="w-10 h-10 text-pink-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Tình Yêu</h3>
            <p className="text-gray-400">
              Lan tỏa những giá trị tình yêu và gia đình hạnh phúc
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
            Gia Đình trong Chủ nghĩa Xã hội Khoa học
          </h2>
          <p className="text-gray-400 mb-6">
            Dự án học tập môn Triết học - Chủ đề: Gia đình trong thời kỳ quá độ lên xã hội chủ nghĩa
          </p>
          <div className="text-sm text-gray-500">
            © 2024 - Dự án giáo dục môn MLN131 | FPT University 
          </div>
        </div>
      </div>
    </footer>
  )
}