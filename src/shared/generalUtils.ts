import { IDateNumbers, ITypeSelect } from './constants';

const createUniqueRange = (numbers: any, startingId?: any) =>
  Array.from(Array(numbers).keys()).map(key => ({
    value: key + 1,
    id: `${startingId}-${key}`,
  }));

const isSameDay = (day1: IDateNumbers, day2: IDateNumbers) => {
  if (!day1 || !day2) {
    return false;
  }
  return day1.day === day2.day && day1.month === day2.month && day1.year === day2.year;
};

const putZero = (num: number) => (num.toString().length === 1 ? `0${num}` : num);

const toExtendedDay = (date: IDateNumbers) => [date.year, date.month, date.day];

const shallowClone = (value: any) => ({ ...value });

const deepCloneObject = (obj: any) => JSON.parse(JSON.stringify(obj, (_key, value) => (typeof value === 'undefined' ? null : value)));

const getDateAccordingToMonth = (date: IDateNumbers, direction: string) => {
  const toSum = direction === 'NEXT' ? 1 : -1;
  let newMonthIndex = date.month + toSum;
  let newYear = date.year;
  if (newMonthIndex < 1) {
    newMonthIndex = 12;
    newYear -= 1;
  }
  if (newMonthIndex > 12) {
    newMonthIndex = 1;
    newYear += 1;
  }
  const newDate = { year: newYear, month: newMonthIndex, day: 1 };
  return newDate;
};

export const hasProperty = (object: any, propertyName: string) => Object.prototype.hasOwnProperty.call(object || {}, propertyName);

export const getValueType = (value: any): ITypeSelect => {
  if (Array.isArray(value)) {
    return 'multi';
  }
  if (hasProperty(value, 'from') && hasProperty(value, 'to')) {
    return 'range';
  }
  if (!value || (hasProperty(value, 'year') && hasProperty(value, 'month') && hasProperty(value, 'day'))) {
    return 'single';
  }
  throw new TypeError(`The passed value is malformed! Please make sure you're using one of the valid value types for date picker.`);
};

export { createUniqueRange, isSameDay, putZero, toExtendedDay, shallowClone, deepCloneObject, getDateAccordingToMonth };
