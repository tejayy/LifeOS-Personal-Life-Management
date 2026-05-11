// app/login/page.tsx

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-4xl font-bold text-transparent">
            LifeOS
          </h1>

          <p className="mt-2 text-muted-foreground">Welcome back 👋</p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <Mail size={18} className="text-muted-foreground" />

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <Lock size={18} className="text-muted-foreground" />

              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Forgot */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Button */}
          <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 font-medium text-primary-foreground transition-all hover:scale-[1.02]">
            Login
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-sm text-muted-foreground">OR</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Google */}
        <button className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-medium transition-all hover:bg-white/10">
          Continue with Google
        </button>

        {/* Signup */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
