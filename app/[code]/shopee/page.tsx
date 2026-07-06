import { kv } from "@vercel/kv";
import { redirect, notFound } from "next/navigation";

interface Props {
  params: { code: string };
}

export default async function ShopeeRedirect({ params }: Props) {
  const { code } = params;
  const affiliateLink = await kv.get<string>(`link:${code}`);

  if (!affiliateLink) {
    notFound();
  }

  redirect(affiliateLink);
}
