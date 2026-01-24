import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.nfts.list.path, async (req, res) => {
    const nfts = await storage.getNfts();
    res.json(nfts);
  });

  app.get(api.nfts.get.path, async (req, res) => {
    const nft = await storage.getNft(Number(req.params.id));
    if (!nft) {
      return res.status(404).json({ message: 'NFT not found' });
    }
    res.json(nft);
  });

  app.post(api.nfts.create.path, async (req, res) => {
    try {
      const input = api.nfts.create.input.parse(req.body);
      const nft = await storage.createNft(input);
      res.status(201).json(nft);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Initial seed if empty
  const existing = await storage.getNfts();
  if (existing.length === 0) {
    await storage.createNft({
      title: "Cyber Punk #2077",
      description: "A rare glitch art NFT from the future.",
      imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      priceSol: "1.5",
      ownerAddress: "8x...FakeAddress"
    });
    await storage.createNft({
      title: "Neon Genesis",
      description: "Abstract neon waves on the Solana blockchain.",
      imageUrl: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      priceSol: "2.0",
      ownerAddress: "9y...FakeAddress"
    });
    await storage.createNft({
      title: "Solana Ape",
      description: "Exclusive digital collectible.",
      imageUrl: "https://images.unsplash.com/photo-1622547748225-3fc4abd2d00d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      priceSol: "5.0",
      ownerAddress: "7z...FakeAddress"
    });
  }

  return httpServer;
}
