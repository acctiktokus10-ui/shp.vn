
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
              href="https://zalo.me/g/xqgfxvoidkgodxx0ubvy"
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
              🌷 Mua ngay
            </a>
          </div>

          <div style={{
            marginTop: 12,
            background: "linear-gradient(135deg,#fff3d6,#ffe6b3)",
            border: "2px solid #ffcc66",
            borderRadius: 14,
            padding: "10px 14px",
            textAlign: "center",
            boxShadow: "0 4px 14px rgba(255,180,50,0.25)",
          }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: "#b7791f", lineHeight: 1.5, margin: 0 }}>
              🎁 Ưu đãi 500k/tháng nếu có người giới thiệu hoặc biết qua nhóm nào — hãy liên hệ admin nhóm đó để nhận ưu đãi!
            </p>
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
