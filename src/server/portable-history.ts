export type PortableHistoryMessage = {
  role: string
  content: string
}

export function shouldReplayPortableHistory(_options?: {
  localBaseUrl?: string
  bearerToken?: string
}): boolean {
  // Portable mode ultimately targets a stateless chat-completions endpoint.
  // Even when the workspace authenticates to a gateway with a bearer token,
  // the backend does not rehydrate prior turns server-side, so the workspace
  // must replay the local transcript on every request.
  return true
}

export function selectPortableConversationHistory(
  persistedHistory: Array<PortableHistoryMessage>,
  fallbackHistory: Array<PortableHistoryMessage>,
  options?: {
    localBaseUrl?: string
    bearerToken?: string
  },
): Array<PortableHistoryMessage> {
  if (!shouldReplayPortableHistory(options)) return []
  return persistedHistory.length > 0 ? persistedHistory : fallbackHistory
}
