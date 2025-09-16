import React from 'react'
import { Heart, Home, Users, Sparkles } from 'lucide-react'

const sections = [
  {
    icon: <Home className="w-12 h-12 text-red-600" />,
    title: "Bản chất của Gia đình",
    content: "Gia đình là tế bào cơ bản của xã hội, nơi hình thành nhân cách và giá trị đạo đức của con người. Trong chế độ xã hội chủ nghĩa, gia đình được xây dựng trên nền tảng bình đẳng, dân chủ và tình yêu thương chân chính."
  },
  {
    icon: <Users className="w-12 h-12 text-amber-600" />,
    title: "Vai trò trong Thời kỳ Quá độ",
    content: "Trong thời kỳ quá độ lên chủ nghĩa xã hội, gia đình đóng vai trò quan trọng trong việc giáo dục thế hệ trẻ, bảo tồn và phát triển các giá trị văn hóa truyền thống tốt đẹp của dân tộc."
  },
  {
    icon: <Heart className="w-12 h-12 text-pink-600" />,
    title: "Tình yêu và Hôn nhân",
    content: "Hôn nhân xã hội chủ nghĩa được xây dựng trên cơ sở tình yêu chân thành, tôn trọng lẫn nhau và bình đẳng giữa nam nữ. Đây là nền tảng để xây dựng gia đình hạnh phúc và bền vững."
  },
  {
    icon: <Sparkles className="w-12 h-12 text-yellow-600" />,
    title: "Tương lai của Gia đình",
    content: "Gia đình trong xã hội chủ nghĩa sẽ ngày càng phát triển toàn diện, là nơi mỗi thành viên được phát huy tối đa khả năng, cống hiến cho xã hội và tận hưởng hạnh phúc chân chính."
  }
]

export const ContentSection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-white/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Nội dung chính
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tìm hiểu về các khía cạnh quan trọng của gia đình trong tư tưởng chủ nghĩa xã hội khoa học
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="group bg-white/90 rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl group-hover:from-red-50 group-hover:to-amber-50 transition-all duration-300">
                  {section.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 ml-4">
                  {section.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-10 py-4 bg-gradient-to-r from-red-600 to-amber-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Khám phá sâu hơn
          </button>
        </div>
      </div>
    </section>
  )
}