import { DashboardLayout } from "@/components/dashboard-layout";
import LoginPage from "@/components/login";
import LogoutPage from "@/components/logout";
import SignupPage from "@/components/signup";

export default function Dashboard() {
  return (
    <div>
      <SignupPage />
      <LoginPage />
      <LogoutPage />
      <DashboardLayout>
        <h1>Dashboard</h1>
      </DashboardLayout>
      <h1>StatCard</h1>
      <h1>ProgressRing</h1>
      <h1>FinanceWidget</h1>
      <h1>HabitTracker</h1>
    </div>
  );
}
