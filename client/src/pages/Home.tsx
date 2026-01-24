import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Zap, Shield, Globe } from "lucide-react";
import { useNfts } from "@/hooks/use-nfts";
import { NftCard } from "@/components/NftCard";

export default function Home() {
  const { data: nfts, isLoading } = useNfts();

  // Show only first 3 NFTs for trending section
  const trendingNfts = nfts?.slice(0, 3) || [];

  return (
    <div className="flex flex-col gap-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-32 pb-20 overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse duration-[5000ms]" />
        
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-sm font-medium text-accent mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Solana Devnet Live
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-glow">
              Discover Rare <br />
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Digital Artifacts
              </span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10 leading-relaxed">
              The next generation marketplace for creators and collectors. 
              Mint, trade, and showcase your digital assets on Solana with zero fees and instant finality.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/explore">
                <button className="h-14 px-8 rounded-xl font-bold text-lg bg-primary text-white hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] hover:-translate-y-1 flex items-center gap-2">
                  Explore Collection
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
              <Link href="/create">
                <button className="h-14 px-8 rounded-xl font-bold text-lg bg-card border border-white/10 text-foreground hover:bg-white/5 transition-all hover:-translate-y-1">
                  Start Creating
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats / Features Strip */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Powered by Solana's high-performance blockchain" },
              { icon: Shield, title: "Secure & Safe", desc: "Audited smart contracts and secure wallet integration" },
              { icon: Globe, title: "Eco-Friendly", desc: "Low carbon footprint and minimal transaction costs" },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Trending Now</h2>
            <p className="text-muted-foreground">Most popular drops this week</p>
          </div>
          <Link href="/explore">
            <button className="hidden sm:flex text-primary font-medium hover:text-primary/80 items-center gap-2 transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[400px] rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingNfts.map((nft, i) => (
              <NftCard key={nft.id} nft={nft} index={i} />
            ))}
            {trendingNfts.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted-foreground border border-dashed border-white/10 rounded-2xl">
                No NFTs found. Be the first to mint one!
              </div>
            )}
          </div>
        )}
      </section>

      {/* Rust Footer Note */}
      <section className="container mx-auto px-4 py-20">
        <div className="relative rounded-3xl overflow-hidden p-10 md:p-20 text-center border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-30" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
          
          <div className="relative z-10">
            <h2 className="font-mono text-xl text-primary mb-4">&lt;BuiltWithRust /&gt;</h2>
            <h3 className="text-3xl font-bold mb-6">Powered by Rust Smart Contracts</h3>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
              This platform leverages the speed and safety of Rust for its on-chain Solana programs,
              ensuring your assets are secure and transactions are lightning fast.
            </p>
            <div className="flex items-center justify-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Fake Logos for effect */}
              <div className="h-8 w-8 bg-white/20 rounded-full" />
              <div className="h-8 w-8 bg-white/20 rounded-full" />
              <div className="h-8 w-8 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
