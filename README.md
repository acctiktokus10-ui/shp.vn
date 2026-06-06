# Shopee Link Wrapper

Web bọc link Shopee affiliate thành short link dạng `yoursite.vercel.app/ABC123/shopee`

## Deploy lên Vercel

### Bước 1 — Push lên GitHub
```bash
git init
git add .
git commit -m "init"
git remote add origin https://github.com/YOUR_USERNAME/shopee-wrapper.git
git push -u origin main
```

### Bước 2 — Tạo Vercel KV
1. Vào Vercel Dashboard → **Storage** → **Create Database** → chọn **KV**
2. Đặt tên (vd: `shopee-kv`) → Create
3. Vào tab **`.env.local`** → copy 3 biến môi trường:
   - `KV_URL`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`

### Bước 3 — Deploy
1. Vercel Dashboard → **Add New Project** → chọn repo vừa push
2. Vào **Settings → Environment Variables** → paste 3 biến KV vào
3. **Deploy** → xong!

## Cách dùng
1. Vào trang chủ web
2. Paste link Shopee (dạng `s.shopee.vn/...` hoặc `shopee.vn/...`)
3. Nhấn **Tạo link** → copy short link dạng `/ABC123/shopee`
4. Gửi short link này cho thành viên — khi bấm sẽ redirect tới affiliate link của bạn

## Cấu hình affiliate_id
Sửa trong file `app/api/shorten/route.ts`:
```ts
const AFFILIATE_ID = "17395950528"; // ← thay bằng ID của bạn
```
