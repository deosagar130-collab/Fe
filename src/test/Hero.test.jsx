import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

// Mock all the problematic dependencies
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div data-testid="canvas">{children}</div>,
}))

vi.mock('@react-three/drei', () => ({
  Stars: () => <div data-testid="stars" />,
}))

vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
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

const mockedAxios = vi.mocked(axios)

describe('AuroraHero', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all hero elements correctly', () => {
    render(<AuroraHero />)

    expect(screen.getByText('Now Live!')).toBeInTheDocument()
    // Check for the specific heading text
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Decrease your SaaS churn by over 90%'
    )
    expect(
      screen.getByText(
        /Decrease your SaaS churn by over 90% with our innovative solutions/i
      )
    ).toBeInTheDocument()
    expect(screen.getByText('Start free trial')).toBeInTheDocument()
  })

  it('handles button click and API call', async () => {
    mockedAxios.post.mockResolvedValue({ data: { success: true } })

    render(<AuroraHero />)

    const button = screen.getByText('Start free trial')
    fireEvent.click(button)

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:3000/api/users/login'
      )
    })
  })

  it('handles API error gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    mockedAxios.post.mockRejectedValue(new Error('API Error'))

    render(<AuroraHero />)

    const button = screen.getByText('Start free trial')
    fireEvent.click(button)

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled()
    })

    consoleSpy.mockRestore()
  })
})
