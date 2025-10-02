import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

// Mock the Hero component to avoid Three.js issues
vi.mock('../components/Hero', () => ({
  AuroraHero: () => (
    <div>
      <span>Now Live!</span>
      <h1>Decrease your SaaS churn by over 90%</h1>
      <button>Start free trial</button>
    </div>
  ),
}))

describe('App', () => {
  it('renders the hero component', () => {
    render(<App />)

    // Check if the main heading is rendered
    expect(
      screen.getByText(/Decrease your SaaS churn by over 90%/i)
    ).toBeInTheDocument()

    // Check if the CTA button is rendered
    expect(screen.getByText(/Start free trial/i)).toBeInTheDocument()

    // Check if the "Now Live!" badge is rendered
    expect(screen.getByText(/Now Live!/i)).toBeInTheDocument()
  })
})
