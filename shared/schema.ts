import { pgTable, text, serial, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const nfts = pgTable("nfts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  priceSol: numeric("price_sol").notNull(),
  ownerAddress: text("owner_address"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNftSchema = createInsertSchema(nfts).omit({ 
  id: true, 
  createdAt: true 
});

export type Nft = typeof nfts.$inferSelect;
export type InsertNft = z.infer<typeof insertNftSchema>;

// API Contract Types
export type CreateNftRequest = InsertNft;
export type NftResponse = Nft;
export type NftListResponse = Nft[];
