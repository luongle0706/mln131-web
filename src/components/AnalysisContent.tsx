import React from 'react';
import { BookOpen, Users, Heart, TrendingUp, X } from 'lucide-react';

interface AnalysisContentProps {
  onClose?: () => void;
  showCloseButton?: boolean;
}

export const AnalysisContent: React.FC<AnalysisContentProps> = ({ onClose, showCloseButton = true }) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl max-h-[80vh] overflow-y-auto">
      <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Phân Tích Chi Tiết So Sánh Với Giáo Trình</h2>
          </div>
          {showCloseButton && onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Đóng"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Section 1 */}
        <section className="border-l-4 border-blue-500 pl-6">
          <div className="flex items-start gap-4 mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                1. Phản Ánh "Sự Biến Đổi Sâu Sắc Trong Việc Thực Hiện Các Chức Năng Của Gia Đình"
              </h3>
              <p className="text-gray-600 italic">(Mục 3.1.2)</p>
            </div>
          </div>

          <div className="space-y-6 text-gray-700">
            <p className="leading-relaxed">
              Kịch bản đã thể hiện xuất sắc sự biến đổi này thông qua các nhân vật và tình tiết:
            </p>

            <div className="bg-blue-50 p-6 rounded-xl">
              <h4 className="font-bold text-lg text-blue-900 mb-3">
                • Biến đổi chức năng kinh tế và vai trò người phụ nữ:
              </h4>
              <div className="space-y-4 ml-4">
                <div>
                  <p className="font-semibold text-blue-800 mb-2">Giáo trình (Trang 138-139):</p>
                  <p className="italic bg-white p-4 rounded-lg">
                    "kinh tế gia đình đã có hai bước chuyển mang tính bước ngoặt: Thứ nhất, từ kinh tế tự cấp tự túc
                    thành kinh tế hàng hóa... Các gia đình Việt Nam đang tiến tới 'tiêu dùng sản phẩm do người khác làm ra'".
                    Vai trò của người phụ nữ thay đổi, họ tham gia lao động xã hội và độc lập kinh tế.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-blue-800 mb-2">Kịch bản:</p>
                  <p className="bg-white p-4 rounded-lg">
                    Nhân vật chị Trang là hiện thân hoàn hảo cho luận điểm này. Chị là giám đốc, lương cao hơn chồng,
                    là người lao động trí thức trong nền kinh tế thị trường. Đề xuất của chị về việc "nấu những món mình
                    nấu được còn lại thì cứ thuê ngoài" chính là biểu hiện rõ nét của việc gia đình trở thành một "đơn vị
                    tiêu dùng" thay vì "đơn vị sản xuất tự cấp tự túc" như truyền thống.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl">
              <h4 className="font-bold text-lg text-purple-900 mb-3">
                • Biến đổi chức năng văn hóa - xã hội hóa:
              </h4>
              <div className="space-y-4 ml-4">
                <div>
                  <p className="font-semibold text-purple-800 mb-2">Giáo trình (Trang 133):</p>
                  <p className="italic bg-white p-4 rounded-lg">
                    "Với chức năng văn hóa, gia đình là nơi lưu giữ truyền thống văn hóa của dân tộc... Những phong tục,
                    tập quán, sinh hoạt văn hóa của cộng đồng được thực hiện trong gia đình."
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-purple-800 mb-2">Kịch bản:</p>
                  <p className="bg-white p-4 rounded-lg">
                    Toàn bộ bối cảnh "Đám giỗ" chính là việc thực hiện chức năng văn hóa này. Đối với bà Hạnh, nấu từng
                    món ăn không chỉ là chuẩn bị một bữa cỗ, mà là một nghi lễ để "lưu giữ" và tái hiện lại ký ức, truyền
                    thống từ mẹ của bà (bà ngoại). Món "chè hạt sen" trở thành một biểu tượng văn hóa gia đình, một giá trị
                    cần được kế thừa.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-pink-50 p-6 rounded-xl">
              <h4 className="font-bold text-lg text-pink-900 mb-3">
                • Biến đổi chức năng tình cảm:
              </h4>
              <div className="space-y-4 ml-4">
                <div>
                  <p className="font-semibold text-pink-800 mb-2">Giáo trình (Trang 137-138):</p>
                  <p className="italic bg-white p-4 rounded-lg">
                    "Các thành viên ít quan tâm lo lắng đến nhau và giao tiếp với nhau hơn, làm cho mối quan hệ gia đình
                    trở nên rời rạc, lỏng lẻo..." do áp lực công việc và cuộc sống.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-pink-800 mb-2">Kịch bản:</p>
                  <p className="bg-white p-4 rounded-lg">
                    Xung đột ban đầu chính là biểu hiện của sự "rời rạc, lỏng lẻo" này. Chị Trang vì quá bận rộn với dự án
                    mà trở nên xa cách, thiếu sự kết nối tình cảm với các nghi lễ của gia đình chồng. Câu hỏi của bà Hạnh
                    "sau này có con liệu có lo cho con hay không hay sẽ chỉ thuê ngoài?" đã chạm đến nỗi lo sâu sắc về sự
                    xói mòn chức năng tình cảm và chăm sóc trong gia đình hiện đại.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="border-l-4 border-orange-500 pl-6">
          <div className="flex items-start gap-4 mb-4">
            <Users className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                2. Minh Họa "Mâu Thuẫn Giữa Các Thế Hệ và Hệ Giá Trị"
              </h3>
              <p className="text-gray-600 italic">(Mục 3.1.3)</p>
            </div>
          </div>

          <div className="space-y-6 text-gray-700">
            <p className="leading-relaxed">
              Đây là trục xung đột chính của câu chuyện và được thể hiện một cách sống động:
            </p>

            <div className="bg-orange-50 p-6 rounded-xl">
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-orange-800 mb-2">Giáo trình (Trang 141):</p>
                  <p className="italic bg-white p-4 rounded-lg">
                    "Thách thức lớn nhất đặt ra cho gia đình Việt Nam là mâu thuẫn giữa các thế hệ... Người già thường
                    hướng về các giá trị truyền thống, có xu hướng bảo thủ... Ngược lại, tuổi trẻ thường hướng tới những
                    giá trị hiện đại, có xu hướng phủ nhận yếu tố truyền thống."
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-orange-800 mb-2">Kịch bản:</p>
                  <div className="space-y-3 ml-4">
                    <div className="bg-white p-4 rounded-lg">
                      <p className="font-medium text-orange-700 mb-2">Thế hệ cũ (Bà Hạnh & Dì Bốn):</p>
                      <p>
                        Dì Bốn là hình mẫu cực đoan của tư tưởng "bảo thủ, cổ hủ" với những câu nói về "tôn ti trật tự",
                        "đội vợ lên đầu". Bà Hạnh thì tinh tế hơn, bà không phản đối con dâu đi làm, nhưng bà đại diện cho
                        "giá trị truyền thống" về tấm lòng, sự hiếu thảo và tầm quan trọng của việc duy trì nghi lễ gia đình.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <p className="font-medium text-orange-700 mb-2">Thế hệ trẻ (Chị Trang):</p>
                      <p>
                        Chị đại diện cho "giá trị hiện đại". Chị đề cao hiệu quả công việc, sự bình đẳng và tính hợp lý
                        (thuê ngoài cho đỡ vất vả). Ban đầu, thái độ của chị có thể được xem là "phủ nhận yếu tố truyền thống"
                        khi xem đám giỗ như một công việc cần hoàn thành hơn là một nghi lễ tình cảm.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <p className="font-medium text-orange-700 mb-2">Cầu nối (Anh Hùng):</p>
                      <p>
                        Nhân vật của người chơi được đặt vào vị trí trung gian, mắc kẹt giữa hai hệ giá trị này, buộc phải
                        tìm cách dung hòa.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="border-l-4 border-red-500 pl-6">
          <div className="flex items-start gap-4 mb-4">
            <Heart className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                3. Cho Thấy "Thách Thức Trong Quan Hệ Hôn Nhân và Vợ Chồng"
              </h3>
              <p className="text-gray-600 italic">(Mục 3.1.3)</p>
            </div>
          </div>

          <div className="space-y-6 text-gray-700">
            <div className="bg-red-50 p-6 rounded-xl">
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-red-800 mb-2">Giáo trình (Trang 136, 140-141):</p>
                  <p className="italic bg-white p-4 rounded-lg">
                    Bàn về hôn nhân một vợ một chồng, vợ chồng bình đẳng, tôn trọng lẫn nhau. Đồng thời cũng chỉ ra các
                    mặt trái như "quan hệ vợ chồng - gia đình lỏng lẻo; gia tăng tỷ lệ ly hôn, ly thân..."
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-red-800 mb-2">Kịch bản:</p>
                  <div className="space-y-3 ml-4">
                    <div className="bg-white p-4 rounded-lg">
                      <p className="font-medium text-red-700 mb-2">Bình đẳng và Đảo lộn vai trò truyền thống:</p>
                      <p>
                        Việc Trang có thu nhập cao hơn Hùng và Dì Bốn chất vấn chuyện Hùng có phải vào bếp không đã trực
                        tiếp đặt ra vấn đề về sự thay đổi cấu trúc quyền lực và vai trò giới trong gia đình hiện đại.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <p className="font-medium text-red-700 mb-2">Tôn trọng và Chia sẻ:</p>
                      <p>
                        Các lựa chọn của Hùng trong Cảnh 2 và 3 là bài kiểm tra về sự tôn trọng và thấu hiểu. Liệu anh có
                        tôn trọng áp lực công việc của vợ? Liệu anh có thấu hiểu được nỗi lòng của mẹ? Bad Ending 2 (ly hôn)
                        chính là kết cục khi sự tôn trọng và chia sẻ này hoàn toàn đổ vỡ.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="border-l-4 border-green-500 pl-6">
          <div className="flex items-start gap-4 mb-4">
            <BookOpen className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                4. Đề Xuất Hướng Giải Quyết Trùng Khớp Với "Phương Hướng Xây Dựng Gia Đình"
              </h3>
              <p className="text-gray-600 italic">(Mục 3.2)</p>
            </div>
          </div>

          <div className="space-y-6 text-gray-700">
            <div className="bg-green-50 p-6 rounded-xl">
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-green-800 mb-2">Giáo trình (Trang 142):</p>
                  <p className="italic bg-white p-4 rounded-lg">
                    "Thứ ba, kế thừa những giá trị của gia đình truyền thống đồng thời tiếp thu những tiến bộ của nhân loại
                    về gia đình trong xây dựng gia đình Việt Nam hiện nay."
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-green-800 mb-2">Kịch bản:</p>
                  <p className="mb-3 bg-white p-4 rounded-lg">
                    Các kết cục (endings) của visual novel chính là những minh họa cho việc thực hiện thành công hay thất bại
                    phương hướng này.
                  </p>

                  <div className="space-y-3 ml-4">
                    <div className="bg-gradient-to-r from-yellow-50 to-green-50 p-4 rounded-lg border-2 border-green-300">
                      <p className="font-medium text-green-700 mb-2">✨ Best Ending:</p>
                      <p>
                        Là sự thể hiện hoàn hảo nhất của phương hướng trên. Chị Trang không từ bỏ sự nghiệp ("tiếp thu tiến bộ")
                        nhưng chị đã học cách trân trọng và thể hiện tình cảm của mình qua một hành động mang đậm giá trị truyền
                        thống là nấu món chè hạt sen ("kế thừa giá trị"). Đây là sự dung hòa lý tưởng, tạo ra một mô hình gia đình
                        hiện đại nhưng vẫn giữ được "hồn cốt" truyền thống.
                      </p>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
                      <p className="font-medium text-red-700 mb-2">❌ Bad Endings:</p>
                      <p>
                        Thể hiện sự thất bại trong việc dung hòa. Hoặc là các giá trị xung đột không thể hòa giải (BE1, BE3),
                        hoặc là một bên hoàn toàn lấn át bên còn lại dẫn đến đổ vỡ (BE2).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
