import { motion } from "framer-motion";
import { Link } from "wouter";
import type { Nft } from "@shared/schema";
import { ExternalLink, Tag } from "lucide-react";

interface NftCardProps {
  nft: Nft;
  index: number;
}

export function NftCard({ nft, index }: NftCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <div className="neon-border h-full">
        <div className="glass-panel h-full overflow-hidden rounded-xl p-3 flex flex-col hover:bg-card/80 transition-colors">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted/20">
            <img 
              src={nft.imageUrl} 
              alt={nft.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <Link href={`/nft/${nft.id}`}>
                <button className="w-full rounded-lg bg-white/10 backdrop-blur-md border border-white/20 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-colors">
                  View Details
                </button>
              </Link>
            </div>
          </div>

          {/* Info */}
          <div className="mt-4 flex flex-1 flex-col gap-2 p-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {nft.title}
              </h3>
              <a 
                href={`https://solscan.io/token/${nft.id}?cluster=devnet`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title="View on Solscan"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
              {nft.description}
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Waitlist
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-primary">
                  <Tag className="h-3.5 w-3.5" />
                  <span className="font-mono font-bold">{nft.priceSol} SOL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
