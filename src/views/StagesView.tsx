import { Stage } from "../types";
import { parseTime, parseEndTime } from "../utils";
import { stageColors } from "../data";
import ActCard from "../components/ActCard";
import { AppTranslation } from "../i18n";

interface StagesViewProps {
  stages: Stage;
  activeDay: string;
  isFavorite: (day: string, stage: string, artist: string) => boolean;
  toggleFavorite: (day: string, stage: string, artist: string) => void;
  getCurrentMinutes: () => number;
  translation: AppTranslation;
}

export default function StagesView({
  stages,
  activeDay,
  isFavorite,
  toggleFavorite,
  getCurrentMinutes,
  translation,
}: StagesViewProps) {
  const now = getCurrentMinutes();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {Object.entries(stages).map(([stage, acts]) => (
        <div key={stage}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
              paddingBottom: 8,
              borderBottom: `2px solid ${
                stageColors[stage]?.border || "#60a5fa"
              }`,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 4,
                background: stageColors[stage]?.border || "#60a5fa",
              }}
            />
            <h2
              style={{
                fontSize: 16,
                fontWeight: 700,
                margin: 0,
                color: stageColors[stage]?.text,
              }}
            >
              {stage}
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {acts.map((act, i) => {
              const startMin = parseTime(act.time);
              const endMin = parseEndTime(act.time);
              const isNow = startMin <= now && endMin > now;
              const isPast = endMin <= now;
              const minutesUntil = isPast
                ? null
                : isNow
                ? endMin - now
                : startMin - now;
              return (
                <ActCard
                  key={i}
                  act={{ ...act, stage }}
                  activeDay={activeDay}
                  isFavorite={isFavorite}
                  toggleFavorite={toggleFavorite}
                  isNow={isNow}
                  isPast={isPast}
                  minutesUntil={minutesUntil}
                  translation={translation}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
