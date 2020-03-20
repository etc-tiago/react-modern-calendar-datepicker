import React, { forwardRef } from 'react';
import { putZero, getValueType } from './shared/generalUtils';
import { IDateNumbers, CalendarLabels } from './shared/constants';

type IDatePickerInput = {
  formatInputText: (props?: any) => string;
  inputPlaceholder: string;
  inputClassName: string;
  renderInput: (props?: any) => null;
  locale: string;
  value: any;
};

const funcStr = () => '';
const funcNull = () => null;

const DatePickerInput = forwardRef((props: IDatePickerInput, ref: any) => {
  const { value } = props;
  const formatInputText = props.formatInputText || funcStr;
  const renderInput = props.renderInput || funcNull;
  const inputClassName = props.inputClassName || '';
  const inputPlaceholder = props.inputPlaceholder || '';

  const getSingleDayValue = () => {
    if (!value) return '';
    const year = value.year;
    const month = putZero(value.month);
    const day = putZero(value.day);
    return `${year}/${month}/${day}`;
  };

  const getDayRangeValue = () => {
    const yearLetterSkip = 0;
    if (!value.from || !value.to) return '';
    const { from, to } = value;
    const fromText = `${putZero(from.year)
      .toString()
      .slice(yearLetterSkip)}/${putZero(from.month)}/${putZero(from.day)}`;
    const toText = `${putZero(to.year)
      .toString()
      .slice(yearLetterSkip)}/${putZero(to.month)}/${putZero(to.day)}`;
    return `${CalendarLabels.from} ${fromText} ${CalendarLabels.to} ${toText}`;
  };

  const getMultiDateValue = () => {
    return value.map((date: IDateNumbers) => date.day).join(`,`);
  };

  const getValue = () => {
    if (formatInputText()) return formatInputText();
    const valueType = getValueType(value);
    switch (valueType) {
      case 'single':
        return getSingleDayValue();
      case 'range':
        return getDayRangeValue();
      case 'multi':
        return getMultiDateValue();
    }
  };

  const placeholderValue = inputPlaceholder || CalendarLabels.defaultPlaceholder;

  return (
    renderInput({ ref }) || (
      <input
        data-testid="datepicker-input"
        readOnly
        ref={ref}
        value={getValue()}
        placeholder={placeholderValue}
        className={`DatePicker__input -ltr ${inputClassName}`}
        aria-label={placeholderValue}
      />
    )
  );
});

export default DatePickerInput;
