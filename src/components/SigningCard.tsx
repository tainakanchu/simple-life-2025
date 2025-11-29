import { SigningEvent } from "../types";
import { AppTranslation } from "../i18n";
import { formatCountdown } from "../utils";

interface SigningCardProps {
  event: SigningEvent;
  activeDay: string;
  isFavorite: (day: string, stage: string, artist: string) => boolean;
  toggleFavorite: (day: string, stage: string, artist: string) => void;
  isNow: boolean;
  isPast: boolean;
  minutesUntil?: number | null;
  translation: AppTranslation;
}

export default function SigningCard({
  event,
  activeDay,
  isFavorite,
  toggleFavorite,
  isNow,
  isPast,
  minutesUntil,
  translation,
}: SigningCardProps) {
  const fav = isFavorite(activeDay, "signing", event.artist);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        borderRadius: 10,
        background: isNow
          ? "linear-gradient(135deg, rgba(255, 136, 176, 0.2), rgba(2, 131, 184, 0.12))"
          : isPast
          ? "rgba(255,255,255,0.02)"
          : "rgba(255, 136, 176, 0.1)",
        border: isNow
          ? "1px solid rgba(255, 136, 176, 0.5)"
          : "1px solid rgba(255,255,255,0.08)",
        opacity: isPast ? 0.5 : 1,
        transition: "all 0.2s",
      }}
    >
      <div
        style={{
          width: 3,
          height: 36,
          borderRadius: 2,
          background: "#FF88B0",
          opacity: isPast ? 0.4 : 1,
        }}
      />

      <div
        style={{
          width: 70,
          flexShrink: 0,
          fontSize: 12,
          fontVariantNumeric: "tabular-nums",
          color: isNow ? "#FF88B0" : "#94a3b8",
          fontWeight: isNow ? 600 : 400,
        }}
      >
        {event.time.split(" - ")[0]}
        <span style={{ opacity: 0.5 }}> - {event.time.split(" - ")[1]}</span>
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
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ fontSize: 12 }}>✍️</span>
          {event.artist}
        </div>
        <div
          style={{
            fontSize: 11,
            color: "#64748b",
          }}
        >
          <span style={{ color: "#FF88B0" }}>{translation.signing.label}</span>
          {isNow && (
            <span style={{ color: "#FF88B0", fontWeight: 600, marginLeft: 6 }}>
              {translation.common.now}
            </span>
          )}
          {!isPast && !isNow && minutesUntil !== undefined && minutesUntil !== null && (
            <span style={{ marginLeft: 6, color: "#94a3b8" }}>
              {translation.timeUntil(formatCountdown(minutesUntil) || "")}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => toggleFavorite(activeDay, "signing", event.artist)}
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
}
