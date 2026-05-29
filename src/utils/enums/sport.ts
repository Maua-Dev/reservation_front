export enum SportName {
  TENNIS = 'Tênis',
  FOOTBALL = 'Futebol',
  BASKETBALL = 'Basquetebol',
  VOLLEYBALL = 'Voleibol',
  HANDBOLL = 'Handebol',
  FUTSAL = 'Futsal',
  RUGBY = 'Rugby',
  BEACH_TENNIS = 'Tênis de Praia',
  TENIS_MESA = 'Tenis de Mesa',
  NATACAO = 'Natação',
  CORRIDA = 'Corrida',
  ATIVIDADES_ACADEMICAS = 'Atividades Academicas',
  FUNCIONAL = 'Funcional',
  JUDO = 'Judo',
  NA = 'Sem Esporte'
}

export function sportToDisplay(sport: string): string {
  if (sport in SportName) {
    return SportName[sport as keyof typeof SportName]
  }

  const lower = sport.toLowerCase()
  if (lower === 'natacao') {
    return SportName.NATACAO
  }
  if (sport === 'NA' || lower === 'na' || lower === 'sem esporte') {
    return SportName.NA
  }
  return sport
}
