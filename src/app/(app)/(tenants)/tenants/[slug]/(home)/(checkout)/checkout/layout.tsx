import Navbar from "@/modules/checkout/ui/components/navbar";
import Footer from "@/modules/tenants/ui/components/footer";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

export default async function CheckOutLayout({
  children,
  params,
}: LayoutProps) {
  const { slug } = await params;
  return (
    <section className="flex flex-col min-h-screen">
      <Navbar slug={slug} />
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </section>
  );
}
