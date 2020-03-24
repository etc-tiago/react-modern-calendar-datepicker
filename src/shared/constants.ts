export const monthsNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export const weekDaysData = [
  { name: 'Domingo', short: 'D', isWeekend: true },
  { name: 'Segunda', short: 'S' },
  { name: 'Terça', short: 'T' },
  { name: 'Quarta', short: 'Q' },
  { name: 'Quinta', short: 'Q' },
  { name: 'Sexta', short: 'S' },
  { name: 'Sabado', short: 'S', isWeekend: true },
];

export const getMonthName = (month: number) => monthsNames[month - 1];
export const getMonthNumber = (monthName: string) => monthsNames.indexOf(monthName) + 1;
export const getToday = () => {
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = todayDate.getMonth() + 1;
  const day = todayDate.getDate();
  return { year, month, day };
};

export const getMonthFirstWeekday = (date: IDateNumbers) => {
  const gregorianDate = getNativeDate({ ...date, day: 1 });
  const weekday = gregorianDate.getDay();
  const dayIndex = weekday;
  return dayIndex % 7;
};

export const checkDayInDayRange = (date: IDateRange) => {
  const { day, from, to } = date;
  if (!day || !from || !to) return false;
  const nativeDay = getNativeDate(day as any);
  const nativeFrom = getNativeDate(from);
  const nativeTo = getNativeDate(to);
  return nativeDay > nativeFrom && nativeDay < nativeTo;
};

export const CalendarLabels = {
  nextMonth: 'Próximo mês',
  previousMonth: 'Mês anterior',
  openMonthSelector: 'Abrir seletor de mês',
  openYearSelector: 'Abrir seletor de ano',
  closeMonthSelector: 'Fechar seletor de mês',
  closeYearSelector: 'Fechar seletor de ano',
  from: 'de',
  to: 'para',
  defaultPlaceholder: 'Selecionar...',
};

export type IDateNumbers = { year: number; month: number; day: number };
export type IDateRange = { day: IDateNumbers; from: IDateNumbers; to: IDateNumbers };

export const minYearToSubtract = 100;

export const maxYearToSum = 50;

export type ITypeSelect = 'single' | 'range' | 'multi';

export const getNativeDate = (date: IDateNumbers) => new Date(date.year, date.month - 1, date.day);

export const isBefore = (day1: IDateNumbers | null, day2: IDateNumbers | null) => {
  if (!day1 || !day2) return false;
  return getNativeDate(day1) < getNativeDate(day2);
};
