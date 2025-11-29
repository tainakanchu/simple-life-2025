import { Act, SigningEvent } from '../types'
import ActCard from '../components/ActCard'
import SigningCard from '../components/SigningCard'
import { AppTranslation } from '../i18n'

interface FavoritesViewProps {
  favorites: (Act | SigningEvent)[]
  activeDay: string
  toggleFavorite: (day: string, stage: string, artist: string) => void
  getCurrentMinutes: () => number
  isLiveDay: boolean
  translation: AppTranslation
}

export default function FavoritesView({
  favorites,
  activeDay,
  toggleFavorite,
  getCurrentMinutes,
  isLiveDay,
  translation
}: FavoritesViewProps) {
  const now = isLiveDay ? getCurrentMinutes() : null

  if (favorites.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        color: '#64748b',
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>☆</div>
        <div style={{ fontSize: 14 }}>{translation.favoritesEmptyTitle}</div>
        <div style={{ fontSize: 12, marginTop: 8 }}>{translation.favoritesEmptyHint}</div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {favorites.map((act, i) => {
        const isNow = isLiveDay && now !== null && act.startMin! <= now && act.endMin! > now
        const isPast = isLiveDay && now !== null && act.endMin! <= now
        const isSigning = act.type === 'signing'
        const minutesUntil = !isLiveDay || now === null
          ? null
          : isPast
          ? null
          : isNow
          ? act.endMin! - now
          : act.startMin! - now

        if (isSigning) {
          return (
            <SigningCard
              key={i}
              event={act as SigningEvent}
              activeDay={activeDay}
              isFavorite={() => true}
              toggleFavorite={toggleFavorite}
              isNow={isNow}
              isPast={isPast}
              minutesUntil={minutesUntil}
              translation={translation}
            />
          )
        }

        return (
          <ActCard
            key={i}
            act={act as Act}
            activeDay={activeDay}
            isFavorite={() => true}
            toggleFavorite={toggleFavorite}
            isNow={isNow}
            isPast={isPast}
            minutesUntil={minutesUntil}
            showStage
            translation={translation}
          />
        )
      })}
    </div>
  )
}
