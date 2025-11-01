import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/orders", async (req, res) => {
    try {
      const validatedData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(validatedData);
      
      res.status(201).json({
        success: true,
        message: "Encomenda recebida com sucesso! Entraremos em contato em breve.",
        order,
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({
          success: false,
          message: validationError.message,
        });
      }
      
      res.status(500).json({
        success: false,
        message: "Erro ao processar encomenda. Por favor, tente novamente.",
      });
    }
  });

  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json({ orders });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erro ao carregar encomendas",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
