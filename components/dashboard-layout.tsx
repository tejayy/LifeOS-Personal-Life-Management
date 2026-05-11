"use client";

import { motion } from "framer-motion";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    // <div className="flex h-screen bg-background overflow-hidden">
    //   {/* Sidebar */}
    //   {/* <Sidebar /> */}

    //   {/* Main content */}
    //   <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
    //     {/* Topbar */}
    //     {/* <Topbar /> */}

    //     {/* Page content */}
    //     <motion.main
    //       initial={{ opacity: 0 }}
    //       animate={{ opacity: 1 }}
    //       className="flex-1 overflow-y-auto"
    //     >
    //       <div className="p-4 md:p-8 max-w-7xl mx-auto">
    //         {children}
    //       </div>
    //     </motion.main>
    //   </div>
    // </div>
    <div className="flex h-screen  bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex  flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <Topbar />
        {/* Page  Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 overflow-y-auto"
        >
          <div className="p-4 md:p-8 max-w-7xl mx-auto">{children}</div>
        </motion.main>
      </div>
    </div>
  );
};
