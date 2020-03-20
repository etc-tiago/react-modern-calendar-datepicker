import { DAY_SHAPE, DAY_SHAPE_FromTo } from './constants';
import getLocaleDetails from './localeLanguages';

const utils = () => {
  const {
    months: monthsList,
    getToday: localeGetToday,
    toNativeDate,
    getMonthLength,
    weekStartingIndex,
    transformDigit: getLanguageDigits,
  } = getLocaleDetails();

  const getToday = () => {
    const todayDate = new Date();
    const year = todayDate.getFullYear();
    const month = todayDate.getMonth() + 1;
    const day = todayDate.getDate();
    return localeGetToday({ year, month, day });
  };

  const getMonthName = (month: number) => monthsList[month - 1];

  const getMonthNumber = (monthName: string) => monthsList.indexOf(monthName) + 1;

  const getMonthFirstWeekday = (date: DAY_SHAPE) => {
    const gregorianDate = toNativeDate({ ...date, day: 1 });
    const weekday = gregorianDate.getDay();
    const dayIndex = weekday + weekStartingIndex;
    return dayIndex % 7;
  };

  const isBeforeDate = (day1: DAY_SHAPE | null, day2: DAY_SHAPE | null) => {
    if (!day1 || !day2) return false;
    return toNativeDate(day1) < toNativeDate(day2);
  };

  const checkDayInDayRange = (date: DAY_SHAPE_FromTo) => {
    const { day, from, to } = date;
    if (!day || !from || !to) return false;
    const nativeDay = toNativeDate(day as any);
    const nativeFrom = toNativeDate(from);
    const nativeTo = toNativeDate(to);
    return nativeDay > nativeFrom && nativeDay < nativeTo;
  };

  return {
    getToday,
    getMonthName,
    getMonthNumber,
    getMonthLength,
    getMonthFirstWeekday,
    isBeforeDate,
    checkDayInDayRange,
    getLanguageDigits,
  };
};

export default utils;
