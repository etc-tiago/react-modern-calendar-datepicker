import PropTypes from 'prop-types';

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

export type DAY_SHAPE = { year: number; month: number; day: number };
export type DAY_SHAPE_FromTo = { day: DAY_SHAPE; from: DAY_SHAPE; to: DAY_SHAPE };

export const MINIMUM_SELECTABLE_YEAR_SUBTRACT = 100;

export const MAXIMUM_SELECTABLE_YEAR_SUM = 50;

export const TYPE_SINGLE_DATE = 'SINGLE_DATE';
export const TYPE_RANGE = 'RANGE';
export const TYPE_MUTLI_DATE = 'MUTLI_DATE';

export type LOCALE_SHAPE = {
  months: string[];
  weekDays: { name: string; short: string; isWeekend: boolean }[];
  weekStartingIndex: number;
  getToday: any;
  toNativeDate: any;
  getMonthLength: any;
  transformDigit: any;
  nextMonth: string;
  previousMonth: string;
  openMonthSelector: string;
  openYearSelector: string;
  closeMonthSelector: string;
  closeYearSelector: string;
  from: string;
  to: string;
  defaultPlaceholder: string;
  digitSeparator: string;
  yearLetterSkip: number;
  isRtl: boolean;
};
