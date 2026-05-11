"use client";

import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard-layout";
import { User, Bell, Lock, Palette, Zap, HelpCircle } from "lucide-react";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const settingsSections = [
  {
    icon: User,
    title: "Profile",
    description: "Manage your account information",
    options: [
      { label: "Full Name", value: "Alex Johnson" },
      { label: "Email", value: "alex@example.com" },
      { label: "Time Zone", value: "EST" },
    ],
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Customize how you receive updates",
    options: [
      { label: "Daily Reminder", toggle: true, value: true },
      { label: "Achievement Alerts", toggle: true, value: false },
      { label: "Email Summaries", toggle: true, value: true },
    ],
  },
  {
    icon: Palette,
    title: "Appearance",
    description: "Customize your dashboard appearance",
    options: [
      { label: "Theme", value: "Dark (Current)" },
      { label: "Accent Color", value: "Purple" },
      { label: "Compact Mode", toggle: true, value: false },
    ],
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimize dashboard performance",
    options: [
      { label: "Auto-save Entries", toggle: true, value: true },
      { label: "Sync Frequency", value: "Every 5 minutes" },
      { label: "Data Collection", toggle: true, value: true },
    ],
  },
  {
    icon: Lock,
    title: "Security",
    description: "Manage your security settings",
    options: [
      { label: "Two-Factor Authentication", toggle: true, value: false },
      { label: "Password", action: true, label: "Change Password" },
      { label: "Connected Devices", action: true, label: "View Devices" },
    ],
  },
  {
    icon: HelpCircle,
    title: "Support",
    description: "Get help and feedback",
    options: [
      { label: "Help Center", action: true },
      { label: "Send Feedback", action: true },
      { label: "Report Issue", action: true },
    ],
  },
];

export default function Settings() {
  const [toggles, setToggles] = useState({
    dailyReminder: true,
    achievementAlerts: false,
    emailSummaries: true,
    compactMode: false,
    autoSave: true,
    dataCollection: true,
    twoFactor: false,
  });

  const handleToggle = (key: string) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 max-w-3xl"
      >
        {/* Header */}
        <motion.section variants={itemVariants}>
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your preferences and account settings
          </p>
        </motion.section>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <motion.section
              key={section.title}
              variants={itemVariants}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <section.icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {section.options.map((option, optionIndex) => (
                  <motion.div
                    key={`${section.title}-${optionIndex}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.4 + sectionIndex * 0.05 + optionIndex * 0.02,
                    }}
                    className="flex items-center justify-between py-3 border-b border-border/20 last:border-0"
                  >
                    <span className="text-sm font-medium">
                      {option.label || option.label}
                    </span>

                    {option.toggle ? (
                      <button
                        onClick={() =>
                          handleToggle(
                            option.label.toLowerCase().replace(/[\s-]/g, ""),
                          )
                        }
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          toggles[
                            option.label
                              .toLowerCase()
                              .replace(/[\s-]/g, "") as keyof typeof toggles
                          ]
                            ? "bg-primary"
                            : "bg-border"
                        }`}
                      >
                        <motion.div
                          layout
                          className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                        />
                      </button>
                    ) : option.action ? (
                      <button className="px-4 py-2 text-sm bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors font-medium">
                        {option.value}
                      </button>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {option.value}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Danger Zone */}
        <motion.section
          variants={itemVariants}
          className="glass rounded-xl p-6 border-l-4 border-red-500"
        >
          <h3 className="text-lg font-semibold text-red-500 mb-4">
            Danger Zone
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            These actions cannot be undone. Please proceed with caution.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 px-4 py-2 border border-red-500/50 text-red-500 rounded-lg hover:bg-red-500/10 transition-colors text-sm font-medium">
              Export Data
            </button>
            <button className="flex-1 px-4 py-2 border border-red-500/50 text-red-500 rounded-lg hover:bg-red-500/10 transition-colors text-sm font-medium">
              Delete Account
            </button>
          </div>
        </motion.section>

        {/* Save Button */}
        <motion.section variants={itemVariants} className="flex gap-4">
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Save Changes
          </button>
          <button className="px-8 py-3 bg-white/5 text-foreground rounded-lg font-semibold hover:bg-white/10 transition-colors">
            Reset
          </button>
        </motion.section>
      </motion.div>
    </DashboardLayout>
  );
}
