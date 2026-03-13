import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Hero from '../components/Hero'

describe('Hero', () => {
  const renderHero = () =>
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    )

  test('renders hero title', () => {
    renderHero()
    expect(screen.getByText('AI-Powered Dropshipping')).toBeInTheDocument()
  })

  test('renders hero subtitle', () => {
    renderHero()
    expect(screen.getByText(/Discover trending products/)).toBeInTheDocument()
  })

  test('renders CTA button', () => {
    renderHero()
    expect(screen.getByText('Browse Products')).toBeInTheDocument()
  })
})
