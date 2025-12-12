import * as Automerge from '@automerge/automerge'
import type { BoardContent } from '@chatham/types'
import { initializeBoard } from '@chatham/automerge'

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
