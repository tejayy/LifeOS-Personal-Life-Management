"use client";

import { motion } from "framer-motion";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="relative flex min-h-screen bg-[#050505] text-white overflow-hidden">
      <Sidebar />

      {/* BACKGROUND GLOW */}
      <div className="min-h-screen w-full relative bg-black">
        {/* Violet Storm Background with Top Glow */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.25), transparent 70%), #000000",
          }}
        />

        {/* Main Layout */}
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          {/* Topbar */}
          <Topbar />

          {/* Main Content */}
          <motion.main
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            className="flex-1 overflow-y-auto"
          >
            {/* Blur Container */}
            <div className="mx-auto w-full px-4 py-6 md:px-8 md:py-8">
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-2xl">
                {/* Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-primary/[0.03]" />

                {/* Content */}
                <div className="relative z-10 p-4 md:p-8">{children}</div>
              </div>
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
};
