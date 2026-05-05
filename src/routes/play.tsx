import { createFileRoute } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'
import { PlaygroundScreen } from '@/screens/playground/playground-screen'

export const Route = createFileRoute('/play')({
  ssr: false,
  component: PlayRoute,
})

function PlayRoute() {
  usePageTitle('Play HermesWorld')
  return <PlaygroundScreen />
}
