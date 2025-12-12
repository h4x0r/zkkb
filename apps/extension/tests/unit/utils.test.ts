import { describe, test, expect } from 'vitest'
import { cn } from '@/ui/shared/lib/utils'

describe('cn utility', () => {
  test('merges class names correctly', () => {
    const result = cn('px-4', 'py-2', 'bg-blue-500')
    expect(result).toBe('px-4 py-2 bg-blue-500')
  })

  test('handles conditional classes', () => {
    const result = cn('px-4', false && 'py-2', 'bg-blue-500')
    expect(result).toBe('px-4 bg-blue-500')
  })
})
