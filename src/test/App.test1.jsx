import { describe, test, beforeEach, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

// Provide a lightweight mock for the 3D Hero to avoid Three.js in tests
const MockAuroraHero = () => (
  <section aria-label="hero">
    <span>Now Live!</span>
    <h1>Decrease your SaaS churn by over 90%</h1>
    <button type="button">Start free trial</button>
  </section>
)

vi.mock('../components/Hero', () => ({ AuroraHero: MockAuroraHero }))

describe('App', () => {
  beforeEach(() => {
    render(<App />)
  })

  test('shows the main hero heading', () => {
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Decrease your SaaS churn by over 90%/i,
      })
    ).toBeInTheDocument()
  })

  test('renders the primary CTA button', () => {
    expect(
      screen.getByRole('button', { name: /Start free trial/i })
    ).toBeInTheDocument()
  })

  test('displays the "Now Live!" badge', () => {
    expect(screen.getByText(/Now Live!/i)).toBeInTheDocument()
  })
})
