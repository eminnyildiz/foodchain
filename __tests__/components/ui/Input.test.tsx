import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '../../../src/components/ui/Input';

describe('Input Component', () => {
  it('renders correctly with label', () => {
    const { getByText, getByPlaceholderText } = render(
      <Input label="Email" placeholder="Enter email" />
    );
    expect(getByText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Enter email')).toBeTruthy();
  });

  it('handles text change', () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Type here" onChangeText={onChangeTextMock} />
    );
    
    fireEvent.changeText(getByPlaceholderText('Type here'), 'Hello');
    expect(onChangeTextMock).toHaveBeenCalledWith('Hello');
  });

  it('shows error message', () => {
    const { getByText } = render(<Input error="Invalid email" />);
    expect(getByText('Invalid email')).toBeTruthy();
  });
});
