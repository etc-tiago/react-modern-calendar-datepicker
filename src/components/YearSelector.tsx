import React, { useRef, useEffect, FC } from 'react';

import {
  MINIMUM_SELECTABLE_YEAR_SUBTRACT,
  MAXIMUM_SELECTABLE_YEAR_SUM,
  DAY_SHAPE,
  getToday,
} from '../shared/constants';
import handleKeyboardNavigation from '../shared/keyboardNavigation';

type YearSelector = {
  selectorStartingYear: number;
  selectorEndingYear: number;
  isOpen: any;
  activeDate: any;
  onYearSelect: any;
  maximumDate: DAY_SHAPE | null;
  minimumDate: DAY_SHAPE | null;
  locale: any;
};

export const YearSelector: FC<YearSelector> = ({
  isOpen,
  activeDate,
  onYearSelect,
  selectorStartingYear,
  selectorEndingYear,
  maximumDate,
  minimumDate,
  locale,
}) => {
  const wrapperElement: any = useRef(null);
  const yearListElement: any = useRef(null);

  const startingYearValue =
    selectorStartingYear || getToday().year - MINIMUM_SELECTABLE_YEAR_SUBTRACT;
  const endingYearValue = selectorEndingYear || getToday().year + MAXIMUM_SELECTABLE_YEAR_SUM;
  const allYears: any[] = [];
  for (let i = startingYearValue; i <= endingYearValue; i += 1) {
    allYears.push(i);
  }
  useEffect(() => {
    const classToggleMethod = isOpen ? 'add' : 'remove';
    const activeSelectorYear = wrapperElement.current.querySelector(
      '.Calendar__yearSelectorItem.-active',
    );
    if (!activeSelectorYear) {
      throw new RangeError(
        `Provided value for year is out of selectable year range. You're probably using a wrong locale prop value or your provided value's locale is different from the date picker locale. Try changing the 'locale' prop or the value you've provided.`,
      );
    }
    wrapperElement.current.classList[classToggleMethod]('-faded');
    yearListElement.current.scrollTop =
      activeSelectorYear.offsetTop - activeSelectorYear.offsetHeight * 5;
    yearListElement.current.classList[classToggleMethod]('-open');
  }, [isOpen]);

  const renderSelectorYears = () => {
    return allYears.map(item => {
      const isAfterMaximumDate = maximumDate && item > maximumDate.year;
      const isBeforeMinimumDate = minimumDate && item < minimumDate.year;
      const isSelected = activeDate.year === item;
      return (
        <li key={item} className={`Calendar__yearSelectorItem ${isSelected ? '-active' : ''}`}>
          <button
            tabIndex={isSelected && isOpen ? 0 : -1}
            className="Calendar__yearSelectorText"
            type="button"
            onClick={() => {
              onYearSelect(item);
            }}
            disabled={isAfterMaximumDate || isBeforeMinimumDate || false}
            aria-pressed={isSelected}
            data-is-default-selectable={isSelected}
          >
            {item}
          </button>
        </li>
      );
    });
  };

  const handleKeyDown = (e: any) => {
    handleKeyboardNavigation(e, { allowVerticalArrows: false });
  };

  return (
    <div
      className="Calendar__yearSelectorAnimationWrapper"
      role="presentation"
      {...(isOpen ? {} : { 'aria-hidden': true })}
    >
      <div
        ref={wrapperElement}
        className="Calendar__yearSelectorWrapper"
        role="presentation"
        data-testid="year-selector-wrapper"
        onKeyDown={handleKeyDown}
      >
        <ul ref={yearListElement} className="Calendar__yearSelector" data-testid="year-selector">
          {renderSelectorYears()}
        </ul>
      </div>
    </div>
  );
};
