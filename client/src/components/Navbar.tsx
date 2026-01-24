import { Link, useLocation } from "wouter";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Rocket, Grid, PlusSquare, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: Rocket },
    { href: "/explore", label: "Explore", icon: Grid },
    { href: "/create", label: "Create", icon: PlusSquare },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-accent group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-shadow duration-300">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              NEXUS
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={`
                  relative px-2 py-1 text-sm font-medium transition-colors duration-200 flex items-center gap-2 cursor-pointer
                  ${location === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"}
                `}>
                  <link.icon className="h-4 w-4" />
                  {link.label}
                  {location === link.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-[26px] left-0 right-0 h-[2px] bg-primary shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                    />
                  )}
                </span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <WalletMultiButton />
            </div>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-card/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span 
                    className={`flex items-center gap-3 p-3 rounded-lg ${location === link.href ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </span>
                </Link>
              ))}
              <div className="pt-2">
                <WalletMultiButton style={{ width: '100%' }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
