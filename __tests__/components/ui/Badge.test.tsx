import React from 'react';
import { render } from '@testing-library/react-native';
import { Badge } from '../../../src/components/ui/Badge';

describe('Badge Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Badge text="New" />);
    expect(getByText('New')).toBeTruthy();
  });

  it('renders with different variants', () => {
    const { getByText } = render(<Badge text="Success" variant="success" />);
    expect(getByText('Success')).toBeTruthy();
  });

  it('renders with different sizes', () => {
    const { getByText } = render(<Badge text="Large" size="md" />);
    expect(getByText('Large')).toBeTruthy();
  });
});
