
import { render, screen, fireEvent } from '@testing-library/react';
import { CategorySelector } from './CategorySelector.ro';
import mockCategories from '../../data/categories.json';

jest.mock('../../hooks/useProductFilter', () => ({
  useProductFilter: () => ({
    filterProducts: jest.fn()
  })
}));

describe('CategorySelector', () => {
  it('renders categories', () => {
    const { container } = render(&lt;CategorySelector />);
    expect(screen.getByText('Electronice')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('toggles mobile view', () => {
    render(&lt;CategorySelector />);
    const toggle = screen.getByRole('button');
    fireEvent.click(toggle);
    expect(screen.getByText('× Închide')).toBeInTheDocument();
  });

  it('handles category selection', () => {
    render(&lt;CategorySelector />);
    const firstCategory = screen.getByText('Electronice');
    fireEvent.click(firstCategory);
    expect(firstCategory).toHaveClass('activeCategory');
  });
});
