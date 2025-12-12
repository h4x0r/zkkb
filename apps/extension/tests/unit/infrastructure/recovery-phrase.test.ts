import { describe, test, expect } from 'vitest'
import { generateRecoveryPhrase, validatePhrase } from '@/infrastructure/crypto/recovery-phrase'

describe('generateRecoveryPhrase', () => {
  test('generates 24-word BIP-39 phrase', () => {
    const phrase = generateRecoveryPhrase()

    const words = phrase.split(' ')
    expect(words).toHaveLength(24)
    expect(phrase).toMatch(/^[a-z]+(?: [a-z]+){23}$/)
  })

  test('generates different phrases each time', () => {
    const phrase1 = generateRecoveryPhrase()
    const phrase2 = generateRecoveryPhrase()

    expect(phrase1).not.toBe(phrase2)
  })
})

describe('validatePhrase', () => {
  test('accepts valid BIP-39 phrase', () => {
    const phrase = generateRecoveryPhrase()
    expect(validatePhrase(phrase)).toBe(true)
  })

  test('rejects invalid phrase', () => {
    expect(validatePhrase('not a valid phrase')).toBe(false)
    expect(validatePhrase('abandon abandon abandon')).toBe(false)
  })
})
