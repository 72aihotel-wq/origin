import { useAuth } from "@/hooks/useAuth";
import { Bot, Clock, Users, Settings, Sparkles, MessageCircle, Star } from "lucide-react";

export default function Landing() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      {/* Navigation Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
                <Bot className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AIHotel</h1>
                <p className="text-xs text-gray-500">Powered by AI</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Hero Content */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              Công nghệ AI tiên tiến cho ngành khách sạn
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Tạo Chatbot AI Cho<br />
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Homestay Của Bạn
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Tự động hóa việc tư vấn và hỗ trợ khách hàng 24/7 với AI chatbot thông minh được tùy chỉnh riêng cho homestay của bạn.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a
                href="/api/login"
                className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Bắt Đầu Miễn Phí
              </a>
              <div className="text-center">
                <p className="text-sm text-gray-500">✨ Không cần thẻ tín dụng</p>
                <p className="text-sm text-gray-500">🚀 Thiết lập trong 5 phút</p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-sm border hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Tiết Kiệm Thời Gian</h3>
                <p className="text-gray-600">Tự động trả lời các câu hỏi thường gặp của khách hàng 24/7, giải phóng thời gian cho bạn</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Tăng Doanh Thu</h3>
                <p className="text-gray-600">Hỗ trợ khách hàng nhanh chóng và chuyên nghiệp, tăng tỷ lệ đặt phòng và hài lòng</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl mx-auto mb-6">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Dễ Dàng Cài Đặt</h3>
                <p className="text-gray-600">Chỉ cần điền thông tin homestay, AI sẽ tự động tạo chatbot thông minh cho bạn</p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Được Tin Tưởng Bởi Hàng Nghìn Homestay
              </h2>
              <p className="text-xl text-gray-600">AIHotel đang giúp các chủ homestay tiết kiệm thời gian và tăng doanh thu</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                <div className="text-gray-600">Homestay đang sử dụng</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-gray-600">Hỗ trợ khách hàng</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-gray-600">Độ hài lòng khách hàng</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">5 phút</div>
                <div className="text-gray-600">Thời gian thiết lập</div>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cách Hoạt Động
            </h2>
            <p className="text-xl text-gray-600 mb-12">Chỉ 3 bước đơn giản để có chatbot AI cho homestay của bạn</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full mx-auto mb-6 text-2xl font-bold">1</div>
                <h3 className="text-xl font-bold mb-3">Điền Thông Tin</h3>
                <p className="text-gray-600">Cung cấp thông tin chi tiết về homestay của bạn</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full mx-auto mb-6 text-2xl font-bold">2</div>
                <h3 className="text-xl font-bold mb-3">AI Tạo Chatbot</h3>
                <p className="text-gray-600">AI tự động tạo chatbot thông minh dựa trên thông tin của bạn</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full mx-auto mb-6 text-2xl font-bold">3</div>
                <h3 className="text-xl font-bold mb-3">Bắt Đầu Sử Dụng</h3>
                <p className="text-gray-600">Chatbot sẵn sàng hỗ trợ khách hàng 24/7</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sẵn Sàng Bắt Đầu?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Tham gia cùng hàng nghìn chủ homestay đang sử dụng AIHotel
            </p>
            <a
              href="/api/login"
              className="inline-flex items-center px-8 py-4 bg-white text-primary rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              Tạo Chatbot Miễn Phí
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
