
"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

const KittyFace = () => (
  <svg viewBox="0 0 120 100" width="110" height="92" xmlns="http://www.w3.org/2000/svg">
    <polygon points="10,35 25,5 40,35" fill="#ffb7c5" stroke="#ff8fab" strokeWidth="2"/>
    <polygon points="80,35 95,5 110,35" fill="#ffb7c5" stroke="#ff8fab" strokeWidth="2"/>
    <polygon points="16,33 25,12 34,33" fill="#ff8fab"/>
    <polygon points="86,33 95,12 104,33" fill="#ff8fab"/>
    <ellipse cx="60" cy="58" rx="50" ry="45" fill="#fff" stroke="#ffb7c5" strokeWidth="2.5"/>
    <ellipse cx="42" cy="50" rx="7" ry="8" fill="#1a1a1a"/>
    <ellipse cx="78" cy="50" rx="7" ry="8" fill="#1a1a1a"/>
    <circle cx="45" cy="47" r="2.5" fill="white"/>
    <circle cx="81" cy="47" r="2.5" fill="white"/>
    <g transform="translate(78, 20)">
      <polygon points="0,8 -14,0 -14,16" fill="#ff4d6d"/>
      <polygon points="0,8 14,0 14,16" fill="#ff4d6d"/>
      <circle cx="0" cy="8" r="4" fill="#ff758c"/>
    </g>
    <ellipse cx="60" cy="62" rx="4" ry="3" fill="#ffb7c5"/>
    <line x1="8" y1="58" x2="48" y2="63" stroke="#ccc" strokeWidth="1.5"/>
    <line x1="8" y1="65" x2="48" y2="66" stroke="#ccc" strokeWidth="1.5"/>
    <line x1="72" y1="63" x2="112" y2="58" stroke="#ccc" strokeWidth="1.5"/>
    <line x1="72" y1="66" x2="112" y2="65" stroke="#ccc" strokeWidth="1.5"/>
  </svg>
);

const MEOZZ_IMG = "data:image/png;base64,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";

const emotes = ["✨", "🎀", "💕", "🌸", "💖", "🍭", "🎵", "🌷", "🩷", "⭐"];

function HomeContent() {
  const searchParams = useSearchParams();
  const isExpiredRedirect = searchParams.get("expired") === "1";
  const [showExpiredOverlay, setShowExpiredOverlay] = useState(isExpiredRedirect);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Nunito', sans-serif; }

        .floating { animation: floating 3s ease-in-out infinite; }
        @keyframes floating {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .emote-float {
          position: fixed; font-size: 20px; opacity: 0;
          pointer-events: none;
          animation: emoteRise 4.5s ease-in-out infinite;
        }
        @keyframes emoteRise {
          0% { opacity:0; transform:translateY(0) scale(0.5); }
          20% { opacity:1; transform:translateY(-40px) scale(1); }
          80% { opacity:0.7; transform:translateY(-140px) scale(1); }
          100% { opacity:0; transform:translateY(-180px) scale(0.8); }
        }
        .card {
          background: rgba(255,255,255,0.93);
          backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: 32px 28px 24px;
          width: 100%; max-width: 420px;
          box-shadow: 0 20px 60px rgba(255,100,150,0.18);
          border: 2px solid rgba(255,180,200,0.4);
          position: relative;
        }
        .input-field {
          width: 100%; padding: 12px 16px;
          border-radius: 14px; border: 2px solid #ffd6e0;
          font-size: 14px; font-family: 'Nunito', sans-serif;
          font-weight: 600; color: #444; background: #fff9fb;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-field:focus { border-color: #ff8fab; box-shadow: 0 0 0 3px rgba(255,143,171,0.15); }
        .input-field::placeholder { color: #dbb; font-weight: 500; }
        .btn-main {
          width: 100%; margin-top: 14px; padding: 13px;
          background: linear-gradient(135deg, #ff6b9d, #ff4d6d);
          color: white; border: none; border-radius: 14px;
          font-size: 15px; font-weight: 800; font-family: 'Nunito', sans-serif;
          cursor: pointer; transition: all 0.2s;
          box-shadow: 0 6px 20px rgba(255,77,109,0.35);
        }
        .btn-main:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255,77,109,0.45); }
        .btn-main:disabled { opacity:0.7; cursor:not-allowed; transform:none; }
        .copy-btn {
          padding: 8px 14px; border: none; border-radius: 10px;
          font-size: 13px; font-weight: 700;
          font-family: 'Nunito', sans-serif; cursor: pointer;
          transition: all 0.2s; white-space: nowrap;
        }
      `}</style>

      {emotes.map((e, i) => (
        <div key={i} className="emote-float" style={{
          left: `${5 + i * 9.5}%`, bottom: `${8 + (i % 3) * 6}%`,
          animationDelay: `${i * 0.5}s`, animationDuration: `${3.5 + i * 0.3}s`,
        }}>{e}</div>
      ))}

      <main style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "24px 16px", gap: 24,
        background: "linear-gradient(160deg, #ffe0ec 0%, #ffd6f0 40%, #e8d5ff 100%)",
        filter: showExpiredOverlay ? "blur(10px)" : "none",
        transition: "filter 0.3s ease",
        pointerEvents: showExpiredOverlay ? "none" : "auto",
      }}>

        {/* Ảnh Meozz thật */}
        <div className="floating" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{
            width: 110, height: 110,
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid #ffb7c5",
            boxShadow: "0 8px 30px rgba(255,100,150,0.25)",
          }}>
            <img src={MEOZZ_IMG} alt="Meozz" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{
            marginTop: 8, background: "linear-gradient(135deg,#ff6b9d,#ff4d6d)",
            color: "white", borderRadius: 20, padding: "4px 16px",
            fontSize: 13, fontWeight: 800,
          }}>Meozz ✏️</div>
          <div style={{ fontSize: 11, color: "#ff8fab", fontWeight: 700, marginTop: 2 }}>Business 🌸</div>
        </div>

        {/* Card form */}
        <div className="card">
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div className="floating" style={{ display: "inline-block", marginBottom: 6 }}>
              <KittyFace />
            </div>
            <h1 style={{
              fontSize: 20, fontWeight: 900,
              background: "linear-gradient(135deg,#ff6b9d,#ff4d6d)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              marginBottom: 4,
            }}>🎀 Meozz Auto Tool 🎀</h1>
            <p style={{ color: "#ff8fab", fontSize: 12, fontWeight: 600 }}>
              ✨ Tool tự động cho nhóm Zalo ✨
            </p>
          </div>

          <div style={{
            background: "#f6f9ff",
            border: "2px solid #dbe6ff",
            borderRadius: 16,
            padding: "14px 16px",
            marginBottom: 14,
          }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: "#5a6fd8", marginBottom: 8 }}>
              🏅 Các tính năng VIP
            </p>
            {[
              "Chuyển link tự động 24/7",
              "Tra #donhang tự động 24/7",
              "Tra #vitien tự động 24/7",
              "Rút tiền tự động 24/7",
            ].map((f, i) => (
              <p key={i} style={{ fontSize: 13, color: "#333", fontWeight: 600, margin: "4px 0" }}>
                ✅ {f}
              </p>
            ))}
            <div style={{ borderTop: "1px dashed #c9d6f5", margin: "10px 0" }} />
            <p style={{ fontSize: 13, fontWeight: 800, color: "#5a6fd8", marginBottom: 8 }}>
              🎗️ Nhiệm vụ của bạn
            </p>
            {[
              "Báo cáo chuyển đổi mỗi ngày 2p",
              "Chuyển tiền khi user tạo yêu cầu",
            ].map((f, i) => (
              <p key={i} style={{ fontSize: 13, color: "#333", fontWeight: 600, margin: "4px 0" }}>
                ✅ {f}
              </p>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <div style={{
              flex: 1,
              background: "linear-gradient(135deg,#fff0f5,#fff5f8)",
              border: "2px solid #ffd6e0",
              borderRadius: 14,
              padding: "10px 12px",
              display: "flex", flexDirection: "column", justifyContent: "center",
            }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: "#ff8fab", textTransform: "uppercase" }}>Giá gói</span>
              <span style={{ fontSize: 18, fontWeight: 900, color: "#ff4d6d" }}>600k / tháng</span>
            </div>
            <a
              href="https://zaloapp.com/qr/p/nlk1cpomu2t0"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-main"
              style={{
                flex: 1, width: "auto", margin: 0,
                background: "linear-gradient(135deg,#ff4d6d,#c9184a)",
                display: "flex", alignItems: "center", justifyContent: "center",
                textDecoration: "none",
              }}
            >
              🔥 Mua ngay
            </a>
          </div>

          <p style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: "#ffaac5", fontWeight: 600 }}>
            📞 Liên hệ làm tool: <strong style={{ color: "#ff6b9d" }}>0397.088.175</strong>
          </p>
        </div>

        {/* SĐT liên hệ làm tool ở dưới */}
        <div style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          borderRadius: 20,
          padding: "12px 24px",
          border: "2px solid rgba(255,180,200,0.4)",
          boxShadow: "0 8px 24px rgba(255,100,150,0.12)",
          textAlign: "center",
        }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#ff6b9d" }}>
            🌸 Hãy luôn mỉm cười và cố gắng mỗi ngày bạn nhé! 💖
          </p>
        </div>
      </main>

      {showExpiredOverlay && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 2000, padding: 20,
        }}>
          <div style={{
            background: "#fff", borderRadius: 20, padding: "28px 22px",
            maxWidth: 320, width: "100%", textAlign: "center",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>⏰</div>
            <p style={{ fontSize: 16, fontWeight: 800, color: "#ff4d6d", marginBottom: 10, lineHeight: 1.5 }}>
              Xin lỗi tình yêu! Link này đã hết hiệu lực vì quá 30 phút.
            </p>
            <p style={{ fontSize: 14, color: "#555", fontWeight: 600, marginBottom: 20, lineHeight: 1.5 }}>
              Hãy quay lại nhóm để tạo lại link mới nhé!
            </p>
            <button
              className="btn-main"
              style={{ margin: 0 }}
              onClick={() => setShowExpiredOverlay(false)}
            >
              Đã Hiểu
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
