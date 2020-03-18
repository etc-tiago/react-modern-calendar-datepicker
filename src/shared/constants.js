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
  {
    name: 'Domingo',
    short: 'D',
    isWeekend: true,
  },
  {
    name: 'Segunda',
    short: 'S',
  },
  {
    name: 'Terça',
    short: 'T',
  },
  {
    name: 'Quarta',
    short: 'Q',
  },
  {
    name: 'Quinta',
    short: 'Q',
  },
  {
    name: 'Sexta',
    short: 'S',
  },
  {
    name: 'Sabado',
    short: 'S',
    isWeekend: true,
  },
];

export const DAY_SHAPE = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
};

export const MINIMUM_SELECTABLE_YEAR_SUBTRACT = 100;

export const MAXIMUM_SELECTABLE_YEAR_SUM = 50;

export const TYPE_SINGLE_DATE = 'SINGLE_DATE';
export const TYPE_RANGE = 'RANGE';
export const TYPE_MUTLI_DATE = 'MUTLI_DATE';

export const LOCALE_SHAPE = PropTypes.shape({
  months: PropTypes.arrayOf(PropTypes.string),
  weekDays: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      short: PropTypes.string,
      isWeekend: PropTypes.bool,
    }),
  ),
  weekStartingIndex: PropTypes.number,
  getToday: PropTypes.func,
  toNativeDate: PropTypes.func,
  getMonthLength: PropTypes.func,
  transformDigit: PropTypes.func,
  nextMonth: PropTypes.string,
  previousMonth: PropTypes.string,
  openMonthSelector: PropTypes.string,
  openYearSelector: PropTypes.string,
  closeMonthSelector: PropTypes.string,
  closeYearSelector: PropTypes.string,
  from: PropTypes.string,
  to: PropTypes.string,
  defaultPlaceholder: PropTypes.string,
  digitSeparator: PropTypes.string,
  yearLetterSkip: PropTypes.number,
  isRtl: PropTypes.bool,
});
