import { useNfts } from "@/hooks/use-nfts";
import { NftCard } from "@/components/NftCard";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

export default function Explore() {
  const { data: nfts, isLoading, error } = useNfts();

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="p-6 rounded-xl bg-destructive/10 text-destructive border border-destructive/20 inline-block">
          Error loading collection. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">Explore Collection</h1>
          <p className="text-muted-foreground text-lg">
            Browse through thousands of unique digital collectibles.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-24 z-30 mb-8 p-4 rounded-xl bg-card/80 backdrop-blur-md border border-white/5 shadow-lg flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by name or attribute..." 
            className="w-full h-11 pl-10 pr-4 rounded-lg bg-background border border-white/10 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/70"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <button className="flex items-center gap-2 h-10 px-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors whitespace-nowrap">
            <Filter className="h-4 w-4" />
            <span>Price: Low to High</span>
          </button>
          
          <button className="flex items-center gap-2 h-10 px-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors whitespace-nowrap">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Attributes</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="aspect-[4/5] rounded-2xl bg-white/5 animate-pulse border border-white/5" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {nfts?.map((nft, i) => (
            <NftCard key={nft.id} nft={nft} index={i} />
          ))}
          
          {nfts?.length === 0 && (
            <div className="col-span-full py-32 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">No items found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
