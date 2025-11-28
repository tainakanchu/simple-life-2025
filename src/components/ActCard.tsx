import { Act } from "../types";
import { stageColors } from "../data";
import { AppTranslation } from "../i18n";

interface ActCardProps {
  act: Act;
  activeDay: string;
  isFavorite: (day: string, stage: string, artist: string) => boolean;
  toggleFavorite: (day: string, stage: string, artist: string) => void;
  isNow: boolean;
  isPast: boolean;
  showStage?: boolean;
  translation: AppTranslation;
}

export default function ActCard({
  act,
  activeDay,
  isFavorite,
  toggleFavorite,
  isNow,
  isPast,
  showStage,
  translation,
}: ActCardProps) {
  const fav = isFavorite(activeDay, act.stage || "", act.artist);
  const colors = stageColors[act.stage || ""] || {
    bg: "rgba(100,100,100,0.15)",
    border: "#888",
    text: "#aaa",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        borderRadius: 10,
        background: isNow
          ? "linear-gradient(135deg, rgba(98, 250, 3, 0.15), rgba(98, 250, 3, 0.05))"
          : isPast
          ? "rgba(255,255,255,0.02)"
          : colors.bg,
        border: isNow
          ? "1px solid rgba(98, 250, 3, 0.4)"
          : `1px solid ${
              isPast ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.08)"
            }`,
        opacity: isPast ? 0.5 : 1,
        transition: "all 0.2s",
      }}
    >
      <div
        style={{
          width: 3,
          height: 36,
          borderRadius: 2,
          background: isNow ? "#62FA03" : colors.border,
          opacity: isPast ? 0.4 : 1,
        }}
      />

      <div
        style={{
          width: 70,
          flexShrink: 0,
          fontSize: 12,
          fontVariantNumeric: "tabular-nums",
          color: isNow ? "#62FA03" : "#94a3b8",
          fontWeight: isNow ? 600 : 400,
        }}
      >
        {act.time.split(" - ")[0]}
        <span style={{ opacity: 0.5 }}> - {act.time.split(" - ")[1]}</span>
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
          {act.artist}
        </div>
        <div
          style={{
            fontSize: 11,
            color: "#64748b",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {showStage && <span style={{ color: colors.text }}>{act.stage}</span>}
          {act.sub && (
            <>
              {showStage && <span>·</span>}
              <span
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {act.sub}
              </span>
            </>
          )}
          {isNow && (
            <span style={{ color: "#62FA03", fontWeight: 600 }}>
              {translation.common.now}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => toggleFavorite(activeDay, act.stage || "", act.artist)}
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          border: "none",
          background: fav
            ? "rgba(255, 136, 176, 0.2)"
            : "rgba(255,255,255,0.05)",
          color: fav ? "#FF88B0" : "#64748b",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          transition: "all 0.15s",
          flexShrink: 0,
        }}
      >
        {fav ? "★" : "☆"}
      </button>
    </div>
  );
}
