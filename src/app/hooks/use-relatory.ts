function calcularUltimaSextaFeira(deslocamentoSemana: number = 0): Date {
  const hoje = new Date()

  // O método getDay() retorna o dia da semana (0=Domingo, 6=Sábado)
  const diaDaSemanaIndex = hoje.getDay()
  // dia alvo (sexta feira)
  const diaAlvo = 5
  // Calcular quantos dias precisamos subtrair para chegar na última sexta.
  // Se hoje for Sábado (6), subtraímos 1 dia (6 - 5 = 1).
  // Se hoje for Segunda (1), subtraímos 3 dias (1 - 5 = -4. Adicionamos 7: 3).
  let diasParaSubtrair: number
  if (diaDaSemanaIndex >= diaAlvo) {
    diasParaSubtrair = diaDaSemanaIndex - diaAlvo
  } else {
    diasParaSubtrair = diaDaSemanaIndex - diaAlvo + 7
  }
  // Adicionar o deslocamento para sexta retrasada, etc.
  // revisar essa lógica
  diasParaSubtrair += deslocamentoSemana * 7

  const dataAlvo = new Date(hoje)
  // Subtrai os milissegundos equivalentes aos dias calculados.
  dataAlvo.setDate(hoje.getDate() - diasParaSubtrair)

  return dataAlvo
}
// Agora a parte para modificarmos o link
function formatarDataParaLink(data: Date): string {
  // getMounth vai retrinar 0 para Janeiro, então sempre temos que adiconar 1
  const dia = data.getDate()
  const mes = data.getMonth() + 1
  const ano = data.getFullYear()

  return `${dia}_${mes}_${ano}`
}

// função principal para fazer o link e request??
// @param deslocamentoSemanas 0 para a última sexta-feira (padrão), 1 para a sexta retrasada.
export const baixarRelatorio = (deslocamentoSemana: number = 0): void => {
  // A. Lógica da Data
  const dataAlvo = calcularUltimaSextaFeira(deslocamentoSemana)
  const dataFormatada = formatarDataParaLink(dataAlvo) // B. Construção da URL

  const URL_BASE = 'https://d13wyu3ld41l6l.cloudfront.net/relatorios/'
  const NOME_ARQUIVO_BASE = 'relatorio_gerado_em_'
  const EXTENSAO = '.xlsx'

  const urlCompleta = `${URL_BASE}${NOME_ARQUIVO_BASE}${dataFormatada}${EXTENSAO}` // C. Ação: Redirecionar para a URL na mesma aba (o download deve iniciar)
  // Se você quiser abrir em uma nova aba, use: window.open(urlCompleta, '_blank')

  console.log(`Abrindo URL para download: ${urlCompleta}`)
  window.location.href = urlCompleta
}
// --- EXECUÇÃO ---

// Para a última sexta-feira (como no seu exemplo para 3_10_2025)
// await baixarRelatorio(0);

// Para a sexta-feira "retrasada" (a sexta-feira anterior à última), como o leo pediu
// baixarRelatorio(1)
