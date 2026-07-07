import { kv } from "@vercel/kv";
import { redirect, notFound } from "next/navigation";

interface Props {
  params: { code: string };
}

// Hỗ trợ cả 2 dạng dữ liệu cũ (string) và mới ({ affiliateLink, createdAt })
type StoredLink = string | { affiliateLink: string; createdAt: number };

export default async function ShopeeRedirect({ params }: Props) {
  const { code } = params;
  const stored = await kv.get<StoredLink>(`link:${code}`);

  if (!stored) {
    notFound();
  }

  // Lấy link gốc dù dữ liệu là string cũ hay object mới
  const affiliateLink = typeof stored === "string" ? stored : stored.affiliateLink;

  // Luôn hiển thị giao diện "Lưu ý quan trọng" trước, không còn kiểm tra hết hạn 120 phút nữa
  redirect(`/?expired=1&link=${encodeURIComponent(affiliateLink)}`);
}
