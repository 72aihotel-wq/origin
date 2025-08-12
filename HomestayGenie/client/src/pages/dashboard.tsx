import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertHomestaySchema, type InsertHomestay } from "@shared/schema";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Plus, Trash2 } from "lucide-react";

const services = [
  "Bữa sáng",
  "Wifi miễn phí", 
  "Đưa đón sân bay",
  "Hồ bơi",
  "Bãi đậu xe",
  "Máy lạnh",
  "Dọn phòng",
  "Nhà hàng"
];

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<InsertHomestay>({
    resolver: zodResolver(insertHomestaySchema),
    defaultValues: {
      ten: "",
      diaChí: "",
      sdt: "",
      email: "",
      website: "",
      dichVu: [],
      quanAn: "",
      checkin: "",
      luuY: "",
      faq: [{ q: "", a: "" }],
    },
  });

  // Redirect to home if not authenticated
  useEffect(() => {
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
  }, [isAuthenticated, isLoading, toast]);

  const onSubmit = (data: InsertHomestay) => {
    // Filter out empty FAQ entries
    const filteredFaq = data.faq?.filter(item => item.q.trim() && item.a.trim()) || [];
    const submissionData = { ...data, faq: filteredFaq };
    
    // Store data in sessionStorage and navigate to preview
    sessionStorage.setItem("homestayData", JSON.stringify(submissionData));
    setLocation("/preview");
  };

  const addFAQ = () => {
    const currentFaq = form.getValues("faq") || [];
    form.setValue("faq", [...currentFaq, { q: "", a: "" }]);
  };

  const removeFAQ = (index: number) => {
    const currentFaq = form.getValues("faq") || [];
    const newFaq = currentFaq.filter((_, i) => i !== index);
    form.setValue("faq", newFaq);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
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
                <Home className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AIHotel</h1>
                <p className="text-xs text-gray-500">Chatbot Setup</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <img 
                src={user?.profileImageUrl || ""} 
                alt="User Avatar" 
                className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
              />
              <span className="text-sm font-medium text-gray-700">
                {user?.firstName} {user?.lastName}
              </span>
              <a href="/api/logout" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Đăng xuất
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Page */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tạo Chatbot AI cho Homestay
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Điền thông tin chi tiết về homestay để AI tạo chatbot thông minh cho bạn
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">1</div>
                <span className="ml-3 text-lg font-semibold text-primary">Thông tin homestay</span>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-gray-300 rounded-full"></div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-lg font-bold">2</div>
                <span className="ml-3 text-lg text-gray-500">Xem lại & tạo chatbot</span>
              </div>
            </div>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-3xl font-bold text-center">Thông Tin Homestay</CardTitle>
              <p className="text-center text-blue-100 mt-2">Cung cấp thông tin chi tiết để tạo chatbot hoàn hảo</p>
            </CardHeader>
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Basic Information Section */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 pb-3 border-b border-gray-200">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Home className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Thông tin cơ bản</h3>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                      control={form.control}
                      name="ten"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tên homestay *</FormLabel>
                          <FormControl>
                            <Input placeholder="VD: Villa Hương Biển" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sdt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số điện thoại *</FormLabel>
                          <FormControl>
                            <Input placeholder="VD: 0903123456" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="diaChí"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Địa chỉ *</FormLabel>
                        <FormControl>
                          <Input placeholder="VD: 123 Trần Phú, Phường 4, Thành phố Đà Lạt" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email liên hệ</FormLabel>
                          <FormControl>
                            <Input placeholder="contact@villa.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input placeholder="https://villa.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Services */}
                  <FormField
                    control={form.control}
                    name="dichVu"
                    render={() => (
                      <FormItem>
                        <FormLabel>Dịch vụ có sẵn</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {services.map((service) => (
                            <FormField
                              key={service}
                              control={form.control}
                              name="dichVu"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={service}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(service)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), service])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== service
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {service}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Additional Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="quanAn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quán ăn gần đây</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="VD: Bún bò bà Đính (50m), Quán cơm Hương (100m)"
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="checkin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hướng dẫn check-in</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="VD: View biển tầng 3, cửa màu xanh"
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="luuY"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lưu ý đặc biệt</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="VD: Không bơi đêm, giữ im lặng sau 22h"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* FAQ Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <FormLabel>Câu hỏi thường gặp</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addFAQ}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Thêm câu hỏi
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {form.watch("faq")?.map((_, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`faq.${index}.q`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="Câu hỏi" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="flex gap-2">
                              <FormField
                                control={form.control}
                                name={`faq.${index}.a`}
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormControl>
                                      <Input placeholder="Câu trả lời" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              {form.watch("faq")?.length > 1 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeFAQ(index)}
                                  className="text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <Button type="submit" className="px-8">
                      Tiếp tục
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
