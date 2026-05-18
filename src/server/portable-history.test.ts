import { describe, expect, it } from 'vitest'

import {
  selectPortableConversationHistory,
  shouldReplayPortableHistory,
} from './portable-history'

describe('portable history replay', () => {
  it('replays persisted history even when the gateway request is authenticated', () => {
    expect(
      shouldReplayPortableHistory({
        bearerToken: 'token',
      }),
    ).toBe(true)

    expect(
      selectPortableConversationHistory(
        [{ role: 'assistant', content: 'old reply' }],
        [{ role: 'user', content: 'fallback' }],
        { bearerToken: 'token' },
      ),
    ).toEqual([{ role: 'assistant', content: 'old reply' }])
  })

  it('replays persisted history for direct local-provider requests', () => {
    expect(
      selectPortableConversationHistory(
        [{ role: 'assistant', content: 'old reply' }],
        [{ role: 'user', content: 'fallback' }],
        { localBaseUrl: 'http://127.0.0.1:11434', bearerToken: 'token' },
      ),
    ).toEqual([{ role: 'assistant', content: 'old reply' }])
  })

  it('falls back to client-sent history when no persisted local session exists', () => {
    expect(
      selectPortableConversationHistory(
        [],
        [{ role: 'user', content: 'fallback' }],
        { bearerToken: '' },
      ),
    ).toEqual([{ role: 'user', content: 'fallback' }])
  })
})
