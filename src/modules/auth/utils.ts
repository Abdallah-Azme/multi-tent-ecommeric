import { cookies } from "next/headers";

interface Props {
  prefix: string;
  value: string;
}

export async function generateAuthCookie({ prefix, value }: Props) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: `${prefix}-token`,
    value: value,
    httpOnly: true,
    path: "/",
  });
}
