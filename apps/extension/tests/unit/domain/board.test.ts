import { describe, test, expect } from 'vitest'
import { createBoard } from '@/domain/board'

describe('createBoard', () => {
  test('creates board with name and default columns', () => {
    const board = createBoard('Security Review', 'user-123')

    expect(board.name).toBe('Security Review')
    expect(board.columns).toHaveLength(3)
    expect(board.columns[0].title).toBe('To Do')
    expect(board.columns[1].title).toBe('In Progress')
    expect(board.columns[2].title).toBe('Done')
  })
})
