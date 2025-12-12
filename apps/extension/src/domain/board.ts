import { Automerge, initializeBoard } from '@chatham/automerge'
import type { BoardContent } from '@chatham/types'

export function createBoard(name: string, creatorCommitment: string): Automerge.Doc<BoardContent> {
  return initializeBoard(
    name,
    creatorCommitment,
    'Anonymous', // Default display name
    '', // publicKey placeholder
    '', // wrappedBoardKey placeholder
    '#3b82f6' // Default blue color
  )
}

export interface CardInput {
  title: string
  description: string
}

export function addCard(
  board: Automerge.Doc<BoardContent>,
  columnId: string,
  input: CardInput
): Automerge.Doc<BoardContent> {
  return Automerge.change(board, 'Add card', (doc) => {
    const cardId = crypto.randomUUID()
    const now = Date.now()

    doc.cards[cardId] = {
      id: cardId,
      columnId,
      position: generatePosition(),
      title: input.title,
      description: input.description,
      labels: [],
      dueDate: null,
      assignee: null,
      checklist: [],
      attachments: [],
      comments: [],
      createdAt: now,
      updatedAt: now
    }
  })
}

function generatePosition(): string {
  // Simple fractional indexing - use 'a' + random for now
  return 'a' + Math.random().toString(36).substring(2, 9)
}
