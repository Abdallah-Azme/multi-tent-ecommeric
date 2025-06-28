import { cn, formatCurrency } from "@/lib/utils";
import { Media, Product, Tenant } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  product: Product;
  productUrl: string;
  tenantUrl: string;
  onRemove: () => void;
  isLast: boolean;
}

export default function CheckoutItem({
  product,
  productUrl,
  tenantUrl,
  onRemove,
  isLast,
}: Props) {
  const image = product?.image as Media;
  const tenant = product?.tenant as Tenant & { image: Media | null };

  return (
    <div
      className={cn(
        "grid grid-cols-[8.5rem_1fr_auto] gap-4 pr-4 border-b",
        isLast && "border-b-0"
      )}
    >
      <div className="overflow-hidden border-r">
        <div className="relative aspect-square h-full">
          <Image
            src={image.url || "/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="py-4 flex flex-col justify-between ">
        <div className="">
          <Link href={productUrl}>
            <h4 className="font-bold underline">{product.name}</h4>
          </Link>
          <Link href={tenantUrl}>
            <h4 className="font-medium underline">{tenant.name}</h4>
          </Link>
        </div>
      </div>

      <div className="py-4 flex flex-col justify-between ">
        <p className="font-medium ">{formatCurrency(product.price)}</p>
        <button
          className="underline font-medium cursor-pointer"
          onClick={onRemove}
          type="button"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
