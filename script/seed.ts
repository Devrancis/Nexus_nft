import { db } from "../server/db";
import { nfts } from "../shared/schema";
import nftsData from "./nfts.json";

async function seed() {
  console.log("🌱 Starting Database Seed...");

  try {
    // 1. Clean the data: Remove IDs and ensure keys match your schema
    const cleanData = nftsData.map((item: any) => {
      return {
        title: item.title,
        description: item.description,
        // Mapping JSON snake_case to likely Schema camelCase
        imageUrl: item.image_url || item.imageUrl, 
        priceSol: item.price_sol?.toString() || item.priceSol?.toString(),
        ownerAddress: item.owner_address || item.ownerAddress,
        // created_at is usually handled automatically by the DB
      };
    });

    console.log(`📦 Prepared ${cleanData.length} NFTs for insertion.`);

    // 2. Insert into Neon
    await db.insert(nfts).values(cleanData);
    
    console.log("✅ Success! Your Neon database is now populated.");
  } catch (error) {
    console.error("❌ Seeding failed!");
    console.error("Error details:", error);
  } finally {
    process.exit(0);
  }
}

seed();