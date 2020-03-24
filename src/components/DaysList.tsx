import React, { FC, useRef, useEffect } from 'react';
import { getDaysInMonth } from 'date-fns';

import { getSlideDate, handleSlideAnimationEnd, animateContent } from '../shared/sliderHelpers';
import { deepCloneObject, isSameDay, createUniqueRange, getValueType } from '../shared/generalUtils';
import { IDateNumbers, weekDaysData, getMonthName, isBefore, getToday, getMonthFirstWeekday, checkDayInDayRange } from '../shared/constants';

type IDaysList = {
  onChange: any;
  onDisabledDayError: any;
  disabledDays: IDateNumbers[];
  calendarTodayClassName: string;
  calendarSelectedDayClassName: string;
  calendarRangeStartClassName: string;
  calendarRangeBetweenClassName: string;
  calendarRangeEndClassName: string;
  shouldHighlightWeekends: boolean;
  isQuickSelectorOpen: boolean;
  activeDate: any;
  value: any;
  monthChangeDirection: any;
  onSlideChange: any;
  minimumDate: IDateNumbers | null;
  maximumDate: IDateNumbers | null;
  customDaysClassName: any;
};
export const DaysList: FC<IDaysList> = ({
  activeDate,
  value,
  monthChangeDirection,
  onSlideChange,
  disabledDays,
  onDisabledDayError,
  minimumDate,
  maximumDate,
  onChange,
  calendarTodayClassName,
  calendarSelectedDayClassName,
  calendarRangeStartClassName,
  calendarRangeEndClassName,
  calendarRangeBetweenClassName,
  shouldHighlightWeekends,
  isQuickSelectorOpen,
  customDaysClassName,
}) => {
  const calendarSectionWrapper = useRef(null);
  const today = getToday();

  useEffect(() => {
    if (!monthChangeDirection) {
      return;
    }
    animateContent({
      direction: monthChangeDirection,
      parent: calendarSectionWrapper.current,
    });
  }, [monthChangeDirection]);

  const getDayRangeValue = (day: any) => {
    const clonedDayRange = deepCloneObject(value);
    const dayRangeValue = clonedDayRange.from && clonedDayRange.to ? { from: null, to: null } : clonedDayRange;
    const dayRangeProp = !dayRangeValue.from ? 'from' : 'to';
    dayRangeValue[dayRangeProp] = day;
    const { from, to } = dayRangeValue;

    // swap from and to values if from is later than to
    if (isBefore(dayRangeValue.to, dayRangeValue.from)) {
      dayRangeValue.from = to;
      dayRangeValue.to = from;
    }

    const checkIncludingDisabledDay = (disabledDay: any) => {
      return checkDayInDayRange({
        day: disabledDay,
        from: dayRangeValue.from,
        to: dayRangeValue.to,
      });
    };
    const includingDisabledDay = disabledDays.find(checkIncludingDisabledDay);
    if (includingDisabledDay) {
      onDisabledDayError(includingDisabledDay);
      return value;
    }

    return dayRangeValue;
  };

  const getMultiDateValue = (day: any) => {
    /* isAlreadyExisting */
    const isAlreadyExisting = value.some((valueDay: any) => {
      return isSameDay(valueDay, day);
    });
    const addedToValue = [...value, day];
    const removedFromValue = value.filter((valueDay: any) => !isSameDay(valueDay, day));
    return isAlreadyExisting ? removedFromValue : addedToValue;
  };

  const handleDayClick = (day: any) => {
    const getNewValue = () => {
      const valueType = getValueType(value);
      switch (valueType) {
        case 'single':
          return day;
        case 'range':
          return getDayRangeValue(day);
        case 'multi':
          return getMultiDateValue(day);
      }
    };
    const newValue = getNewValue();
    onChange(newValue);
  };

  const isSingleDateSelected = (day: any) => {
    const valueType = getValueType(value);
    if (valueType === 'single') {
      return isSameDay(day, value);
    }
    if (valueType === 'multi') {
      return value.some((valueDay: any) => isSameDay(valueDay, day));
    }
  };

  const getDayStatus = (dayItem: any) => {
    const isToday = isSameDay(dayItem, today);
    const isSelected = isSingleDateSelected(dayItem);
    const { from: startingDay, to: endingDay } = value || {};
    const isStartingDayRange = isSameDay(dayItem, startingDay);
    const isEndingDayRange = isSameDay(dayItem, endingDay);
    const isWithinRange = checkDayInDayRange({ day: dayItem, from: startingDay, to: endingDay });
    return { isToday, isSelected, isStartingDayRange, isEndingDayRange, isWithinRange };
  };

  const getDayClassNames = (dayItem: any) => {
    const { isToday, isSelected, isStartingDayRange, isEndingDayRange, isWithinRange } = getDayStatus(dayItem);
    const customDayItemClassName = customDaysClassName.find((day: any) => isSameDay(dayItem, day));
    const classNames = ''
      .concat(isToday && !isSelected ? ` -today ${calendarTodayClassName}` : '')
      .concat(!dayItem.isStandard ? ' -blank' : '')
      .concat(dayItem.isWeekend && shouldHighlightWeekends ? ' -weekend' : '')
      .concat(customDayItemClassName ? ` ${customDayItemClassName.className}` : '')
      .concat(isSelected ? ` -selected ${calendarSelectedDayClassName}` : '')
      .concat(isStartingDayRange ? ` -selectedStart ${calendarRangeStartClassName}` : '')
      .concat(isEndingDayRange ? ` -selectedEnd ${calendarRangeEndClassName}` : '')
      .concat(isWithinRange ? ` -selectedBetween ${calendarRangeBetweenClassName}` : '')
      .concat(dayItem.isDisabled ? ' -disabled' : '');
    return classNames;
  };

  const getViewMonthDays = (date: any) => {
    // to match month starting date with the correct weekday label
    const prependingBlankDays = createUniqueRange(getMonthFirstWeekday(date), 'starting-blank');
    const standardDays = createUniqueRange(getDaysInMonth(new Date(date.year, date.month - 1))).map((day: any) => ({
      ...day,
      isStandard: true,
      month: date.month,
      year: date.year,
    }));
    const allDays = [...prependingBlankDays, ...standardDays];
    return allDays;
  };

  const handleDayPress = (args: any) => {
    const { isDisabled, ...dayItem } = args;
    if (isDisabled) {
      onDisabledDayError(dayItem); // good for showing error messages
    } else {
      handleDayClick(dayItem);
    }
  };

  const renderEachWeekDays = (args: any, index: number) => {
    const { id, value: day, month, year, isStandard } = args;
    const dayItem = { day, month, year };
    /* disabledDays.some */
    const isInDisabledDaysRange = disabledDays ? disabledDays.some(disabledDay => isSameDay(dayItem, disabledDay)) : null;
    const isBeforeMinimumDate = isBefore(dayItem, minimumDate);
    const isAfterMaximumDate = isBefore(maximumDate, dayItem);
    const isNotInValidRange = isStandard && (isBeforeMinimumDate || isAfterMaximumDate);
    const isDisabled = isInDisabledDaysRange || isNotInValidRange;
    /* GREGORIAN_WEEK_DAYS.some */
    const isWeekend = weekDaysData.some((weekDayItem: any, weekDayItemIndex: any) => weekDayItem.isWeekend && weekDayItemIndex === index);
    const additionalClass = getDayClassNames({ ...dayItem, isWeekend, isStandard, isDisabled });
    const dayLabel = `${weekDaysData[index].name}, ${day} ${getMonthName(month)} ${year}`;
    const isOnActiveSlide = month === activeDate.month;
    const dayStatus = getDayStatus(dayItem);
    const { isSelected, isStartingDayRange, isEndingDayRange, isWithinRange } = dayStatus;
    return (
      <div
        key={id}
        className={`Calendar__day -ltr ${additionalClass}`}
        onClick={() => {
          handleDayPress({ ...dayItem, isDisabled });
        }}
        onKeyDown={({ key }) => {
          /* istanbul ignore else */
          if (key === 'Enter') {
            handleDayPress({ ...dayItem, isDisabled });
          }
        }}
        aria-disabled={isDisabled}
        aria-label={dayLabel}
        aria-selected={isSelected || isStartingDayRange || isEndingDayRange || isWithinRange}
        {...(!isStandard || !isOnActiveSlide || isQuickSelectorOpen ? { 'aria-hidden': true } : {})}
        role="gridcell"
      >
        {!isStandard ? '' : day}
      </div>
    );
  };

  const renderMonthDays = (isInitialActiveChild: any) => {
    const date = getSlideDate({
      activeDate,
      isInitialActiveChild,
      monthChangeDirection,
      parent: calendarSectionWrapper.current,
    });
    const allDays = getViewMonthDays(date);
    const renderSingleWeekRow = (weekRowIndex: number) => {
      const eachWeekDays = allDays.slice(weekRowIndex * 7, weekRowIndex * 7 + 7).map(renderEachWeekDays);
      return (
        <div key={String(weekRowIndex)} className="Calendar__weekRow" role="row">
          {eachWeekDays}
        </div>
      );
    };
    return Array.from(Array(6).keys()).map(renderSingleWeekRow);
  };

  return (
    <div ref={calendarSectionWrapper} className="Calendar__sectionWrapper" role="presentation" data-testid="days-section-wrapper">
      <div
        onAnimationEnd={e => {
          handleSlideAnimationEnd(e);
          onSlideChange();
        }}
        className="Calendar__section -shown"
        role="rowgroup"
      >
        {renderMonthDays(true)}
      </div>
      <div
        onAnimationEnd={e => {
          handleSlideAnimationEnd(e);
          onSlideChange();
        }}
        className="Calendar__section -hiddenNext"
        role="rowgroup"
      >
        {renderMonthDays(false)}
      </div>
    </div>
  );
};
