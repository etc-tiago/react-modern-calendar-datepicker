import React, { FC, useEffect, useRef } from 'react';

import { IDateNumbers, CalendarLabels, getMonthName, isBefore } from '../shared/constants';
import { isSameDay } from '../shared/generalUtils';
import { getSlideDate, animateContent, handleSlideAnimationEnd } from '../shared/sliderHelpers';

type IHeader = {
  maximumDate: IDateNumbers | null;
  minimumDate: IDateNumbers | null;
  onMonthChange: any;
  activeDate: any;
  monthChangeDirection: any;
  onMonthSelect: any;
  onYearSelect: any;
  isMonthSelectorOpen: any;
  isYearSelectorOpen: any;
};

export const Header: FC<IHeader> = ({
  maximumDate,
  minimumDate,
  onMonthChange,
  activeDate,
  monthChangeDirection,
  onMonthSelect,
  onYearSelect,
  isMonthSelectorOpen,
  isYearSelectorOpen,
}) => {
  const headerElement: any = useRef(null);
  const monthYearWrapperElement: any = useRef(null);

  useEffect(() => {
    if (!monthChangeDirection) {
      return;
    }
    animateContent({
      direction: monthChangeDirection,
      parent: monthYearWrapperElement.current,
    });
  }, [monthChangeDirection]);

  useEffect(() => {
    const isOpen = isMonthSelectorOpen || isYearSelectorOpen;
    const monthText = headerElement.current.querySelector('.month-year.shown .month-text');
    const yearText = monthText.nextSibling;
    const hasActiveBackground = (element: any) => element.classList.contains('activeBackground');
    const isInitialRender = !isOpen && !hasActiveBackground(monthText) && !hasActiveBackground(yearText);
    if (isInitialRender) {
      return;
    }

    const arrows = [...headerElement.current.querySelectorAll('.month-arrow-wrapper')];
    const hasMonthSelectorToggled = isMonthSelectorOpen || hasActiveBackground(monthText);
    const primaryElement = hasMonthSelectorToggled ? monthText : yearText;
    const secondaryElement = hasMonthSelectorToggled ? yearText : monthText;

    const translateXDirection = hasMonthSelectorToggled ? 1 : -1;
    const scale = !isOpen ? 0.95 : 1;
    const translateX = !isOpen ? 0 : `${(translateXDirection * secondaryElement.offsetWidth) / 2}`;
    if (!isOpen) {
      secondaryElement.removeAttribute('aria-hidden');
    } else {
      secondaryElement.setAttribute('aria-hidden', true);
    }
    secondaryElement.setAttribute('tabindex', isOpen ? '-1' : '0');
    secondaryElement.style.transform = '';
    primaryElement.style.transform = `scale(${scale}) ${translateX ? `translateX(${translateX}px)` : ''}`;
    primaryElement.classList.toggle('activeBackground');
    secondaryElement.classList.toggle('hidden');
    arrows.forEach(arrow => {
      const isHidden = arrow.classList.contains('hidden');
      arrow.classList.toggle('hidden');
      if (isHidden) {
        arrow.removeAttribute('aria-hidden');
        arrow.setAttribute('tabindex', '0');
      } else {
        arrow.setAttribute('aria-hidden', true);
        arrow.setAttribute('tabindex', '-1');
      }
    });
  }, [isMonthSelectorOpen, isYearSelectorOpen]);

  const getMonthYearText = (isInitialActiveChild: any) => {
    const date = getSlideDate({
      isInitialActiveChild,
      monthChangeDirection,
      activeDate,
      parent: monthYearWrapperElement.current,
    });
    const year = date.year;
    const month = getMonthName(date.month);
    return { month, year };
  };

  const isNextMonthArrowDisabled = maximumDate && isBefore(maximumDate, { ...activeDate, month: activeDate.month + 1, day: 1 });
  const isPreviousMonthArrowDisabled =
    minimumDate && (isBefore({ ...activeDate, day: 1 }, minimumDate) || isSameDay(minimumDate, { ...activeDate, day: 1 }));

  const onMonthChangeTrigger = (direction: 'previous' | 'next') => () => {
    /* Array.from(monthYearWrapperElement.current.children).some */
    const isMonthChanging = Array.from(monthYearWrapperElement.current.children).some((child: any) => child.classList.contains('shown-animated'));
    if (isMonthChanging) {
      return;
    }
    onMonthChange(direction);
  };

  // first button text is the one who shows the current month and year(initial active child)
  const monthYearButtons = [true, false].map(isInitialActiveChild => {
    const { month, year } = getMonthYearText(isInitialActiveChild);
    const isActiveMonth = month === getMonthName(activeDate.month);
    const hiddenStatus = {
      ...(isActiveMonth ? {} : { 'aria-hidden': true }),
    };
    return (
      <div
        onAnimationEnd={handleSlideAnimationEnd}
        className={`month-year ${isInitialActiveChild ? 'shown' : 'hidden-next'}`}
        role="presentation"
        key={String(isInitialActiveChild)}
        {...hiddenStatus}
      >
        <button
          onClick={onMonthSelect}
          type="button"
          className="month-text"
          aria-label={isMonthSelectorOpen ? CalendarLabels.closeMonthSelector : CalendarLabels.openMonthSelector}
          tabIndex={isActiveMonth ? 0 : -1}
          {...hiddenStatus}
        >
          {month}
        </button>
        <button
          onClick={onYearSelect}
          type="button"
          className="year-text"
          aria-label={isYearSelectorOpen ? CalendarLabels.closeYearSelector : CalendarLabels.openYearSelector}
          tabIndex={isActiveMonth ? 0 : -1}
          {...hiddenStatus}
        >
          {year}
        </button>
      </div>
    );
  });

  return (
    <div ref={headerElement} className="header">
      <button
        className="month-arrow-wrapper right"
        onClick={onMonthChangeTrigger('previous')}
        aria-label={CalendarLabels.previousMonth}
        type="button"
        disabled={isPreviousMonthArrowDisabled || false}
      >
        <span className="month-arrow" />
      </button>
      <div className="month-year-container" ref={monthYearWrapperElement}>
        &nbsp;
        {monthYearButtons}
      </div>
      <button
        className="month-arrow-wrapper left"
        onClick={onMonthChangeTrigger('next')}
        aria-label={CalendarLabels.nextMonth}
        type="button"
        disabled={isNextMonthArrowDisabled || false}
      >
        <span className="month-arrow" />
      </button>
    </div>
  );
};
