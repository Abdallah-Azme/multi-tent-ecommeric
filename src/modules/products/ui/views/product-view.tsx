"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import StarRating from "@/components/ui/star-rating";
import { cn, formatCurrency, generateTenantURL } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LinkIcon, ShoppingCartIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const CartButton = dynamic(() => import("../components/cart-button"), {
  ssr: false,
  loading: () => (
    <Button variant={"elevated"} className={cn("bg-white relative")} asChild>
      <ShoppingCartIcon />
    </Button>
  ),
});

interface Props {
  productId: string;
  tenantSlug: string;
}

export default function ProductView({ productId, tenantSlug }: Props) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getOne.queryOptions({
      id: productId,
    })
  );

  return (
    <div className="px-4 lg:px-12 py-10">
      <div className="border rounded-sm bg-white overflow-hidden ">
        <div className="relative aspect-[3.9] border-b">
          <Image
            src={data.image?.url || "/placeholder.png"}
            alt={data?.image?.alt || data.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="grid lg:grid-cols-6">
          <div className="lg:col-span-4 ">
            <div className="p-6">
              <h1 className="text-4xl font-medium">{data.name}</h1>
            </div>
            <div className="border-y flex">
              <div className="px-6 py-4 flex items-center justify-center border-r">
                <div className="px-2 py-1 border bg-pink-400 w-fit">
                  <p className="font-medium">{formatCurrency(data.price)}</p>
                </div>
              </div>

              <div className="px-6 py-4 flex items-center justify-center lg:border-r ">
                <Link
                  className="flex items-center gap-2"
                  href={generateTenantURL(tenantSlug)}
                >
                  {data.tenant.image?.url && (
                    <Image
                      src={data.tenant.image?.url}
                      alt={data.tenant.name}
                      width={20}
                      height={20}
                      className="rounded-full border shrink-0 size-5"
                    />
                  )}
                  <p className=" underline font-medium">{data.tenant.name}</p>
                </Link>
              </div>

              <div className="hidden px-6 py-4 lg:flex items-center justify-center">
                <div className="flex items-center gap-1">
                  <StarRating rating={4} iconClassName="size-4" />
                </div>
              </div>
            </div>
            {/* mobile rating */}
            <div className="lg:hidden px-6 py-4 items-center justify-center border-b ">
              <div className="flex items-center gap-1">
                <StarRating rating={4} iconClassName="size-4" />

                <p className="  font-medium">{5} ratings</p>
              </div>
            </div>

            <div className="p-6 ">
              {data.description ? (
                <p className=" ">{data.description}</p>
              ) : (
                <p className="text-muted-foreground font-medium italic">
                  No description provided
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="border-t lg:border-t-0 lg:border-l h-full ">
              <div className="flex flex-col gap-4 p-6 border-b">
                <div className="flex items-center gap-2">
                  <CartButton productId={productId} tenantSlug={tenantSlug} />
                  <Button
                    variant={"elevated"}
                    className="flex-1 size-12 bg-pink-400"
                    onClick={() => {}}
                    disabled={false}
                  >
                    <LinkIcon />
                  </Button>
                </div>

                <p className="text-center font-medium">
                  {data.refundPolicy === "no-refunds"
                    ? "No refunds"
                    : `${data.refundPolicy} money back guarantee`}
                </p>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">Ratings</h3>
                  <div className="flex items-center gap-x-1 font-medium">
                    <StarIcon className="size-4 fill-black" />
                    <p>({5})</p>
                    <p>{5} ratings</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div className="flex gap-2" key={i}>
                      <p className="w-16">
                        {i + 1} {i + 1 === 1 ? "star" : "stars"}
                      </p>
                      <Progress
                        value={Math.random() * 100}
                        className="h-[1lh] flex-1"
                      />
                      <div className="font-medium w-10">
                        {Math.floor(Math.random() * 100)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
