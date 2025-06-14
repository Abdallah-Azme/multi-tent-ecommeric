"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

interface Props {
  category?: string;
}

export default function ProductList({ category }: Props) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({ category })
  );

  console.log({ data });
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {data.docs.map((product) => (
        <div className="border rounded-md bg-white p-4" key={product.id}>
          <h3 className="font-medium text-xl">{product.name}</h3>
          <p>{product.name}</p>
        </div>
      ))}
    </div>
  );
}

export function ProductListSkelton() {
  return <div>Loading...</div>;
}
