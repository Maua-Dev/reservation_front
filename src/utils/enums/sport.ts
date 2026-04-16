export enum SportName {
  TENNIS = 'Tênis',
  FOOTBALL = 'Futebol',
  BASKETBALL = 'Basquetebol',
  VOLLEYBALL = 'Voleibol',
  HANDBOLL = 'Handebol',
  FUTSAL = 'Futsal',
  RUGBY = 'Rugby',
  BEACH_TENNIS = 'Tênis de Praia',
  PING_PONG = 'Ping Pong',
  NATACAO = 'Natação',
  CORRIDA = 'Corrida',
  NA = 'NA'
}

export function sportToDisplay(sport: string): string {
  if (sport in SportName) {
    return SportName[sport as keyof typeof SportName]
  }
  if (sport.toLowerCase() === 'natacao') {
    return SportName.NATACAO
  }
  return sport
}
