import configPromise from "@payload-config";
import { getPayload } from "payload";

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "media",
  });

  return Response.json(data);
};
