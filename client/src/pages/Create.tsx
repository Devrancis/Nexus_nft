import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertNftSchema } from "@shared/schema";
import { z } from "zod";
import { useCreateNft } from "@/hooks/use-nfts";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Sparkles, AlertCircle } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

// Extended schema to handle coercion
const formSchema = insertNftSchema.extend({
  priceSol: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Create() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { connected, publicKey } = useWallet();
  const createNft = useCreateNft();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "", // We'll just input a URL for this demo
      priceSol: "0.5",
      ownerAddress: publicKey?.toBase58() || "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!connected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your Solana wallet to mint.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createNft.mutateAsync({
        ...data,
        ownerAddress: publicKey?.toBase58(),
      });
      
      toast({
        title: "Success! NFT Minted",
        description: "Your digital asset has been created on the network.",
      });
      setLocation("/explore");
    } catch (error) {
      toast({
        title: "Minting failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Side: Information */}
        <div className="space-y-8">
          <div>
            <h1 className="font-display text-4xl font-bold mb-4">Create New Item</h1>
            <p className="text-muted-foreground text-lg">
              Upload your artwork, set a price, and mint it to the Solana Devnet.
              Fast, cheap, and eco-friendly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-4">
              <Sparkles className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-primary mb-1">Minting Simulation</h3>
                <p className="text-sm text-muted-foreground">
                  This portfolio demo simulates the on-chain minting process. 
                  The metadata is stored in our database, but interacts with your wallet signature.
                </p>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div className="hidden lg:block">
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Preview</h3>
            <div className="w-full max-w-xs mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="neon-border rounded-xl bg-card p-4 shadow-2xl">
                <div className="aspect-square rounded-lg bg-muted mb-4 overflow-hidden">
                   {form.watch("imageUrl") ? (
                     <img src={form.watch("imageUrl")} alt="Preview" className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                       <Upload className="h-8 w-8 opacity-20" />
                     </div>
                   )}
                </div>
                <div className="space-y-2">
                  <div className="h-6 w-3/4 bg-white/10 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-white/5 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="glass-panel p-8 rounded-2xl">
          {!connected ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <AlertCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Connect Wallet</h3>
              <p className="text-muted-foreground mb-8 max-w-xs">
                You need to connect your Solana wallet to proceed with minting.
              </p>
              <WalletMultiButton />
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Image URL Input (Simulated Upload) */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <div className="relative">
                  {/* landing page hero scenic mountain landscape */}
                  <input
                    {...form.register("imageUrl")}
                    placeholder="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80"
                    className="w-full h-12 px-4 rounded-xl bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    Direct URL
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Paste a direct image URL. In a real app, this would be an IPFS upload.
                </p>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input
                  {...form.register("title")}
                  placeholder="e.g. Cyber Punk #2077"
                  className="w-full h-12 px-4 rounded-xl bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
                {form.formState.errors.title && (
                  <p className="text-xs text-destructive">{form.formState.errors.title.message}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  {...form.register("description")}
                  rows={4}
                  placeholder="Tell the story behind your masterpiece..."
                  className="w-full p-4 rounded-xl bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                />
                {form.formState.errors.description && (
                  <p className="text-xs text-destructive">{form.formState.errors.description.message}</p>
                )}
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Price (SOL)</label>
                <input
                  type="number"
                  step="0.01"
                  {...form.register("priceSol")}
                  className="w-full h-12 px-4 rounded-xl bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
                {form.formState.errors.priceSol && (
                  <p className="text-xs text-destructive">{form.formState.errors.priceSol.message}</p>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={createNft.isPending}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-accent font-bold text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {createNft.isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Minting...
                    </>
                  ) : (
                    "Create Item"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
