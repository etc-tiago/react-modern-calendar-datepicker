import React, { useRef, useEffect } from 'react';

import { isSameDay } from '../shared/generalUtils';
import { monthsNames, isBefore, getMonthNumber } from '../shared/constants';

export const MonthSelector = (props: any) => {
  const { activeDate, maximumDate, minimumDate, onMonthSelect, isOpen } = props;
  const monthSelector: any = useRef(null);

  useEffect(() => {
    const classToggleMethod = isOpen ? 'add' : 'remove';
    monthSelector.current.classList[classToggleMethod]('-open');
  }, [isOpen]);

  const renderMonthSelectorItems = () =>
    monthsNames.map((persianMonth: any) => {
      const monthNumber = getMonthNumber(persianMonth);
      const monthDate = { day: 1, month: monthNumber, year: activeDate.year };
      const isAfterMaximumDate = maximumDate && isBefore(maximumDate, { ...monthDate, month: monthNumber });
      const isBeforeMinimumDate =
        minimumDate &&
        (isBefore({ ...monthDate, month: monthNumber + 1 }, minimumDate) || isSameDay({ ...monthDate, month: monthNumber + 1 }, minimumDate));
      const isSelected = monthNumber === activeDate.month;
      return (
        <li key={persianMonth} className={`month-selector-item ${isSelected ? '-active' : ''}`}>
          <button
            tabIndex={isSelected && isOpen ? 0 : -1}
            onClick={() => {
              onMonthSelect(monthNumber);
            }}
            className="month-selector-item-text"
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
    <div role="presentation" className="month-selector-animation-wrapper" {...(isOpen ? {} : { 'aria-hidden': true })}>
      <div role="presentation" data-testid="month-selector-wrapper" className="month-selector-wrapper">
        <ul ref={monthSelector} className="month-selector" data-testid="month-selector">
          {renderMonthSelectorItems()}
        </ul>
      </div>
    </div>
  );
};
