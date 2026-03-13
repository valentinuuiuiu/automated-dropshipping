import React from 'react'
import { render, screen } from '@testing-library/react'
import Footer from '../components/Footer'

describe('Footer', () => {
  test('renders company name', () => {
    render(<Footer />)
    expect(screen.getByText('DropShip AI')).toBeInTheDocument()
  })

  test('renders quick links section', () => {
    render(<Footer />)
    expect(screen.getByText('Quick Links')).toBeInTheDocument()
  })

  test('renders contact section', () => {
    render(<Footer />)
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  test('renders copyright text', () => {
    render(<Footer />)
    expect(screen.getByText(/DropShip AI. All rights reserved/)).toBeInTheDocument()
  })
})
