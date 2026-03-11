import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/m209/setup/wheels')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/m209/setup/wheels"!</div>
}
