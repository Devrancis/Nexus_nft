import { db } from "./db";
import {
  nfts,
  type Nft,
  type InsertNft
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getNfts(): Promise<Nft[]>;
  getNft(id: number): Promise<Nft | undefined>;
  createNft(nft: InsertNft): Promise<Nft>;
}

export class DatabaseStorage implements IStorage {
  async getNfts(): Promise<Nft[]> {
    return await db.select().from(nfts);
  }

  async getNft(id: number): Promise<Nft | undefined> {
    const [nft] = await db.select().from(nfts).where(eq(nfts.id, id));
    return nft;
  }

  async createNft(insertNft: InsertNft): Promise<Nft> {
    const [nft] = await db.insert(nfts).values(insertNft).returning();
    return nft;
  }
}

export const storage = new DatabaseStorage();
