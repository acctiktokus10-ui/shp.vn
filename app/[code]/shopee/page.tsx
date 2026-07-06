import { kv } from "@vercel/kv";
import { redirect, notFound } from "next/navigation";

interface Props {
  params: { code: string };
}

// Thời gian hết hạn: 120 phút (tính bằng milliseconds)
const EXPIRY_MS = 120 * 60 * 1000;

// Hỗ trợ cả 2 dạng dữ liệu cũ (string) và mới ({ affiliateLink, createdAt })
type StoredLink = string | { affiliateLink: string; createdAt: number };

export default async function ShopeeRedirect({ params }: Props) {
  const { code } = params;
  const stored = await kv.get<StoredLink>(`link:${code}`);

  if (!stored) {
    notFound();
  }

  // Link cũ (được tạo trước khi có tính năng hết hạn) là string thuần
  // → không có createdAt nên không áp dụng hết hạn, redirect như cũ
  if (typeof stored === "string") {
    redirect(stored);
  }

  const { affiliateLink, createdAt } = stored;
  const isExpired = Date.now() - createdAt > EXPIRY_MS;

  if (isExpired) {
    // Quá 120 phút → tự động quay về giao diện chính của web
    redirect("/?expired=1");
  }

  redirect(affiliateLink);
}
