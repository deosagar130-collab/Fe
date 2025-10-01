import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import { AuroraHero } from '../components/Hero'

// Mock axios
vi.mock('axios')
const mockedAxios = vi.mocked(axios)

describe('AuroraHero', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all hero elements correctly', () => {
    render(<AuroraHero />)
    
    expect(screen.getByText('Now Live!')).toBeInTheDocument()
    expect(screen.getByText(/Decrease your SaaS churn by over 90%/i)).toBeInTheDocument()
    expect(screen.getByText(/Decrease your SaaS churn by over 90% with our innovative solutions/i)).toBeInTheDocument()
    expect(screen.getByText('Start free trial')).toBeInTheDocument()
  })

  it('handles button click and API call', async () => {
    mockedAxios.post.mockResolvedValue({ data: { success: true } })
    
    render(<AuroraHero />)
    
    const button = screen.getByText('Start free trial')
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3000/api/users/login')
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