import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const fileType =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
const fileExtension = '.xlsx'

export const exportToCSV = (
  apiData: Member[],
  currentMember: Member,
  fileName: string
) => {
  const membersFormatted = apiData
    .filter((member) => member.active === ACTIVE.ACTIVE)
    .map((member) => {
      return {
        Nome: member.name,
        RA: `${member.ra.substring(0, 2)}.${member.ra.substring(
          2,
          7
        )}-${member.ra.substring(7)}`,
        Area: member.stack,
        Horas_trabalhadas: member.hoursWorked
          ? member.hoursWorked / 1000 / 60 / 60
          : 0
      }
    })
    .concat({
      Nome: currentMember.name,
      RA: `${currentMember.ra.substring(0, 2)}.${currentMember.ra.substring(
        2,
        7
      )}-${currentMember.ra.substring(7)}`,
      Area: currentMember.stack,
      Horas_trabalhadas: currentMember.hoursWorked
        ? currentMember.hoursWorked / 1000 / 60 / 60
        : 0
    })
    .sort((a, b) => a.Nome.toString().localeCompare(b.Nome.toString()))

  try {
    const ws = XLSX.utils.json_to_sheet(membersFormatted)
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array'
    })
    const data = new Blob([excelBuffer], { type: fileType })
    // Use a função global saveAs diretamente
    saveAs(data, fileName + fileExtension)
  } catch (error) {
    console.error('Erro ao exportar o arquivo Excel:', error)
  }
}
