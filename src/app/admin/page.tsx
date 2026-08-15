import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin · Cotizaciones",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-x max-w-6xl">
        <AdminDashboard />
      </div>
    </div>
  );
}
