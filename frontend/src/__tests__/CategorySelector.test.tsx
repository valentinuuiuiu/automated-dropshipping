import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { CategorySelector } from '../components/CategorySelector'

describe('CategorySelector', () => {
  test('renders all category buttons', () => {
    render(<CategorySelector />)
    expect(screen.getByText('All Products')).toBeInTheDocument()
    expect(screen.getByText('Electronics')).toBeInTheDocument()
    expect(screen.getByText('Clothing')).toBeInTheDocument()
    expect(screen.getByText('Home & Garden')).toBeInTheDocument()
  })

  test('All Products is active by default', () => {
    render(<CategorySelector />)
    const allBtn = screen.getByText('All Products')
    expect(allBtn.className).toContain('active')
  })

  test('clicking a category makes it active', () => {
    render(<CategorySelector />)
    const electronicsBtn = screen.getByText('Electronics')
    fireEvent.click(electronicsBtn)
    expect(electronicsBtn.className).toContain('active')
  })
})
