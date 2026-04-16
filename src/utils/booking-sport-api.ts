import { SportName } from '@/utils/enums/sport'

export function bookingSportToApi(sport: string): string {
  if (
    sport === SportName.NATACAO ||
    sport.toLowerCase() === 'natacao'
  ) {
    return 'Natacao'
  }
  return sport
}
