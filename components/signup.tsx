// app/signup/page.tsx

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-4xl font-bold text-transparent">
            LifeOS
          </h1>

          <p className="mt-2 text-muted-foreground">
            Create your personal growth system 🚀
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium">Full Name</label>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <User size={18} className="text-muted-foreground" />

              <input
                type="text"
                placeholder="Tejas Jaybhaye"
                className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

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
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10"
            />

            <p>
              I agree to the{" "}
              <span className="text-primary hover:underline cursor-pointer">
                Terms
              </span>{" "}
              and{" "}
              <span className="text-primary hover:underline cursor-pointer">
                Privacy Policy
              </span>
            </p>
          </div>

          {/* Signup Button */}
          <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 font-medium text-primary-foreground transition-all hover:scale-[1.02]">
            Create Account
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-sm text-muted-foreground">OR</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Google Button */}
        <button className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-medium transition-all hover:bg-white/10">
          Continue with Google
        </button>

        {/* Login Redirect */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
