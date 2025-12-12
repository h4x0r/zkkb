import { describe, test, expect } from 'vitest'
import { createBoard, addCard, moveCard, updateCard } from '@/domain/board'

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

describe('addCard', () => {
  test('adds card to specified column', () => {
    const board = createBoard('Test Board', 'user-123')
    const columnId = board.columns[0].id

    const updated = addCard(board, columnId, {
      title: 'Fix CVE-2024-1234',
      description: 'Critical RCE vulnerability'
    })

    const cards = Object.values(updated.cards)
    expect(cards).toHaveLength(1)
    expect(cards[0].title).toBe('Fix CVE-2024-1234')
    expect(cards[0].description).toBe('Critical RCE vulnerability')
    expect(cards[0].columnId).toBe(columnId)
  })
})

describe('moveCard', () => {
  test('moves card to different column with new position', () => {
    const board = createBoard('Test', 'user-123')
    const todoCol = board.columns[0].id
    const doneCol = board.columns[2].id

    let updated = addCard(board, todoCol, { title: 'Task', description: '' })
    const cardId = Object.keys(updated.cards)[0]

    updated = moveCard(updated, cardId, doneCol, 'z')

    expect(updated.cards[cardId].columnId).toBe(doneCol)
    expect(updated.cards[cardId].position).toBe('z')
  })
})

describe('updateCard', () => {
  test('updates card title and description', () => {
    let board = createBoard('Test', 'user-123')
    board = addCard(board, board.columns[0].id, { title: 'Old', description: 'Old desc' })
    const cardId = Object.keys(board.cards)[0]

    const updated = updateCard(board, cardId, {
      title: 'Updated CVE',
      description: 'New details'
    })

    expect(updated.cards[cardId].title).toBe('Updated CVE')
    expect(updated.cards[cardId].description).toBe('New details')
    expect(updated.cards[cardId].updatedAt).toBeGreaterThanOrEqual(board.cards[cardId].createdAt)
  })
})
