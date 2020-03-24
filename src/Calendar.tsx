import React, { FC, useState, useRef, useEffect } from 'react';

import { getDateAccordingToMonth, shallowClone, getValueType } from './shared/generalUtils';
import { IDateNumbers, IDateRange, weekDaysData, getToday } from './shared/constants';
import { Header, MonthSelector, YearSelector, DaysList } from './components';

const renderNull = () => null;

type ICalendar = {
  value: IDateNumbers | IDateRange | IDateNumbers[];
  minimumDate?: IDateNumbers | null;
  maximumDate?: IDateNumbers | null;
  renderFooter?: any;
  customDaysClassName: IDateNumbers & { className: string }[];
  //
  onChange: any;
  onDisabledDayError: any;
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
  calendarSelectedDayClassName,
  calendarRangeStartClassName,
  calendarRangeBetweenClassName,
  calendarRangeEndClassName,
  disabledDays,
  minimumDate,
  maximumDate,
  selectorStartingYear,
  selectorEndingYear,
  shouldHighlightWeekends,
  renderFooter,
  customDaysClassName,
}) => {
  const footer = renderFooter || renderNull;

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
      if (key === 'Tab') {
        calendarElement.current.classList.remove('no-focus-outline');
      }
    };
    calendarElement.current.addEventListener('keyup', handleKeyUp, false);
    return () => {
      calendarElement.current.removeEventListener('keyup', handleKeyUp, false);
    };
  });

  const today = getToday();

  const createStateToggler = (property: any) => () => {
    setMainState({ ...mainState, [property]: !(mainState as any)[property] });
  };

  const toggleMonthSelector = createStateToggler('isMonthSelectorOpen');
  const toggleYearSelector = createStateToggler('isYearSelectorOpen');

  const getComputedActiveDate = () => {
    const valueType = getValueType(value);
    if (valueType === 'multi' && (value as any).length) {
      return shallowClone((value as any)[0]);
    }
    if (valueType === 'single' && value) {
      return shallowClone(value);
    }
    if (valueType === 'range' && (value as any).from) {
      return shallowClone((value as any).from);
    }
    return shallowClone(today);
  };

  const activeDate = mainState.activeDate ? shallowClone(mainState.activeDate) : getComputedActiveDate();

  const weekdays = weekDaysData.map((weekDay: any) => (
    <abbr key={weekDay.name} title={weekDay.name}>
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

  return (
    <div className="Calendar no-focus-outline" role="grid" ref={calendarElement}>
      <Header
        maximumDate={maximumDate || null}
        minimumDate={minimumDate || null}
        activeDate={activeDate}
        onMonthChange={handleMonthChange}
        onMonthSelect={toggleMonthSelector}
        onYearSelect={toggleYearSelector}
        monthChangeDirection={mainState.monthChangeDirection}
        isMonthSelectorOpen={mainState.isMonthSelectorOpen}
        isYearSelectorOpen={mainState.isYearSelectorOpen}
      />

      <MonthSelector
        isOpen={mainState.isMonthSelectorOpen}
        activeDate={activeDate}
        onMonthSelect={selectMonth}
        maximumDate={maximumDate || null}
        minimumDate={minimumDate || null}
      />

      <YearSelector
        isOpen={mainState.isYearSelectorOpen}
        activeDate={activeDate}
        onYearSelect={selectYear}
        selectorStartingYear={selectorStartingYear}
        selectorEndingYear={selectorEndingYear}
        maximumDate={maximumDate || null}
        minimumDate={minimumDate || null}
      />

      <div className="week-days">{weekdays}</div>

      <DaysList
        activeDate={activeDate}
        value={value}
        monthChangeDirection={mainState.monthChangeDirection}
        onSlideChange={updateDate}
        disabledDays={disabledDays}
        onDisabledDayError={onDisabledDayError}
        minimumDate={minimumDate || null}
        maximumDate={maximumDate || null}
        onChange={onChange}
        calendarSelectedDayClassName={calendarSelectedDayClassName}
        calendarRangeStartClassName={calendarRangeStartClassName}
        calendarRangeEndClassName={calendarRangeEndClassName}
        calendarRangeBetweenClassName={calendarRangeBetweenClassName}
        shouldHighlightWeekends={shouldHighlightWeekends}
        customDaysClassName={customDaysClassName || []}
        isQuickSelectorOpen={mainState.isYearSelectorOpen || mainState.isMonthSelectorOpen}
      />
      <div className="footer">{footer()}</div>
    </div>
  );
};
