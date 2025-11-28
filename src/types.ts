export interface Act {
  time: string
  artist: string
  sub: string
  stage?: string
  type?: 'live' | 'signing'
  startMin?: number
  endMin?: number
}

export interface SigningEvent {
  time: string
  artist: string
  stage?: string
  type?: 'signing'
  startMin?: number
  endMin?: number
}

export interface Stage {
  [stageName: string]: Act[]
}

export interface DayData {
  date: string
  stages: Stage
}

export interface FestivalData {
  day1: DayData
  day2: DayData
}

export interface StageColor {
  bg: string
  border: string
  text: string
}

export interface StageColors {
  [stageName: string]: StageColor
}

export interface Favorites {
  [key: string]: boolean
}