"""
bot_wrap_patch.py
─────────────────────────────────────────────────────────────────────────────
PATCH: Bọc affiliate link qua web wrapper trước khi gửi cho thành viên.

CÁCH DÙNG:
  1. Copy file này vào cùng thư mục với bot
  2. Thêm vào đầu file bot (sau các import):
       from bot_wrap_patch import wrap_affiliate_link, WRAPPER_BASE_URL

  3. Sửa WRAPPER_BASE_URL bên dưới thành domain Vercel của bạn

  4. Trong hàm process_link() của bot, thêm wrap ở cuối:
     (xem hướng dẫn bên dưới)
─────────────────────────────────────────────────────────────────────────────
"""

import aiohttp as _aiohttp
import logging as _logging

_log = _logging.getLogger(__name__)

# ── CẤU HÌNH ──────────────────────────────────────────────────────────────
# Thay bằng domain Vercel của bạn, KHÔNG có dấu / cuối
WRAPPER_BASE_URL = "https://YOUR-PROJECT.vercel.app"

# Nếu bạn đặt BOT_SECRET trong Vercel env, điền vào đây
WRAPPER_BOT_SECRET = ""   # Ví dụ: "my-secret-123"
# ──────────────────────────────────────────────────────────────────────────


async def wrap_affiliate_link(affiliate_link: str) -> str:
    """
    Gọi API /api/wrap trên web → trả short link dạng:
        https://yoursite.vercel.app/ABC1234/shopee

    Nếu gọi thất bại → trả về affiliate_link gốc (bot vẫn hoạt động bình thường).
    """
    url = f"{WRAPPER_BASE_URL}/api/wrap"
    headers = {"Content-Type": "application/json"}
    if WRAPPER_BOT_SECRET:
        headers["x-bot-secret"] = WRAPPER_BOT_SECRET

    try:
        async with _aiohttp.ClientSession() as session:
            async with session.post(
                url,
                json={"affiliate_link": affiliate_link},
                headers=headers,
                timeout=_aiohttp.ClientTimeout(total=5),
            ) as resp:
                if resp.status == 200:
                    data = await resp.json()
                    short = data.get("short_url")
                    if short:
                        _log.info(f"✅ [WRAP] {affiliate_link[:50]}... → {short}")
                        return short
                else:
                    text = await resp.text()
                    _log.warning(f"⚠️ [WRAP] HTTP {resp.status}: {text[:100]}")
    except Exception as e:
        _log.warning(f"⚠️ [WRAP] Lỗi gọi wrapper API: {e} — dùng link gốc")

    return affiliate_link  # fallback: trả link gốc nếu lỗi


# ══════════════════════════════════════════════════════════════════════════
# HƯỚNG DẪN SỬA HÀM process_link() TRONG BOT
# ══════════════════════════════════════════════════════════════════════════
#
# Tìm hàm process_link() trong bot, sửa phần return như sau:
#
# --- TRƯỚC ---
#     if result.get("success"):
#         aff_link = result["affiliate_link"]
#         log.info(f"✅ shopee_converter trả về: {aff_link}")
#         return aff_link
#
# --- SAU ---
#     if result.get("success"):
#         aff_link = result["affiliate_link"]
#         log.info(f"✅ shopee_converter trả về: {aff_link}")
#         wrapped = await wrap_affiliate_link(aff_link)   # ← thêm dòng này
#         return wrapped                                   # ← đổi return này
#
# Tương tự cho đoạn fast async resolve (dòng ~663 trong bot):
#
# --- TRƯỚC ---
#                 log.info(f"✅ [FAST async resolve] shopee_converter: {aff_link}")
#                 return aff_link
#
# --- SAU ---
#                 log.info(f"✅ [FAST async resolve] shopee_converter: {aff_link}")
#                 wrapped = await wrap_affiliate_link(aff_link)   # ← thêm
#                 return wrapped                                   # ← đổi
#
# ══════════════════════════════════════════════════════════════════════════
