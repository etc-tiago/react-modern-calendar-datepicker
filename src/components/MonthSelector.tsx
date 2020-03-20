import React, { useRef, useEffect } from 'react';

import { isSameDay } from '../shared/generalUtils';
import handleKeyboardNavigation from '../shared/keyboardNavigation';
import { monthsNames, isBefore, getMonthNumber } from '../shared/constants';

export const MonthSelector = (props: any) => {
  const { activeDate, maximumDate, minimumDate, onMonthSelect, isOpen, locale } = props;
  const monthSelector: any = useRef(null);

  useEffect(() => {
    const classToggleMethod = isOpen ? 'add' : 'remove';
    monthSelector.current.classList[classToggleMethod]('-open');
  }, [isOpen]);

  const handleKeyDown = (e: any) => {
    handleKeyboardNavigation(e, { allowVerticalArrows: false });
  };

  const renderMonthSelectorItems = () =>
    monthsNames.map((persianMonth: any) => {
      const monthNumber = getMonthNumber(persianMonth);
      const monthDate = { day: 1, month: monthNumber, year: activeDate.year };
      const isAfterMaximumDate =
        maximumDate && isBefore(maximumDate, { ...monthDate, month: monthNumber });
      const isBeforeMinimumDate =
        minimumDate &&
        (isBefore({ ...monthDate, month: monthNumber + 1 }, minimumDate) ||
          isSameDay({ ...monthDate, month: monthNumber + 1 }, minimumDate));
      const isSelected = monthNumber === activeDate.month;
      return (
        <li
          key={persianMonth}
          className={`Calendar__monthSelectorItem ${isSelected ? '-active' : ''}`}
        >
          <button
            tabIndex={isSelected && isOpen ? 0 : -1}
            onClick={() => {
              onMonthSelect(monthNumber);
            }}
            className="Calendar__monthSelectorItemText"
            type="button"
            disabled={isAfterMaximumDate || isBeforeMinimumDate}
            aria-pressed={isSelected}
            data-is-default-selectable={isSelected}
          >
            {persianMonth}
          </button>
        </li>
      );
    });
  return (
    <div
      role="presentation"
      className="Calendar__monthSelectorAnimationWrapper"
      {...(isOpen ? {} : { 'aria-hidden': true })}
    >
      <div
        role="presentation"
        data-testid="month-selector-wrapper"
        className="Calendar__monthSelectorWrapper"
        onKeyDown={handleKeyDown}
      >
        <ul ref={monthSelector} className="Calendar__monthSelector" data-testid="month-selector">
          {renderMonthSelectorItems()}
        </ul>
      </div>
    </div>
  );
};
