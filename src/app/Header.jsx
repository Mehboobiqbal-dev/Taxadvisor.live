"use client";
import { SessionProvider } from "next-auth/react";
import UserButton from "@/app/components/user-button";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";
import { Button } from "@/app/components/ui/button";
import { Menu } from "lucide-react";

const HeaderContent = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" aria-label="Tax Advisor Home">
            <img
              src="https://i.ibb.co/vxKbKLHT/photo.jpg"
              alt="Tax Advisor Logo"
              className="h-10 w-10 rounded-full border-2 border-primary/50 shadow-sm hover:scale-105 transition-transform"
              loading="lazy"
            />
          </Link>
          <span className="text-xl font-bold tracking-tight hidden md:inline">
            TaxAdvisor
          </span>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/home" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Home</Link>
          <Link href="/tax-calculator" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Tax Calculator</Link>
          <Link href="/SmartTaxBot" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">SmartTaxBot</Link>
          <Link href="/newslist" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">News</Link>
          <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Blog</Link>
        </nav>
        {/* User Button and Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <UserButton />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Navigation Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <Link href="/home" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">Home</Link>
                <Link href="/tax-calculator" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">Tax Calculator</Link>
                <Link href="/SmartTaxBot" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">SmartTaxBot</Link>
                <Link href="/newslist" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">News</Link>
                <Link href="/blog" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">Blog</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

const Header = () => (
  <SessionProvider>
    <HeaderContent />
  </SessionProvider>
);

export default Header;
