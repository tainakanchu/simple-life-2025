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
  translation: AppTranslation
}

export default function TimelineView({
  stages,
  activeDay,
  isFavorite,
  toggleFavorite,
  getCurrentMinutes,
  translation
}: TimelineViewProps) {
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

  const now = getCurrentMinutes()
  let currentHour: number | null = null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {allActs.map((act, i) => {
        const hour = Math.floor(act.startMin / 60)
        const showHour = hour !== currentHour
        currentHour = hour
        const isNow = act.startMin <= now && act.endMin > now
        const isPast = act.endMin <= now

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
            <ActCard
              act={act}
              activeDay={activeDay}
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
              isNow={isNow}
              isPast={isPast}
              showStage
              translation={translation}
            />
          </React.Fragment>
        )
      })}
    </div>
  )
}