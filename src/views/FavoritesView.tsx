import { Act, SigningEvent } from '../types'
import ActCard from '../components/ActCard'
import SigningCard from '../components/SigningCard'

interface FavoritesViewProps {
  favorites: (Act | SigningEvent)[]
  activeDay: string
  toggleFavorite: (day: string, stage: string, artist: string) => void
  getCurrentMinutes: () => number
}

export default function FavoritesView({
  favorites,
  activeDay,
  toggleFavorite,
  getCurrentMinutes
}: FavoritesViewProps) {
  const now = getCurrentMinutes()

  if (favorites.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        color: '#64748b',
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>☆</div>
        <div style={{ fontSize: 14 }}>お気に入りがありません</div>
        <div style={{ fontSize: 12, marginTop: 8 }}>アーティストの ★ や ♡ をタップして追加</div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {favorites.map((act, i) => {
        const isNow = act.startMin! <= now && act.endMin! > now
        const isPast = act.endMin! <= now
        const isSigning = act.type === 'signing'

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
            showStage
          />
        )
      })}
    </div>
  )
}