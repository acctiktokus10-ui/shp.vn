import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

const AFFILIATE_ID = "17395950528";

function extractShopProduct(url: string): [string, string] | null {
  const m = url.match(/shopee\.vn\/(?:product|opaanlp)\/(\d+)\/(\d+)/);
  return m ? [m[1], m[2]] : null;
}

function buildAffiliateLink(shopId: string, productId: string, subId = ""): string {
  const origin = `https://shopee.vn/product/${shopId}/${productId}`;
  const encoded = encodeURIComponent(origin);
  return `https://s.shopee.vn/an_redir?origin_link=${encoded}&affiliate_id=${AFFILIATE_ID}&sub_id=${subId}`;
}

function randomCode(len = 7): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export async function POST(req: NextRequest) {
  try {
    const { url, subId = "" } = await req.json();
    if (!url) return NextResponse.json({ error: "Thiếu URL" }, { status: 400 });

    // Tìm shop_id / product_id trực tiếp
    let ids = extractShopProduct(url);

    // Nếu là short link → resolve redirect
    if (!ids && (url.includes("s.shopee.vn") || url.includes("shp.ee") || url.includes("vn.shp.ee"))) {
      try {
        const res = await fetch(url, { method: "HEAD", redirect: "follow" });
        ids = extractShopProduct(res.url);
      } catch {
        return NextResponse.json({ error: "Không resolve được short link" }, { status: 400 });
      }
    }

    if (!ids) {
      return NextResponse.json({ error: "Không tìm thấy Shop ID / Product ID trong link" }, { status: 400 });
    }

    const [shopId, productId] = ids;
    const affiliateLink = buildAffiliateLink(shopId, productId, subId);

    // Tạo code ngắn, lưu vào KV (TTL 90 ngày)
    // Lưu kèm createdAt để trang [code]/shopee tự kiểm tra hết hạn 30 phút
    const code = randomCode();
    await kv.set(
      `link:${code}`,
      { affiliateLink, createdAt: Date.now() },
      { ex: 60 * 60 * 24 * 90 }
    );

    const host = req.headers.get("host") || "";
    const protocol = host.includes("localhost") ? "http" : "https";
    const shortUrl = `${protocol}://${host}/${code}/shopee`;

    return NextResponse.json({ shortUrl, affiliateLink, code });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
