import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { type InsertHomestay } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Home, Edit, CheckCircle, Bot } from "lucide-react";

export default function Preview() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [homestayData, setHomestayData] = useState<InsertHomestay | null>(null);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    // Redirect to home if not authenticated
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }

    // Load homestay data from sessionStorage
    const storedData = sessionStorage.getItem("homestayData");
    if (storedData) {
      setHomestayData(JSON.parse(storedData));
    } else if (!isLoading) {
      // No data found, redirect back to dashboard
      setLocation("/");
    }
  }, [isAuthenticated, isLoading, toast, setLocation]);

  const createHomestayMutation = useMutation({
    mutationFn: async (data: InsertHomestay) => {
      return await apiRequest("POST", "/api/homestays", data);
    },
    onSuccess: () => {
      setShowLoadingModal(false);
      setShowSuccessModal(true);
      // Clear the stored data
      sessionStorage.removeItem("homestayData");
    },
    onError: (error: Error) => {
      setShowLoadingModal(false);
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi tạo homestay. Vui lòng thử lại.",
        variant: "destructive",
      });
    },
  });

  const handleGenerateChatbot = () => {
    if (!homestayData) return;
    
    setShowLoadingModal(true);
    createHomestayMutation.mutate(homestayData);
  };

  const handleBackToForm = () => {
    setLocation("/");
  };

  const handleCreateAnother = () => {
    setShowSuccessModal(false);
    sessionStorage.removeItem("homestayData");
    setLocation("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!isAuthenticated || !homestayData) {
    return null;
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
                <p className="text-xs text-gray-500">Preview & Deploy</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <img 
                src={user?.profileImageUrl || ""} 
                alt="User Avatar" 
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </span>
              <a href="/api/logout" className="text-sm text-gray-600 hover:text-gray-900">
                Đăng xuất
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Preview Page */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Xem Lại Thông Tin Homestay
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kiểm tra lại thông tin trước khi tạo chatbot AI cho homestay của bạn
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <span className="ml-3 text-lg font-semibold text-green-600">Thông tin homestay</span>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-primary rounded-full"></div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">2</div>
                <span className="ml-3 text-lg font-semibold text-primary">Xem lại & tạo chatbot</span>
              </div>
            </div>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl font-bold">Xem Lại Thông Tin</CardTitle>
                  <p className="text-blue-100 mt-2">Đảm bảo thông tin chính xác trước khi tạo chatbot</p>
                </div>
                <Button variant="secondary" onClick={handleBackToForm} className="bg-white text-primary hover:bg-gray-100">
                  <Edit className="w-4 h-4 mr-2" />
                  Chỉnh sửa
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Thông tin cơ bản</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">Tên:</span> {homestayData.ten || 'Chưa nhập'}</div>
                    <div><span className="text-gray-600">Địa chỉ:</span> {homestayData.diaChí || 'Chưa nhập'}</div>
                    <div><span className="text-gray-600">SĐT:</span> {homestayData.sdt || 'Chưa nhập'}</div>
                    <div><span className="text-gray-600">Email:</span> {homestayData.email || 'Chưa nhập'}</div>
                    <div><span className="text-gray-600">Website:</span> {homestayData.website || 'Chưa nhập'}</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Dịch vụ</h3>
                  <div className="flex flex-wrap gap-1">
                    {homestayData.dichVu && homestayData.dichVu.length > 0 ? (
                      homestayData.dichVu.map(service => (
                        <Badge key={service} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">Chưa chọn dịch vụ</span>
                    )}
                  </div>
                </div>
              </div>

              {/* FAQ */}
              {homestayData.faq && homestayData.faq.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Câu hỏi thường gặp</h3>
                  <div className="space-y-3">
                    {homestayData.faq.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3">
                        <div className="font-medium text-sm mb-1">Q: {item.q}</div>
                        <div className="text-gray-600 text-sm">A: {item.a}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Quán ăn gần đây</h3>
                  <p className="text-sm text-gray-600">{homestayData.quanAn || 'Chưa nhập'}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Hướng dẫn check-in</h3>
                  <p className="text-sm text-gray-600">{homestayData.checkin || 'Chưa nhập'}</p>
                </div>
              </div>

              {homestayData.luuY && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Lưu ý đặc biệt</h3>
                  <p className="text-sm text-gray-600">{homestayData.luuY}</p>
                </div>
              )}

              <div className="flex justify-between pt-8 border-t">
                <Button variant="outline" onClick={handleBackToForm}>
                  Quay lại
                </Button>
                <Button onClick={handleGenerateChatbot} className="bg-success hover:bg-green-600">
                  <Bot className="w-4 h-4 mr-2" />
                  Tạo Chatbot
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Loading Modal */}
      <Dialog open={showLoadingModal} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Đang tạo chatbot...</h3>
            <p className="text-gray-600">Vui lòng đợi trong giây lát</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-success">Thành công!</h3>
            <p className="text-gray-600 mb-6">✅ Đang tạo chatbot... Chúng tôi sẽ gửi kết quả qua email!</p>
            <Button onClick={handleCreateAnother} className="px-6">
              Tạo thêm chatbot
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
