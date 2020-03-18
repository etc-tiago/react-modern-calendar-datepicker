import { GREGORIAN_MONTHS, GREGORIAN_WEEK_DAYS } from './constants';

const localeLanguages = {
  en: {
    months: GREGORIAN_MONTHS,
    weekDays: GREGORIAN_WEEK_DAYS,
    weekStartingIndex: 0,
    getToday(gregorainTodayObject) {
      return gregorainTodayObject;
    },
    toNativeDate(date) {
      return new Date(date.year, date.month - 1, date.day);
    },
    getMonthLength(date) {
      return new Date(date.year, date.month, 0).getDate();
    },
    transformDigit(digit) {
      return digit;
    },
    nextMonth: 'Próximo mês',
    previousMonth: 'Mês anterior',
    openMonthSelector: 'Abrir seletor de mês',
    openYearSelector: 'Abrir seletor de ano',
    closeMonthSelector: 'Fechar seletor de mês',
    closeYearSelector: 'Fechar seletor de ano',
    from: 'de',
    to: 'para',
    defaultPlaceholder: 'Selecionar...',
    digitSeparator: ',',
    yearLetterSkip: 0,
    isRtl: false,
  },
};

const getLocaleDetails = locale => {
  if (typeof locale === 'string') return localeLanguages[locale];
  return locale;
};

export { localeLanguages };
export default getLocaleDetails;
