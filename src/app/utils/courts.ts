export const courtNames: Record<number, { full: string; short: string }> = {
  0: { full: 'Campo', short: 'Cam' },
  1: { full: 'Quadra 1', short: 'Qua.1' },
  2: { full: 'Quadra 2', short: 'Qua.2' },
  3: { full: 'Quadra 3', short: 'Qua.3' },
  4: { full: 'Quadra 4', short: 'Qua.4' },
  5: { full: 'Atividades Livres', short: 'Ativ. Liv.' },
  6: { full: 'Beach Tennis', short: 'Bea.' }
}

export const courtName = (court: number | string) =>
  courtNames[Number(court)]?.full ?? `Quadra ${court}`
