import { GREGORIAN_MONTHS, GREGORIAN_WEEK_DAYS, DAY_SHAPE } from './constants';

export const localeLanguages = {
  months: GREGORIAN_MONTHS,
  weekDays: GREGORIAN_WEEK_DAYS,
  weekStartingIndex: 0,
  getToday: (gregorainTodayObject: any) => gregorainTodayObject,
  toNativeDate: (date: DAY_SHAPE) => new Date(date.year, date.month - 1, date.day),
  transformDigit: (digit: any) => digit,
  nextMonth: 'Próximo mês',
  previousMonth: 'Mês anterior',
  openMonthSelector: 'Abrir seletor de mês',
  openYearSelector: 'Abrir seletor de ano',
  closeMonthSelector: 'Fechar seletor de mês',
  closeYearSelector: 'Fechar seletor de ano',
  from: 'de',
  to: 'para',
};

const getLocaleDetails = () => localeLanguages;

export default getLocaleDetails;
