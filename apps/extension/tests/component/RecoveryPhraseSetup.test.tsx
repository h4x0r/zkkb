import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoveryPhraseSetup } from '@/ui/shared/components/RecoveryPhraseSetup'

describe('RecoveryPhraseSetup', () => {
  test('shows three options on initial render', () => {
    render(<RecoveryPhraseSetup onComplete={vi.fn()} />)

    expect(screen.getByText(/create new recovery phrase/i)).toBeInTheDocument()
    expect(screen.getByText(/import existing phrase/i)).toBeInTheDocument()
    expect(screen.getByText(/skip for now/i)).toBeInTheDocument()
  })

  test('create new phrase shows 24 words', async () => {
    const user = userEvent.setup()
    render(<RecoveryPhraseSetup onComplete={vi.fn()} />)

    await user.click(screen.getByText(/create new/i))

    // Should show phrase display
    const words = screen.getAllByTestId('phrase-word')
    expect(words).toHaveLength(24)
  })

  test('skip for now shows warning dialog', async () => {
    const user = userEvent.setup()
    render(<RecoveryPhraseSetup onComplete={vi.fn()} />)

    await user.click(screen.getByText(/skip for now/i))

    expect(screen.getByText(/evaluation mode/i)).toBeInTheDocument()
    expect(screen.getByText(/24 hours/i)).toBeInTheDocument()
    expect(screen.getByText(/10 cards/i)).toBeInTheDocument()
  })
})
