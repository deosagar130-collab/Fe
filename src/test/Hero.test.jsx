import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

// Mock all the problematic dependencies
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div data-testid='canvas'>{children}</div>, // eslint-disable-line react/prop-types
}))

vi.mock('@react-three/drei', () => ({
  Stars: () => <div data-testid='stars' />,
}))

vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }) => (
      <section {...props}>{children}</section>
    ),
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  },
  useMotionTemplate: () => 'mocked-template',
  useMotionValue: () => ({ current: 'mocked-value' }),
  animate: vi.fn(),
}))

vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
  },
}))

import axios from 'axios'
import { AuroraHero } from '../components/Hero'

// Constants
const API_URL = 'http://localhost:3000/api/users/login'
const mockedAxios = vi.mocked(axios)

describe('AuroraHero', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders hero content correctly', () => {
    render(<AuroraHero />)

    expect(screen.getByText('Now Live!')).toBeInTheDocument()
    // Check for the specific heading text
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Decrease your SaaS churn by over 90%'
    )
    expect(
      screen.getByText(/with our innovative solutions/i)
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /start free trial/i })
    ).toBeInTheDocument()
  })

  it('calls API on button click (success case)', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { success: true } })

    render(<AuroraHero />)

    const button = screen.getByRole('button', { name: /start free trial/i })
    fireEvent.click(button)

    // Check API call
    expect(mockedAxios.post).toHaveBeenCalledWith(API_URL)

    // If your component updates UI on success, assert here:
    // expect(await screen.findByText(/welcome/i)).toBeInTheDocument()
  })

  it('handles API error gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    mockedAxios.post.mockRejectedValueOnce(new Error('API Error'))

    render(<AuroraHero />)

    const button = screen.getByRole('button', { name: /start free trial/i })
    fireEvent.click(button)

    // Still called even though it failed
    expect(mockedAxios.post).toHaveBeenCalledWith(API_URL)

    // If your component shows error message, assert it here:
    // expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument()

    consoleSpy.mockRestore()
  })
})
