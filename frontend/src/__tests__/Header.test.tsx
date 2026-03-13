import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../components/Header'

describe('Header', () => {
  const renderHeader = () =>
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )

  test('renders the logo text', () => {
    renderHeader()
    expect(screen.getByText('DropShip AI')).toBeInTheDocument()
  })

  test('renders navigation links', () => {
    renderHeader()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Cart')).toBeInTheDocument()
  })

  test('navigation links have correct hrefs', () => {
    renderHeader()
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/')
    expect(screen.getByText('Products').closest('a')).toHaveAttribute('href', '/products')
    expect(screen.getByText('Cart').closest('a')).toHaveAttribute('href', '/checkout')
  })
})
