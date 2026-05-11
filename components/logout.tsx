// app/logout/page.tsx

"use client";

import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import Link from "next/link";

export default function LogoutPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-2xl"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <LogOut size={36} className="text-primary" />
        </div>

        <h1 className="text-3xl font-bold">Logged Out</h1>

        <p className="mt-3 text-muted-foreground">
          You have successfully logged out of LifeOS.
        </p>

        <Link
          href="/login"
          className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-primary px-4 py-3 font-medium text-primary-foreground transition-all hover:scale-[1.02]"
        >
          Login Again
        </Link>
      </motion.div>
    </div>
  );
}
