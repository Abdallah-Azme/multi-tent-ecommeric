import { getPayload } from "payload";
import configPromise from "@/payload.config";
import { Category } from "@/payload-types";

export default async function Home() {
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

  return <div className=""></div>;
}
