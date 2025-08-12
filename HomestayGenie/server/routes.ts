import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertHomestaySchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Homestay routes
  app.post('/api/homestays', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Validate request body
      const result = insertHomestaySchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          message: "Dữ liệu không hợp lệ", 
          errors: validationError.details 
        });
      }

      // Get user info
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Store in database
      const homestay = await storage.createHomestay(userId, result.data);

      // Send to webhook
      const webhookData = {
        user: {
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
          email: user.email || '',
          avatar: user.profileImageUrl || ''
        },
        homestay: {
          ten: result.data.ten,
          dia_chi: result.data.diaChí,
          sdt: result.data.sdt,
          email: result.data.email || '',
          website: result.data.website || '',
          faq: result.data.faq || [],
          dich_vu: result.data.dichVu || [],
          quan_an: result.data.quanAn || '',
          checkin: result.data.checkin || '',
          luu_y: result.data.luuY || ''
        }
      };

      // Send to Make.com webhook
      try {
        const webhookResponse = await fetch('https://hook.eu2.make.com/sn4r70kgmnykglhuxkpr7y0dknu8gh3b', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData)
        });

        if (!webhookResponse.ok) {
          console.error('Webhook failed:', webhookResponse.status, webhookResponse.statusText);
        }
      } catch (webhookError) {
        console.error('Webhook error:', webhookError);
        // Don't fail the request if webhook fails
      }
      
      res.status(201).json({ 
        message: "✅ Đang tạo chatbot... Chúng tôi sẽ gửi kết quả qua email!",
        homestay 
      });
    } catch (error) {
      console.error("Error creating homestay:", error);
      res.status(500).json({ message: "Có lỗi xảy ra khi tạo homestay" });
    }
  });

  app.get('/api/homestays', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const homestays = await storage.getHomestaysByUser(userId);
      res.json(homestays);
    } catch (error) {
      console.error("Error fetching homestays:", error);
      res.status(500).json({ message: "Failed to fetch homestays" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
