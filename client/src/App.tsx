import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { SolanaWalletProvider } from "./components/WalletProvider";
import { Navbar } from "./components/Navbar";

// Pages
import Home from "@/pages/Home";
import Explore from "@/pages/Explore";
import Create from "@/pages/Create";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/explore" component={Explore} />
          <Route path="/create" component={Create} />
          <Route component={NotFound} />
        </Switch>
      </main>
      
      {/* Simple Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} Nexus NFT Market. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SolanaWalletProvider>
        <Router />
        <Toaster />
      </SolanaWalletProvider>
    </QueryClientProvider>
  );
}

export default App;
