import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth, requireAuth } from "./auth";

export function registerRoutes(app: Express): Server {
  // Auth middleware
  setupAuth(app);

  // Chat routes
  // app.post('/api/chat/message', requireAuth, async (req: any, res) => {
  //   try {
  //     const { message } = req.body;
      
  //     if (!message || typeof message !== 'string' || message.trim().length === 0) {
  //       return res.status(400).json({ message: "Message is required" });
  //     }

  //     const userId = req.user.id;
  //     const isAuthenticated = !!userId;
      
  //     // Call the askBot function
  //     const response = await askBot(message.trim(), isAuthenticated);
      
  //     res.json({ 
  //       response,
  //       timestamp: new Date().toISOString()
  //     });
  //   } catch (error) {
  //     console.error("Error processing message:", error);
  //     res.status(500).json({ message: "Failed to process message" });
  //   }
  // });

  const httpServer = createServer(app);
  return httpServer;
}
