import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { CreditProvider, useCredits } from '../lib/contexts'

function TestConsumer() {
  const { credits, canAfford, addCredits, deductCredits } = useCredits()
  return (
    <div>
      <span data-testid="credits">{credits}</span>
      <span data-testid="canAfford100">{canAfford(100) ? 'yes' : 'no'}</span>
      <span data-testid="canAfford200">{canAfford(200) ? 'yes' : 'no'}</span>
      <button onClick={() => addCredits(50)}>Add 50</button>
      <button onClick={() => deductCredits(30)}>Deduct 30</button>
    </div>
  )
}

describe('CreditProvider', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('provides default credits of 100', () => {
    render(
      <CreditProvider>
        <TestConsumer />
      </CreditProvider>
    )
    expect(screen.getByTestId('credits').textContent).toBe('100')
  })

  test('canAfford returns correctly', () => {
    render(
      <CreditProvider>
        <TestConsumer />
      </CreditProvider>
    )
    expect(screen.getByTestId('canAfford100').textContent).toBe('yes')
    expect(screen.getByTestId('canAfford200').textContent).toBe('no')
  })

  test('addCredits increases credits', async () => {
    render(
      <CreditProvider>
        <TestConsumer />
      </CreditProvider>
    )
    await act(async () => {
      fireEvent.click(screen.getByText('Add 50'))
    })
    expect(screen.getByTestId('credits').textContent).toBe('150')
  })

  test('deductCredits decreases credits', async () => {
    render(
      <CreditProvider>
        <TestConsumer />
      </CreditProvider>
    )
    await act(async () => {
      fireEvent.click(screen.getByText('Deduct 30'))
    })
    expect(screen.getByTestId('credits').textContent).toBe('70')
  })
})

describe('useCredits', () => {
  test('throws when used outside CreditProvider', () => {
    const consoleError = console.error
    console.error = () => {}
    expect(() => render(<TestConsumer />)).toThrow(
      'useCredits must be used within CreditProvider'
    )
    console.error = consoleError
  })
})
