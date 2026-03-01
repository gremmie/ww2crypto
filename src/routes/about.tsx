import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "../features/main/aboutPage.tsx";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AboutPage />;
}
