import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import logo from "@assets/image_1763957987556.webp";
import ResponsiveImage from "@/components/ResponsiveImage";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  const handleNavClick = useCallback((href: string) => {
    if (location === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/news", label: "News" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-slate-900 overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/30 shadow-[0_1px_12px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
          <Link href="/" onClick={() => handleNavClick("/")} className="flex items-center gap-3 cursor-pointer" data-testid="link-home-logo">
            <ResponsiveImage src={logo} alt="R4K" className="h-9 w-9 object-cover rounded-full" />
            <span className="font-heading font-semibold text-sm tracking-wide uppercase text-slate-900">R4K</span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => handleNavClick(link.href)} data-testid={`link-nav-${link.label.toLowerCase()}`} className={`relative text-[13px] font-medium tracking-wide uppercase transition-colors duration-300 ${location === link.href ? "text-blue-600" : "text-slate-500 hover:text-slate-900"}`}>
                {link.label}
                {location === link.href && (
                  <motion.div layoutId="nav-indicator" className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-blue-500" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
              </Link>
            ))}
          </div>

          <Link href="/contact" onClick={() => handleNavClick("/contact")} className="hidden md:block" data-testid="link-get-involved">
            <span className="text-[13px] font-medium tracking-wide uppercase text-white bg-blue-600 px-5 py-2 rounded-md hover:bg-blue-700 transition-all duration-300">
              Get Involved
            </span>
          </Link>

          <button className="md:hidden p-2 text-slate-900" onClick={() => setIsOpen(!isOpen)} data-testid="button-mobile-menu">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => handleNavClick(link.href)} data-testid={`link-mobile-${link.label.toLowerCase()}`} className={`block text-sm font-medium tracking-wide uppercase ${location === link.href ? "text-blue-600" : "text-slate-500"}`}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow pt-16">{children}</main>

      <footer className="border-t border-slate-200 mt-32 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <ResponsiveImage src={logo} alt="R4K" className="h-8 w-8 object-cover rounded-full" />
                <span className="font-heading font-semibold text-sm tracking-wide uppercase text-white">Robotics for Kids</span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed max-w-sm">
                Empowering the next generation through robotics education and community outreach across Thailand and ASEAN.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold tracking-widest uppercase mb-5 text-blue-400">Navigate</h3>
              <ul className="space-y-3">
                {navLinks.map(link => (
                  <li key={link.href}><Link href={link.href} data-testid={`link-footer-${link.label.toLowerCase()}`} className="text-sm text-white/70 hover:text-blue-400 transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold tracking-widest uppercase mb-5 text-blue-400">Connect</h3>
              <ul className="space-y-3">
                <li><a href="https://www.instagram.com/r4kclubthailand/" target="_blank" rel="noopener noreferrer" data-testid="link-instagram" className="text-sm text-white/70 hover:text-blue-400 transition-colors">Instagram</a></li>
                <li><a href="mailto:contact@r4kclub.com" data-testid="link-footer-email" className="text-sm text-white/70 hover:text-blue-400 transition-colors">contact@r4kclub.com</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/50 tracking-wide">&copy; 2026 Robotics for Kids. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/terms" data-testid="link-footer-terms" className="text-xs text-white/50 hover:text-blue-400 transition-colors">Terms of Service</Link>
              <span className="text-white/20">·</span>
              <Link href="/privacy" data-testid="link-footer-privacy" className="text-xs text-white/50 hover:text-blue-400 transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
