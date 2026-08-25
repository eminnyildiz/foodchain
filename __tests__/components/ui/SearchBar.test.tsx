import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchBar } from '../../../src/components/ui/SearchBar';

describe('SearchBar Component', () => {
  it('renders correctly with placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={() => {}} placeholder="Search foods" />
    );
    expect(getByPlaceholderText('Search foods')).toBeTruthy();
  });

  it('handles text change', () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={onChangeTextMock} placeholder="Search foods" />
    );
    fireEvent.changeText(getByPlaceholderText('Search foods'), 'Pizza');
    expect(onChangeTextMock).toHaveBeenCalledWith('Pizza');
  });

  it('clears text when clear button is pressed', () => {
    const onChangeTextMock = jest.fn();
    const { getByText } = render(
      <SearchBar value="Burger" onChangeText={onChangeTextMock} />
    );
    
    // ✕ is the clear icon text
    fireEvent.press(getByText('✕'));
    expect(onChangeTextMock).toHaveBeenCalledWith('');
  });

  it('does not show clear button when value is empty', () => {
    const { queryByText } = render(
      <SearchBar value="" onChangeText={() => {}} />
    );
    expect(queryByText('✕')).toBeNull();
  });
});
