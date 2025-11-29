import React from 'react'
import { Stage } from '../types'
import { parseTime, parseEndTime } from '../utils'
import ActCard from '../components/ActCard'
import { AppTranslation } from '../i18n'

interface TimelineViewProps {
  stages: Stage
  activeDay: string
  isFavorite: (day: string, stage: string, artist: string) => boolean
  toggleFavorite: (day: string, stage: string, artist: string) => void
  getCurrentMinutes: () => number
  isLiveDay: boolean
  translation: AppTranslation
}

export default function TimelineView({
  stages,
  activeDay,
  isFavorite,
  toggleFavorite,
  getCurrentMinutes,
  isLiveDay,
  translation
}: TimelineViewProps) {
  const scrollTargetRef = React.useRef<HTMLDivElement | null>(null)
  const hasScrolledRef = React.useRef(false)
  React.useEffect(() => {
    hasScrolledRef.current = false
  }, [activeDay])

  const allActs: any[] = []
  Object.entries(stages).forEach(([stage, acts]) => {
    acts.forEach((act) => {
      allActs.push({
        ...act,
        stage,
        startMin: parseTime(act.time),
        endMin: parseEndTime(act.time),
      })
    })
  })
  allActs.sort((a, b) => a.startMin - b.startMin)

  const now = isLiveDay ? getCurrentMinutes() : null
  let currentHour: number | null = null
  const scrollTargetIndex =
    isLiveDay && now !== null
      ? (() => {
          const nowIdx = allActs.findIndex(
            (act) => act.startMin <= now && act.endMin > now
          )
          if (nowIdx >= 0) return nowIdx
          const upcomingIdx = allActs.findIndex((act) => act.endMin > now)
          if (upcomingIdx >= 0) return upcomingIdx
          return allActs.length - 1
        })()
      : -1

  React.useEffect(() => {
    if (!isLiveDay || scrollTargetIndex === -1 || hasScrolledRef.current) return
    const el = scrollTargetRef.current
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      hasScrolledRef.current = true
    }
  }, [isLiveDay, now, scrollTargetIndex])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {allActs.map((act, i) => {
        const hour = Math.floor(act.startMin / 60)
        const showHour = hour !== currentHour
        currentHour = hour
        const isNow = isLiveDay && now !== null && act.startMin <= now && act.endMin > now
        const isPast = isLiveDay && now !== null && act.endMin <= now
        const minutesUntil = !isLiveDay || now === null
          ? null
          : isPast
          ? null
          : isNow
          ? act.endMin - now
          : act.startMin - now
        const shouldAttachRef = i === scrollTargetIndex

        return (
          <React.Fragment key={i}>
            {showHour && (
              <div style={{
                fontSize: 12,
                color: '#64748b',
                fontWeight: 600,
                padding: '12px 0 4px',
                borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}>
                {hour}:00
              </div>
            )}
            <div ref={shouldAttachRef ? scrollTargetRef : undefined}>
              <ActCard
                act={act}
                activeDay={activeDay}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
                isNow={isNow}
                isPast={isPast}
                minutesUntil={minutesUntil}
                showStage
                translation={translation}
              />
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}
