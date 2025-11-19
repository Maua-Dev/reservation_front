function calcularUltimaSextaFeira(deslocamentoSemana: number): Date {
  // deslocamentoSemana = index do dia da semana [segunda=1, terça=2,...]
  const hoje = new Date(deslocamentoSemana)
  console.log('Data alvo recebida:', hoje)

  // O método getDay() retorna o dia da semana (0=Domingo, 6=Sábado)
  const diaDaSemanaIndex = hoje.getDay()

  // Se hoje for Sábado (6), subtraímos 1 dia (6 - 5 = 1).
  // Se hoje for Segunda (1), subtraímos 3 dias (1 - 5 = -4. Adicionamos 7: 3).
  // let diasParaSubtrair
  // if (diaDaSemanaIndex >= diaAlvo) {
  //   diasParaSubtrair = diaDaSemanaIndex - diaAlvo
  // } else {
  //   diasParaSubtrair = diaDaSemanaIndex - diaAlvo + 7
  // }

  // diasParaSubtrair += deslocamentoSemana * 7

  // const dataAlvo = new Date(hoje)
  // dataAlvo.setDate(hoje.getDate() - diasParaSubtrair)

  const dataAlvo = new Date(
    deslocamentoSemana + (5 - diaDaSemanaIndex) * 24 * 60 * 60 * 1000
  )

  console.log('Data alvo calculada (última sexta-feira):', dataAlvo)
  return dataAlvo
}
function formatarDataParaLink(data: Date): string {
  // getMounth vai retrinar 0 para Janeiro, então sempre temos que adiconar 1
  const dia = data.getDate()
  const mes = data.getMonth() + 1
  const ano = data.getFullYear()

  return `${dia}_${mes}_${ano}`
}

export const baixarRelatorio = (deslocamentoSemana: number = 0): void => {
  const dataAlvo = calcularUltimaSextaFeira(deslocamentoSemana)
  const dataFormatada = formatarDataParaLink(dataAlvo) // B. Construção da URL

  const URL_BASE = 'https://d12o8fo0qgb5uc.cloudfront.net/relatorios/'
  const NOME_ARQUIVO_BASE = 'relatorio_gerado_em_'
  const EXTENSAO = '.xlsx'

  const urlCompleta = `${URL_BASE}${NOME_ARQUIVO_BASE}${dataFormatada}${EXTENSAO}`

  window.open(urlCompleta, '_blank')
}

// Para a sexta-feira "retrasada" (a sexta-feira anterior à última), como o leo pediu
// baixarRelatorio(1)
