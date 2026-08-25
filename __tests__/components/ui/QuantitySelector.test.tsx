import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { QuantitySelector } from '../../../src/components/ui/QuantitySelector';

describe('QuantitySelector Component', () => {
  it('renders quantity correctly', () => {
    const { getByText } = render(
      <QuantitySelector quantity={2} onIncrease={() => {}} onDecrease={() => {}} />
    );
    expect(getByText('2')).toBeTruthy();
  });

  it('calls onIncrease when + is pressed', () => {
    const onIncreaseMock = jest.fn();
    const { getByText } = render(
      <QuantitySelector quantity={2} onIncrease={onIncreaseMock} onDecrease={() => {}} />
    );
    fireEvent.press(getByText('+'));
    expect(onIncreaseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onDecrease when - is pressed', () => {
    const onDecreaseMock = jest.fn();
    const { getByText } = render(
      <QuantitySelector quantity={2} onIncrease={() => {}} onDecrease={onDecreaseMock} />
    );
    fireEvent.press(getByText('−'));
    expect(onDecreaseMock).toHaveBeenCalledTimes(1);
  });

  it('disables decrease button when quantity is at or below min', () => {
    const onDecreaseMock = jest.fn();
    const { getByText } = render(
      <QuantitySelector quantity={1} min={1} onIncrease={() => {}} onDecrease={onDecreaseMock} />
    );
    fireEvent.press(getByText('−'));
    expect(onDecreaseMock).not.toHaveBeenCalled();
  });

  it('disables increase button when quantity is at or above max', () => {
    const onIncreaseMock = jest.fn();
    const { getByText } = render(
      <QuantitySelector quantity={10} max={10} onIncrease={onIncreaseMock} onDecrease={() => {}} />
    );
    fireEvent.press(getByText('+'));
    expect(onIncreaseMock).not.toHaveBeenCalled();
  });
});
