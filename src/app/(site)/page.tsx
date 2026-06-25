import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function HomePage() {
  return (
    <Container className="py-24">
      <h1 className="font-display text-4xl font-bold tracking-tight">Home</h1>
      <p className="mt-4 max-w-prose text-muted-foreground">
        Token-driven foundation. Toggle the theme in the header — every color
        below resolves from semantic tokens, so it re-skins with the theme and
        any brand swap.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </Container>
  );
}
