import { SigningEvent } from "../types";
import { parseTime, parseEndTime, formatCountdown } from "../utils";

interface SigningViewProps {
  events: SigningEvent[];
  activeDay: string;
  isFavorite: (day: string, stage: string, artist: string) => boolean;
  toggleFavorite: (day: string, stage: string, artist: string) => void;
  getCurrentMinutes: () => number;
}

export default function SigningView({
  events,
  activeDay,
  isFavorite,
  toggleFavorite,
  getCurrentMinutes,
}: SigningViewProps) {
  const now = getCurrentMinutes();

  const toggleSigningFavorite = (artist: string) => {
    toggleFavorite(activeDay, "signing", artist);
  };

  const isSigningFavorite = (artist: string) => {
    return isFavorite(activeDay, "signing", artist);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 136, 176, 0.15), rgba(2, 131, 184, 0.08))",
          border: "1px solid rgba(255, 136, 176, 0.3)",
          borderRadius: 12,
          padding: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 18 }}>✦</span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              background: "linear-gradient(135deg, #FF88B0, #0283B8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            音樂人簽名會
          </span>
        </div>
        <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.8 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
            <span style={{ color: "#FF88B0" }}>📍</span>
            <span>Legacy 舞台左側の入口付近</span>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
            <span style={{ color: "#FF88B0" }}>📝</span>
            <span>公式グッズ・アーティストグッズのみ対応</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ color: "#FF88B0" }}>⚠️</span>
            <span>スタッフの案内に従って並んでください</span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {events.map((event, i) => {
          const startMin = parseTime(event.time);
          const endMin = parseEndTime(event.time);
          const isNow = startMin <= now && endMin > now;
          const isPast = endMin <= now;
          const minutesUntil = startMin - now;
          const fav = isSigningFavorite(event.artist);

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                borderRadius: 10,
                background: isNow
                  ? "linear-gradient(135deg, rgba(255, 136, 176, 0.2), rgba(2, 131, 184, 0.12))"
                  : isPast
                  ? "rgba(255,255,255,0.02)"
                  : "rgba(255, 136, 176, 0.08)",
                border: isNow
                  ? "1px solid rgba(255, 136, 176, 0.5)"
                  : fav && !isPast
                  ? "1px solid rgba(255, 136, 176, 0.4)"
                  : "1px solid rgba(255,255,255,0.08)",
                opacity: isPast ? 0.5 : 1,
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: isNow
                    ? "linear-gradient(135deg, #FF88B0, #0283B8)"
                    : "rgba(255, 136, 176, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                ✍️
              </div>

              <div
                style={{
                  width: 80,
                  flexShrink: 0,
                  fontSize: 12,
                  fontVariantNumeric: "tabular-nums",
                  color: isNow ? "#FF88B0" : "#94a3b8",
                  fontWeight: isNow ? 600 : 400,
                }}
              >
                {event.time.split(" - ")[0]}
                <span style={{ opacity: 0.5 }}>
                  {" "}
                  - {event.time.split(" - ")[1]}
                </span>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: isPast ? "#64748b" : "#f1f5f9",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {event.artist}
                </div>
                <div style={{ fontSize: 11, color: "#64748b" }}>
                  {isNow ? (
                    <span style={{ color: "#FF88B0", fontWeight: 600 }}>
                      サイン会中!
                    </span>
                  ) : isPast ? (
                    <span>終了</span>
                  ) : minutesUntil <= 30 ? (
                    <span style={{ color: "#62FA03" }}>
                      あと {formatCountdown(minutesUntil)}
                    </span>
                  ) : (
                    <span>サイン会</span>
                  )}
                </div>
              </div>

              {!isPast && !isNow && minutesUntil <= 60 && (
                <div
                  style={{
                    padding: "4px 8px",
                    borderRadius: 6,
                    background: "rgba(98, 250, 3, 0.15)",
                    border: "1px solid rgba(98, 250, 3, 0.3)",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#62FA03",
                    flexShrink: 0,
                  }}
                >
                  {formatCountdown(minutesUntil)}
                </div>
              )}

              <button
                onClick={() => toggleSigningFavorite(event.artist)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  border: "none",
                  background: fav
                    ? "rgba(255, 136, 176, 0.25)"
                    : "rgba(255,255,255,0.05)",
                  color: fav ? "#FF88B0" : "#64748b",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  transition: "all 0.15s",
                  flexShrink: 0,
                }}
              >
                {fav ? "♥" : "♡"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
