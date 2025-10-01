import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import axios from 'axios'
import { AuroraHero } from '../components/Hero'

// Constants
const API_URL = 'http://localhost:3000/api/users/login'

// Mock axios
vi.mock('axios')
const mockedAxios = vi.mocked(axios)

describe('AuroraHero', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders hero content correctly', () => {
    render(<AuroraHero />)

    expect(screen.getByText('Now Live!')).toBeInTheDocument()
    expect(
      screen.getByText(/Decrease your SaaS churn by over 90%/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/with our innovative solutions/i)
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /start free trial/i })).toBeInTheDocument()
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

  it('disables button while request is in progress', async () => {
    let resolve: (v: unknown) => void
    const pendingPromise = new Promise(res => { resolve = res })
    mockedAxios.post.mockReturnValue(pendingPromise as any)

    render(<AuroraHero />)

    const button = screen.getByRole('button', { name: /start free trial/i })
    fireEvent.click(button)

    // Button should be disabled while waiting
    expect(button).toBeDisabled()

    // Resolve request
    resolve!({ data: { success: true } })

    // After request finishes, button should be re-enabled
    expect(await screen.findByRole('button', { name: /start free trial/i })).toBeEnabled()
  })
})
