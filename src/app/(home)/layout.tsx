import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

export default function HomeLayout({ children }: React.PropsWithChildren) {
  return (
    <section className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </section>
  );
}
