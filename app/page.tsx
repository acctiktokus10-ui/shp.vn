"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [subId, setSubId] = useState("");
  const [result, setResult] = useState<{ shortUrl: string; affiliateLink: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit() {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    setCopied(false);

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), subId: subId.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Lỗi không xác định");
      setResult(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Lỗi không xác định");
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <span style={styles.logo}>🛍️</span>
          <h1 style={styles.title}>Shopee Link Wrapper</h1>
          <p style={styles.subtitle}>Bọc link affiliate Shopee thành short link gọn gàng</p>
        </div>

        {/* Form */}
        <div style={styles.form}>
          <label style={styles.label}>Link Shopee</label>
          <input
            style={styles.input}
            type="text"
            placeholder="https://s.shopee.vn/... hoặc https://shopee.vn/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />

          <label style={{ ...styles.label, marginTop: 12 }}>Sub ID (tùy chọn)</label>
          <input
            style={styles.input}
            type="text"
            placeholder="Zalo ID, tên thành viên..."
            value={subId}
            onChange={(e) => setSubId(e.target.value)}
          />

          <button
            style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Tạo link"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={styles.error}>❌ {error}</div>
        )}

        {/* Result */}
        {result && (
          <div style={styles.result}>
            <div style={styles.resultRow}>
              <div style={{ flex: 1 }}>
                <div style={styles.resultLabel}>🔗 Short link</div>
                <div style={styles.resultLink}>{result.shortUrl}</div>
              </div>
              <button
                style={{ ...styles.copyBtn, background: copied ? "#27ae60" : "#ee4d2d" }}
                onClick={() => copyToClipboard(result.shortUrl)}
              >
                {copied ? "✓ Đã copy" : "Copy"}
              </button>
            </div>

            <div style={styles.divider} />

            <div style={styles.resultRow}>
              <div style={{ flex: 1 }}>
                <div style={styles.resultLabel}>🏪 Affiliate link gốc</div>
                <div style={{ ...styles.resultLink, fontSize: 11, color: "#888", wordBreak: "break-all" }}>
                  {result.affiliateLink}
                </div>
              </div>
            </div>
          </div>
        )}

        <p style={styles.footer}>Link tồn tại 90 ngày • Powered by Vercel KV</p>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    background: "linear-gradient(135deg, #fff1ee 0%, #ffecd2 100%)",
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    padding: 32,
    width: "100%",
    maxWidth: 520,
    boxShadow: "0 8px 32px rgba(238,77,45,0.12)",
  },
  header: { textAlign: "center", marginBottom: 28 },
  logo: { fontSize: 48 },
  title: { margin: "8px 0 4px", fontSize: 24, fontWeight: 700, color: "#ee4d2d" },
  subtitle: { margin: 0, color: "#888", fontSize: 14 },
  form: { display: "flex", flexDirection: "column" },
  label: { fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 6 },
  input: {
    padding: "10px 14px",
    borderRadius: 8,
    border: "1.5px solid #e0e0e0",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s",
  },
  btn: {
    marginTop: 20,
    padding: "12px",
    background: "#ee4d2d",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  error: {
    marginTop: 16,
    padding: "10px 14px",
    background: "#fff5f5",
    border: "1px solid #ffd0cc",
    borderRadius: 8,
    color: "#c0392b",
    fontSize: 13,
  },
  result: {
    marginTop: 20,
    padding: 16,
    background: "#fff8f7",
    border: "1.5px solid #ffcdc5",
    borderRadius: 10,
  },
  resultRow: { display: "flex", alignItems: "center", gap: 12 },
  resultLabel: { fontSize: 11, fontWeight: 600, color: "#ee4d2d", marginBottom: 4, textTransform: "uppercase" },
  resultLink: { fontSize: 13, color: "#222", fontWeight: 500, wordBreak: "break-all" },
  divider: { margin: "12px 0", borderTop: "1px solid #ffe0da" },
  copyBtn: {
    padding: "8px 14px",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "background 0.2s",
  },
  footer: { textAlign: "center", marginTop: 20, fontSize: 11, color: "#bbb" },
};
