import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="py-8 text-sm text-muted-foreground">
        {siteConfig.name}
      </Container>
    </footer>
  );
}
