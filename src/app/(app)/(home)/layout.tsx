import { Category } from "@/payload-types";
import configPromise from "@/payload.config";
import { getPayload } from "payload";
import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import SearchFilters from "./search-filters";

export default async function HomeLayout({
  children,
}: React.PropsWithChildren) {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    depth: 1,
    pagination: false,
    where: {
      parent: {
        equals: false,
      },
    },
  });

  const formattedData = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      // we should be safe here since we are using depth 1
      ...(doc as Category),
      subcategories: undefined,
    })),
  }));
  return (
    <section className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </section>
  );
}
