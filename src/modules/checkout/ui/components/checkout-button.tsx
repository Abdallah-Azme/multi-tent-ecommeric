import React from "react";
import { useCart } from "../../hooks/use-cart";
import { Button } from "@/components/ui/button";
import { cn, generateTenantURL } from "@/lib/utils";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

interface CheckoutButtonProps {
  className?: string;
  hideIfEmpty?: boolean;
  tenantSlug: string;
}

export default function CheckoutButton({
  tenantSlug,
  className,
  hideIfEmpty,
}: CheckoutButtonProps) {
  const { totalItems } = useCart(tenantSlug);

  if (hideIfEmpty && totalItems === 0) {
    return null;
  }

  return (
    <Button
      variant={"elevated"}
      className={cn("bg-white relative", className)}
      asChild
    >
      <Link href={`${generateTenantURL(tenantSlug)}/checkout`}>
        <ShoppingCartIcon />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-pink-400 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
            {totalItems}
          </span>
        )}
      </Link>
    </Button>
  );
}
