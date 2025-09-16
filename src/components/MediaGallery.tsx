import React from 'react'
import { Play, Image, BookOpen } from 'lucide-react'

const mediaItems = [
  {
    type: 'video',
    title: 'Gia đình trong Thời kỳ Quá độ',
    description: 'Video giảng giải về vai trò của gia đình trong xã hội chủ nghĩa',
    thumbnail: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=250&fit=crop',
    duration: '15:30'
  },
  {
    type: 'image',
    title: 'Gia đình Hạnh phúc',
    description: 'Hình ảnh minh họa về gia đình lý tưởng trong xã hội mới',
    thumbnail: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=250&fit=crop'
  },
  {
    type: 'video',
    title: 'Tình yêu và Hôn nhân',
    description: 'Phân tích về quan niệm tình yêu trong chủ nghĩa xã hội',
    thumbnail: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=250&fit=crop',
    duration: '12:45'
  },
  {
    type: 'document',
    title: 'Tài liệu Tham khảo',
    description: 'Các bài viết và nghiên cứu về chủ đề gia đình',
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop'
  }
]

export const MediaGallery: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Thư viện Media
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Video, hình ảnh và tài liệu hỗ trợ việc học tập và nghiên cứu
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {mediaItems.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-red-100 to-amber-100 flex items-center justify-center">
                  <div className="text-center">
                    {item.type === 'video' && (
                      <Play className="w-16 h-16 text-red-600 mx-auto mb-4" />
                    )}
                    {item.type === 'image' && (
                      <Image className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                    )}
                    {item.type === 'document' && (
                      <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    )}
                    <p className="text-gray-600 font-medium">
                      {item.type === 'video' ? 'Video Content' :
                       item.type === 'image' ? 'Image Gallery' : 'Document'}
                    </p>
                  </div>
                </div>

                {item.type === 'video' && (
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-lg text-sm">
                    {item.duration}
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <button className="w-full py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300">
                      {item.type === 'video' ? 'Xem Video' :
                       item.type === 'image' ? 'Xem Hình ảnh' : 'Đọc Tài liệu'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Xem tất cả Media
          </button>
        </div>
      </div>
    </section>
  )
}