import { SportName } from '@/utils/enums/sport'

export function bookingSportToApi(sport: string): string {
  if (sport === SportName.NATACAO || sport.toLowerCase() === 'natacao') {
    return 'Natacao'
  }

  if (
    sport === SportName.NA ||
    sport === 'NA' ||
    sport.toLowerCase() === 'sem esporte'
  ) {
    return 'NA'
  }

  return sport
}
