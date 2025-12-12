import { generatePhrase, validatePhrase as validateMnemonic } from '@chatham/crypto'

export function generateRecoveryPhrase(): string {
  // 256 bits = 24 words
  return generatePhrase()
}

export function validatePhrase(phrase: string): boolean {
  return validateMnemonic(phrase)
}
