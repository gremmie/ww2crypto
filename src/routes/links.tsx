import { createFileRoute } from "@tanstack/react-router";
import { LinksPage } from "../features/main/linksPage.tsx";

export const Route = createFileRoute("/links")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LinksPage />;
}
