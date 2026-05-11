"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PenTool,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: PenTool, label: "Daily Entry", href: "/daily-entry" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden glass p-2 rounded-xl border border-white/10"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex h-screen w-72 sticky top-0 flex-col border-r border-white/10 bg-background/80 backdrop-blur-xl p-6">
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            LifeOS
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            Personal Growth System
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-4 rounded-2xl px-4 py-4 transition-all duration-300 ${
                  isActive
                    ? "bg-primary/15 border border-primary/20 text-primary shadow-lg shadow-primary/10"
                    : "hover:bg-white/5 text-muted-foreground hover:text-white"
                }`}
              >
                <item.icon
                  size={22}
                  className={`transition-transform group-hover:scale-110 ${
                    isActive ? "text-primary" : ""
                  }`}
                />

                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Card */}
        <div className="glass rounded-2xl p-4 border border-white/10 mb-4">
          <p className="text-sm text-muted-foreground mb-2">
            Today&apos;s Progress
          </p>

          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div className="w-[72%] h-full bg-primary rounded-full" />
          </div>

          <p className="text-sm mt-2 font-medium">72% completed 🔥</p>
        </div>

        {/* Logout */}
        <button className="flex items-center gap-3 rounded-2xl px-4 py-4 text-muted-foreground hover:bg-white/5 hover:text-white transition-all">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 z-50 h-screen w-72 bg-background/95 backdrop-blur-xl border-r border-white/10 p-6 lg:hidden"
          >
            {/* Logo */}
            <div className="mb-10 mt-10">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                LifeOS
              </h1>
            </div>

            {/* Nav */}
            <nav className="space-y-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-4 rounded-2xl px-4 py-4 transition-all ${
                      isActive
                        ? "bg-primary/15 border border-primary/20 text-primary"
                        : "hover:bg-white/5 text-muted-foreground hover:text-white"
                    }`}
                  >
                    <item.icon size={22} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
