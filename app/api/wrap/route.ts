import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

function randomCode(len = 7): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

/**
 * POST /api/wrap
 * Body: { "affiliate_link": "https://s.shopee.vn/an_redir?..." }
 * Response: { "short_url": "https://yoursite.vercel.app/ABC1234/shopee" }
 *
 * Endpoint này dùng cho bot Python — bot đã convert xong affiliate link,
 * chỉ cần bọc thành short link để gửi cho thành viên.
 */
export async function POST(req: NextRequest) {
  try {
    // Xác thực API key đơn giản (tuỳ chọn, thêm BOT_SECRET vào env)
    const secret = process.env.BOT_SECRET;
    if (secret) {
      const auth = req.headers.get("x-bot-secret");
      if (auth !== secret) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const body = await req.json();
    const affiliateLink: string = body.affiliate_link || body.url;

    if (!affiliateLink || !affiliateLink.startsWith("http")) {
      return NextResponse.json({ error: "Thiếu affiliate_link hợp lệ" }, { status: 400 });
    }

    // Tạo code ngắn, lưu vào KV (TTL 90 ngày)
    const code = randomCode();
    await kv.set(`link:${code}`, affiliateLink, { ex: 60 * 60 * 24 * 90 });

    const host = req.headers.get("host") || "";
    const protocol = host.includes("localhost") ? "http" : "https";
    const shortUrl = `${protocol}://${host}/${code}/shopee`;

    return NextResponse.json({ short_url: shortUrl, code });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
