import CheckoutView from "@/modules/checkout/ui/views/checkout-view";
import React from "react";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <CheckoutView tenantSlug={slug} />;
}
