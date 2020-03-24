import React, { useRef, useEffect, FC } from 'react';

import { minYearToSubtract, maxYearToSum, IDateNumbers, getToday } from '../shared/constants';

type YearSelector = {
  selectorStartingYear: number;
  selectorEndingYear: number;
  isOpen: any;
  activeDate: any;
  onYearSelect: any;
  maximumDate: IDateNumbers | null;
  minimumDate: IDateNumbers | null;
};

export const YearSelector: FC<YearSelector> = ({
  isOpen,
  activeDate,
  onYearSelect,
  selectorStartingYear,
  selectorEndingYear,
  maximumDate,
  minimumDate,
}) => {
  const wrapperElement: any = useRef(null);
  const yearListElement: any = useRef(null);

  const startingYearValue = selectorStartingYear || getToday().year - minYearToSubtract;
  const endingYearValue = selectorEndingYear || getToday().year + maxYearToSum;
  const allYears: any[] = [];
  for (let i = startingYearValue; i <= endingYearValue; i += 1) {
    allYears.push(i);
  }
  useEffect(() => {
    const classToggleMethod = isOpen ? 'add' : 'remove';
    const activeSelectorYear = wrapperElement.current.querySelector('.year-selector-item.active');
    if (!activeSelectorYear) {
      throw new RangeError('O valor fornecido para o ano está fora do intervalo de anos selecionável.');
    }
    wrapperElement.current.classList[classToggleMethod]('faded');
    yearListElement.current.scrollTop = activeSelectorYear.offsetTop - activeSelectorYear.offsetHeight * 5;
    yearListElement.current.classList[classToggleMethod]('open');
  }, [isOpen]);

  const renderSelectorYears = () => {
    return allYears.map(item => {
      const isAfterMaximumDate = maximumDate && item > maximumDate.year;
      const isBeforeMinimumDate = minimumDate && item < minimumDate.year;
      const isSelected = activeDate.year === item;
      return (
        <li key={item} className={`year-selector-item ${isSelected ? 'active' : ''}`}>
          <button
            tabIndex={isSelected && isOpen ? 0 : -1}
            className="year-selector-text"
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

  return (
    <div className="year-selector-animation-wrapper" role="presentation" {...(isOpen ? {} : { 'aria-hidden': true })}>
      <div ref={wrapperElement} className="year-selector-wrapper" role="presentation">
        <ul ref={yearListElement} className="year-selector">
          {renderSelectorYears()}
        </ul>
      </div>
    </div>
  );
};
