export const GREGORIAN_MONTHS = [
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

export const GREGORIAN_WEEK_DAYS = [
  { name: 'Domingo', short: 'D', isWeekend: true },
  { name: 'Segunda', short: 'S' },
  { name: 'Terça', short: 'T' },
  { name: 'Quarta', short: 'Q' },
  { name: 'Quinta', short: 'Q' },
  { name: 'Sexta', short: 'S' },
  { name: 'Sabado', short: 'S', isWeekend: true },
];

export const getMonthName = (month: number) => GREGORIAN_MONTHS[month - 1];

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

export type DAY_SHAPE = { year: number; month: number; day: number };
export type DAY_SHAPE_FromTo = { day: DAY_SHAPE; from: DAY_SHAPE; to: DAY_SHAPE };

export const MINIMUM_SELECTABLE_YEAR_SUBTRACT = 100;

export const MAXIMUM_SELECTABLE_YEAR_SUM = 50;

/*  TODO: create a type and compare string sigle | range | multi */
export const TYPE_SINGLE_DATE = 'SINGLE_DATE';
export const TYPE_RANGE = 'RANGE';
export const TYPE_MUTLI_DATE = 'MUTLI_DATE';

export type LOCALE_SHAPE = {
  months: string[];
  weekDays: { name: string; short: string; isWeekend: boolean }[];
  weekStartingIndex: number;
  getToday: any;
  toNativeDate: any;
  transformDigit: any;
  nextMonth: string;
  previousMonth: string;
  openMonthSelector: string;
  openYearSelector: string;
  closeMonthSelector: string;
  closeYearSelector: string;
  from: string;
  to: string;
};

export const getNativeDate = (date: DAY_SHAPE) => new Date(date.year, date.month - 1, date.day);

export const isBefore = (day1: DAY_SHAPE | null, day2: DAY_SHAPE | null) => {
  if (!day1 || !day2) return false;
  return getNativeDate(day1) < getNativeDate(day2);
};
