import React, { FC, useState, useRef, useEffect } from 'react';
import { getDateAccordingToMonth, shallowClone, getValueType } from './shared/generalUtils';
import {
  DAY_SHAPE,
  DAY_SHAPE_FromTo,
  TYPE_SINGLE_DATE,
  TYPE_RANGE,
  TYPE_MUTLI_DATE,
  GREGORIAN_WEEK_DAYS,
} from './shared/constants';
import { useLocaleUtils } from './shared/hooks';

import { Header, MonthSelector, YearSelector, DaysList } from './components';

const renderNull = () => null;

type ICalendar = {
  value: DAY_SHAPE | DAY_SHAPE_FromTo | DAY_SHAPE[];
  calendarClassName: string;
  colorPrimary: string;
  colorPrimaryLight: string;
  slideAnimationDuration: string;
  minimumDate: DAY_SHAPE | null;
  maximumDate: DAY_SHAPE | null;
  locale: string;
  renderFooter: any;
  customDaysClassName: DAY_SHAPE & { className: string }[];
  //
  onChange: any;
  onDisabledDayError: any;
  calendarTodayClassName: any;
  calendarSelectedDayClassName: any;
  calendarRangeStartClassName: any;
  calendarRangeBetweenClassName: any;
  calendarRangeEndClassName: any;
  disabledDays: any;
  selectorStartingYear: any;
  selectorEndingYear: any;
  shouldHighlightWeekends: any;
};

export const Calendar: FC<ICalendar> = ({
  value,
  onChange,
  onDisabledDayError,
  calendarClassName,
  calendarTodayClassName,
  calendarSelectedDayClassName,
  calendarRangeStartClassName,
  calendarRangeBetweenClassName,
  calendarRangeEndClassName,
  disabledDays,
  colorPrimary,
  colorPrimaryLight,
  slideAnimationDuration,
  minimumDate,
  maximumDate,
  selectorStartingYear,
  selectorEndingYear,
  locale,
  shouldHighlightWeekends,
  renderFooter,
  customDaysClassName,
}) => {
  minimumDate = minimumDate || null;
  maximumDate = maximumDate || null;
  colorPrimary = colorPrimary || '#0eca2d';
  colorPrimaryLight = colorPrimaryLight || '#cff4d5';
  slideAnimationDuration = slideAnimationDuration || '0.4s';
  calendarClassName = calendarClassName || '';
  locale = locale || 'en';
  value = value || null;
  customDaysClassName = customDaysClassName || [];
  renderFooter = renderFooter || renderNull;

  const calendarElement: any = useRef(null);
  const [mainState, setMainState] = useState({
    activeDate: null,
    monthChangeDirection: '',
    isMonthSelectorOpen: false,
    isYearSelectorOpen: false,
  });

  useEffect(() => {
    const handleKeyUp = (args: any) => {
      const { key } = args;
      /* istanbul ignore else */
      if (key === 'Tab') calendarElement.current.classList.remove('-noFocusOutline');
    };
    calendarElement.current.addEventListener('keyup', handleKeyUp, false);
    return () => {
      calendarElement.current.removeEventListener('keyup', handleKeyUp, false);
    };
  });

  const { getToday } = useLocaleUtils(locale);
  const today = getToday();

  const createStateToggler = (property: any) => () => {
    setMainState({ ...mainState, [property]: !(mainState as any)[property] });
  };

  const toggleMonthSelector = createStateToggler('isMonthSelectorOpen');
  const toggleYearSelector = createStateToggler('isYearSelectorOpen');

  const getComputedActiveDate = () => {
    const valueType = getValueType(value);
    if (valueType === TYPE_MUTLI_DATE && (value as any).length) {
      return shallowClone((value as any)[0]);
    }
    if (valueType === TYPE_SINGLE_DATE && value) return shallowClone(value);
    if (valueType === TYPE_RANGE && (value as any).from) return shallowClone((value as any).from);
    return shallowClone(today);
  };

  const activeDate = mainState.activeDate
    ? shallowClone(mainState.activeDate)
    : getComputedActiveDate();

  const weekdays = GREGORIAN_WEEK_DAYS.map((weekDay: any) => (
    <abbr key={weekDay.name} title={weekDay.name} className="Calendar__weekDay">
      {weekDay.short}
    </abbr>
  ));

  const handleMonthChange = (direction: any) => {
    setMainState({
      ...mainState,
      monthChangeDirection: direction,
    });
  };

  const updateDate = () => {
    setMainState({
      ...mainState,
      activeDate: getDateAccordingToMonth(activeDate, mainState.monthChangeDirection) as any,
      monthChangeDirection: '',
    });
  };

  const selectMonth = (newMonthNumber: any) => {
    setMainState({
      ...mainState,
      activeDate: { ...activeDate, month: newMonthNumber },
      isMonthSelectorOpen: false,
    });
  };

  const selectYear = (year: any) => {
    setMainState({
      ...mainState,
      activeDate: { ...activeDate, year },
      isYearSelectorOpen: false,
    });
  };

  const calendarStyle: any = {
    '--cl-color-primary': colorPrimary,
    '--cl-color-primary-light': colorPrimaryLight,
    '--animation-duration': slideAnimationDuration,
  };
  return (
    <div
      className={`Calendar -noFocusOutline ${calendarClassName} -ltr`}
      role="grid"
      style={calendarStyle}
      ref={calendarElement}
    >
      <Header
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        activeDate={activeDate}
        onMonthChange={handleMonthChange}
        onMonthSelect={toggleMonthSelector}
        onYearSelect={toggleYearSelector}
        monthChangeDirection={mainState.monthChangeDirection}
        isMonthSelectorOpen={mainState.isMonthSelectorOpen}
        isYearSelectorOpen={mainState.isYearSelectorOpen}
        locale={locale}
      />

      <MonthSelector
        isOpen={mainState.isMonthSelectorOpen}
        activeDate={activeDate}
        onMonthSelect={selectMonth}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        locale={locale}
      />

      <YearSelector
        isOpen={mainState.isYearSelectorOpen}
        activeDate={activeDate}
        onYearSelect={selectYear}
        selectorStartingYear={selectorStartingYear}
        selectorEndingYear={selectorEndingYear}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        locale={locale}
      />

      <div className="Calendar__weekDays">{weekdays}</div>

      <DaysList
        activeDate={activeDate}
        value={value}
        monthChangeDirection={mainState.monthChangeDirection}
        onSlideChange={updateDate}
        disabledDays={disabledDays}
        onDisabledDayError={onDisabledDayError}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onChange={onChange}
        calendarTodayClassName={calendarTodayClassName}
        calendarSelectedDayClassName={calendarSelectedDayClassName}
        calendarRangeStartClassName={calendarRangeStartClassName}
        calendarRangeEndClassName={calendarRangeEndClassName}
        calendarRangeBetweenClassName={calendarRangeBetweenClassName}
        locale={locale}
        shouldHighlightWeekends={shouldHighlightWeekends}
        customDaysClassName={customDaysClassName}
        isQuickSelectorOpen={mainState.isYearSelectorOpen || mainState.isMonthSelectorOpen}
      />
      <div className="Calendar__footer">{renderFooter()}</div>
    </div>
  );
};
