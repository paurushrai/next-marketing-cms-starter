import { ComponentGallery } from "@/components/showcase/component-gallery";
import { Container } from "@/components/ui/container";

export default function HomePage() {
  return (
    <Container className="py-16">
      <header>
        <h1 className="font-display text-4xl font-bold tracking-tight">
          UI Component Library
        </h1>
        <p className="mt-4 max-w-prose text-muted-foreground">
          A token-driven set of accessible, SEO-friendly primitives for
          marketing sites. Every component below resolves from semantic tokens —
          toggle the theme in the header and the whole catalogue re-skins. Each
          is shown with all of its variants.
        </p>
      </header>
      <ComponentGallery />
    </Container>
  );
}
