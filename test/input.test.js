import React from 'react';
import { render } from '@testing-library/react';

import DatePicker from '../src';

const renderInput = props => {
  const selectors = render(<DatePicker {...props} />);
  const input = selectors.getByTestId('datepicker-input');
  return { ...selectors, input };
};

describe('DatePicker Input', () => {
  test('shows single date selection value', () => {
    const gregorianValue = { year: 2019, month: 10, day: 1 };
    const { input } = renderInput({ value: gregorianValue });
    expect(input).toHaveValue('2019/10/01');
  });

  test('shows range selection value', () => {
    const gregorianValue = {
      from: { year: 2019, month: 10, day: 1 },
      to: { year: 2019, month: 10, day: 5 },
    };
    const { input } = renderInput({ value: gregorianValue });
    expect(input).toHaveValue('from 2019/10/01 to 2019/10/05');
  });

  test('shows multiple date value', () => {
    const gregorianValue = [
      { year: 2019, month: 10, day: 1 },
      { year: 2019, month: 10, day: 5 },
      { year: 2019, month: 10, day: 12 },
    ];
    const { input } = renderInput({ value: gregorianValue });
    expect(input).toHaveValue('1, 5, 12');
  });

  test('overrides input format by formatInputText prop', () => {
    const value = { year: 2019, month: 10, day: 1 };
    const formatInputText = () => 'custom';
    const { input } = renderInput({ value, formatInputText });
    expect(input).toHaveValue('custom');
  });
});
