import { useState, useEffect } from "react";
import { festivalData, signingEvents, stageColors } from "./data";
import { parseTime, parseEndTime, formatCountdown } from "./utils";
import { Favorites, Act, SigningEvent } from "./types";
import TimelineView from "./views/TimelineView";
import StagesView from "./views/StagesView";
import FavoritesView from "./views/FavoritesView";
import SigningView from "./views/SigningView";
import { AppTranslation, Locale, detectLocale, translations } from "./i18n";

type ViewMode = "timeline" | "stages" | "signing" | "favorites";
type ActiveDay = "day1" | "day2";

export default function App() {
  const [locale, setLocale] = useState<Locale>(() => detectLocale());
  const [activeDay, setActiveDay] = useState<ActiveDay>("day1");
  const [favorites, setFavorites] = useState<Favorites>(() => {
    try {
      const saved = localStorage.getItem("simplelife-favorites");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("timeline");
  const t: AppTranslation = translations[locale];

  const formattedTime = currentTime.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = currentTime.toLocaleDateString(locale, {
    month: "numeric",
    day: "numeric",
    weekday: "short",
  });

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date());
    updateTime();

    const now = new Date();
    const msUntilNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    let intervalId: ReturnType<typeof setInterval> | null = null;
    const timeoutId = setTimeout(() => {
      updateTime();
      intervalId = setInterval(updateTime, 60000);
    }, msUntilNextMinute);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("simplelife-favorites", JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem("simplelife-locale", locale);
    } catch {}
  }, [locale]);

  const toggleFavorite = (day: string, stage: string, artist: string) => {
    const key = `${day}-${stage}-${artist}`;
    setFavorites((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isFavorite = (day: string, stage: string, artist: string) => {
    return favorites[`${day}-${stage}-${artist}`] || false;
  };

  const getCurrentMinutes = () => {
    return currentTime.getHours() * 60 + currentTime.getMinutes();
  };

  const getFavoritesList = (): (Act | SigningEvent)[] => {
    const dayData = festivalData[activeDay];
    const list: (Act | SigningEvent)[] = [];

    Object.entries(dayData.stages).forEach(([stage, acts]) => {
      acts.forEach((act) => {
        if (isFavorite(activeDay, stage, act.artist)) {
          list.push({
            ...act,
            stage,
            type: "live",
            startMin: parseTime(act.time),
            endMin: parseEndTime(act.time),
          });
        }
      });
    });

    signingEvents[activeDay].forEach((event) => {
      if (isFavorite(activeDay, "signing", event.artist)) {
        list.push({
          ...event,
          stage: t.signing.label,
          type: "signing",
          startMin: parseTime(event.time),
          endMin: parseEndTime(event.time),
        });
      }
    });

    return list.sort((a, b) => a.startMin! - b.startMin!);
  };

  const getUpcoming = () => {
    const now = getCurrentMinutes();
    const favList = getFavoritesList();
    return favList.filter((act) => act.endMin! > now);
  };

  const dayData = festivalData[activeDay];
  const upcomingFavs = getUpcoming();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(145deg, #0a1628 0%, #0d1f35 40%, #0a1a2e 100%)",
        color: "#e2e8f0",
        fontFamily:
          '"Noto Sans TC", "SF Pro Display", -apple-system, sans-serif',
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 15% 20%, rgba(255, 136, 176, 0.08) 0%, transparent 40%),
                          radial-gradient(circle at 85% 60%, rgba(98, 250, 3, 0.05) 0%, transparent 40%),
                          radial-gradient(circle at 50% 90%, rgba(2, 131, 184, 0.06) 0%, transparent 45%)`,
          pointerEvents: "none",
        }}
      />

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(20px)",
          background: "rgba(10, 22, 40, 0.9)",
          borderBottom: "1px solid rgba(255, 136, 176, 0.2)",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "12px 16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  background: "linear-gradient(135deg, #FF88B0, #62FA03)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  margin: 0,
                }}
              >
                Simple Life 2025
              </h1>
              <p
                style={{
                  fontSize: 11,
                  color: "#64748b",
                  margin: "2px 0 0",
                  letterSpacing: "0.05em",
                }}
              >
                簡單生活節 20th · 台北華山
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                padding: "8px 12px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                minWidth: 200,
                maxWidth: "100%",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  width: "100%",
                  textAlign: "right",
                }}
              >
                {t.clockLabel}
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#e2e8f0",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {formattedTime}
              </div>
              <div style={{ fontSize: 11, color: "#64748b", textAlign: "right" }}>
                {formattedDate} · {t.timezone}
              </div>
              <div style={{ fontSize: 11, color: "#94a3b8", textAlign: "right" }}>
                {dayData.date}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {(["day1", "day2"] as const).map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  borderRadius: 10,
                  border:
                    activeDay === day
                      ? "1px solid rgba(255, 136, 176, 0.5)"
                      : "1px solid rgba(255,255,255,0.1)",
                  background:
                    activeDay === day
                      ? "linear-gradient(135deg, rgba(255, 136, 176, 0.2), rgba(98, 250, 3, 0.08))"
                      : "rgba(255,255,255,0.03)",
                  color: activeDay === day ? "#f1f5f9" : "#64748b",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                {festivalData[day].date}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 6 }}>
            {[
              { key: "timeline" as const, label: t.nav.timeline },
              { key: "stages" as const, label: t.nav.stages },
              {
                key: "signing" as const,
                label: t.nav.signing(signingEvents[activeDay].length),
              },
              {
                key: "favorites" as const,
                label: t.nav.favorites(getFavoritesList().length),
              },
            ].map((mode) => (
              <button
                key={mode.key}
                onClick={() => setViewMode(mode.key)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "none",
                  background:
                    viewMode === mode.key
                      ? "rgba(255,255,255,0.12)"
                      : "transparent",
                  color: viewMode === mode.key ? "#f1f5f9" : "#64748b",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 500,
                  transition: "all 0.15s",
                }}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {upcomingFavs.length > 0 && viewMode !== "favorites" && (
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(255, 136, 176, 0.12), rgba(98, 250, 3, 0.06))",
            borderBottom: "1px solid rgba(255, 136, 176, 0.15)",
            padding: "12px 16px",
          }}
        >
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <div
              style={{
                fontSize: 10,
                color: "#64748b",
                marginBottom: 6,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {t.upcomingTitle}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                overflowX: "auto",
                paddingBottom: 4,
              }}
            >
              {upcomingFavs.slice(0, 3).map((act, i) => {
                const now = getCurrentMinutes();
                const isNow = act.startMin! <= now && act.endMin! > now;
                const minutesUntil = act.startMin! - now;
                const isSigning = act.type === "signing";
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "6px 10px",
                      background: isNow
                        ? "rgba(98, 250, 3, 0.15)"
                        : isSigning
                        ? "rgba(255, 136, 176, 0.1)"
                        : "rgba(255,255,255,0.05)",
                      borderRadius: 8,
                      border: isNow
                        ? "1px solid rgba(98, 250, 3, 0.4)"
                        : isSigning
                        ? "1px solid rgba(255, 136, 176, 0.3)"
                        : "1px solid rgba(255,255,255,0.08)",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 4,
                        height: 28,
                        borderRadius: 2,
                        background: isSigning
                          ? "#FF88B0"
                          : stageColors[act.stage || ""]?.border || "#0283B8",
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#f1f5f9",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        {isSigning && <span style={{ fontSize: 11 }}>✍️</span>}
                        {act.artist}
                      </div>
                      <div style={{ fontSize: 11, color: "#94a3b8" }}>
                        {act.stage} ·{" "}
                        {isNow ? (
                          <span style={{ color: "#62FA03" }}>{t.common.now}</span>
                        ) : (
                          <span>
                            {t.timeUntil(formatCountdown(minutesUntil) || "")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <main style={{ maxWidth: 960, margin: "0 auto", padding: 16 }}>
        {viewMode === "timeline" && (
          <TimelineView
            stages={dayData.stages}
            activeDay={activeDay}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            getCurrentMinutes={getCurrentMinutes}
            translation={t}
          />
        )}

        {viewMode === "stages" && (
          <StagesView
            stages={dayData.stages}
            activeDay={activeDay}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            getCurrentMinutes={getCurrentMinutes}
            translation={t}
          />
        )}

        {viewMode === "favorites" && (
          <FavoritesView
            favorites={getFavoritesList()}
            activeDay={activeDay}
            toggleFavorite={toggleFavorite}
            getCurrentMinutes={getCurrentMinutes}
            translation={t}
          />
        )}

        {viewMode === "signing" && (
          <SigningView
            events={signingEvents[activeDay]}
            activeDay={activeDay}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            getCurrentMinutes={getCurrentMinutes}
            translation={t}
          />
        )}
      </main>

      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 16px 16px",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            padding: 16,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "#64748b",
              marginBottom: 12,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {t.mapButton}
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <img
              src="/G63ZjXObkAIoMTz.jpg"
              alt={t.mapAlt}
              style={{
                width: "100%",
                display: "block",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "16px 16px 24px",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            padding: 16,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "#64748b",
              marginBottom: 12,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {t.officialLinks}
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://www.threads.com/@simplelifetw"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 12px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#e2e8f0",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 500,
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 16 }}>🧵</span>
              Threads
            </a>
            <a
              href="https://www.instagram.com/simplelifetw/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 12px",
                borderRadius: 8,
                background:
                  "linear-gradient(135deg, rgba(225, 48, 108, 0.15), rgba(131, 58, 180, 0.1))",
                border: "1px solid rgba(225, 48, 108, 0.3)",
                color: "#e2e8f0",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 500,
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 16 }}>📷</span>
              Instagram
            </a>
            <a
              href="https://streetvoice.notion.site/2025-20th-2a5147c2c9128056b0baf5aabb55bfd1"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 12px",
                borderRadius: 8,
                background: "rgba(251, 191, 36, 0.1)",
                border: "1px solid rgba(251, 191, 36, 0.25)",
                color: "#e2e8f0",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 500,
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 16 }}>🛍️</span>
              {t.goodsStatus}
            </a>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(10, 22, 40, 0.95)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255, 136, 176, 0.12)",
          padding: "10px 16px",
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, color: "#94a3b8" }}>{t.languageLabel}</span>
            <div style={{ display: "flex", gap: 6 }}>
              {(["ja", "zh-TW"] as Locale[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLocale(lang)}
                  style={{
                    padding: "4px 8px",
                    borderRadius: 6,
                    border:
                      locale === lang
                        ? "1px solid rgba(255, 136, 176, 0.5)"
                        : "1px solid rgba(255,255,255,0.1)",
                    background:
                      locale === lang
                        ? "linear-gradient(135deg, rgba(255, 136, 176, 0.25), rgba(98, 250, 3, 0.1))"
                        : "rgba(255,255,255,0.03)",
                    color: locale === lang ? "#f1f5f9" : "#64748b",
                    cursor: "pointer",
                    fontSize: 11,
                    fontWeight: 600,
                    transition: "all 0.15s",
                  }}
                >
                  {lang === "ja" ? "日本語" : "繁體中文"}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", flex: 1 }}>
            {Object.entries(stageColors).map(([stage, colors]) => (
              <div
                key={stage}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 3,
                    background: colors.border,
                  }}
                />
                <span style={{ fontSize: 11, color: "#94a3b8" }}>{stage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ height: 60 }} />

    </div>
  );
}
