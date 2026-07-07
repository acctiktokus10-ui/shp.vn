import type { Metadata } from "next";
export const metadata: Metadata = { title: "Mua Sắm Hoàn Tiền" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body style={{ margin: 0, fontFamily: "sans-serif", background: "#f5f5f5" }}>
        {children}
      </body>
    </html>
  );
}
