import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { EmptyState } from '../../../src/components/ui/EmptyState';

describe('EmptyState Component', () => {
  it('renders icon and title correctly', () => {
    const { getByText } = render(<EmptyState icon="📦" title="No Items" />);
    expect(getByText('📦')).toBeTruthy();
    expect(getByText('No Items')).toBeTruthy();
  });

  it('renders subtitle correctly', () => {
    const { getByText } = render(
      <EmptyState icon="📦" title="No Items" subtitle="Try adding some items" />
    );
    expect(getByText('Try adding some items')).toBeTruthy();
  });

  it('renders action button and handles press', () => {
    const onActionMock = jest.fn();
    const { getByText } = render(
      <EmptyState 
        icon="📦" 
        title="No Items" 
        actionTitle="Add Item" 
        onAction={onActionMock} 
      />
    );
    
    expect(getByText('Add Item')).toBeTruthy();
    fireEvent.press(getByText('Add Item'));
    expect(onActionMock).toHaveBeenCalledTimes(1);
  });
});
