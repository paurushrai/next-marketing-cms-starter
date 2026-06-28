import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Section } from "@/components/showcase/section";

const SECTIONS = [
  { id: "buttons", label: "Buttons" },
  { id: "badges", label: "Badges" },
  { id: "cards", label: "Cards" },
  { id: "forms", label: "Form controls" },
  { id: "alerts", label: "Alerts" },
  { id: "avatars", label: "Avatars" },
  { id: "separator", label: "Separator" },
  { id: "accordion", label: "Accordion (FAQ)" },
  { id: "skeleton", label: "Skeleton" },
] as const;

const FAQ = [
  {
    question: "Are these components production-ready?",
    answer:
      "They are dependency-free, accessible, and styled entirely from semantic tokens — drop them straight into a page.",
  },
  {
    question: "Do they support dark mode?",
    answer:
      "Yes. Every component reads from the theme tokens, so toggling the theme in the header re-skins them with no extra work.",
  },
  {
    question: "Can I re-brand them?",
    answer:
      "Swap the brand OKLCH ramp in globals.css and every component follows — no per-component color edits.",
  },
];

/** A subtle frame to present each example against the page background. */
function Example({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-6">
      {children}
    </div>
  );
}

/**
 * Living catalogue of the UI primitives. Renders every component with all of
 * its variants so the library is self-documenting — purely presentational,
 * not wired into any page logic.
 */
export function ComponentGallery() {
  return (
    <div>
      <nav aria-label="Component sections" className="border-b border-border pb-6">
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="transition-colors hover:text-foreground"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Section
        id="buttons"
        title="Buttons"
        description="Six variants across four sizes. Use primary for the main call to action."
      >
        <Example>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </Example>
        <div className="mt-4">
          <Example>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Add">
              +
            </Button>
            <Button disabled>Disabled</Button>
          </Example>
        </div>
      </Section>

      <Section
        id="badges"
        title="Badges"
        description="Compact status and category labels."
      >
        <Example>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
        </Example>
      </Section>

      <Section
        id="cards"
        title="Cards"
        description="A composable surface for feature, pricing, and testimonial sections."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <CardDescription>For side projects and prototypes.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">
                $0
                <span className="text-sm font-normal text-muted-foreground">
                  /mo
                </span>
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Get started
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Pro</CardTitle>
                <Badge variant="success">Popular</Badge>
              </div>
              <CardDescription>For growing teams that ship fast.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">
                $29
                <span className="text-sm font-normal text-muted-foreground">
                  /mo
                </span>
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Start free trial</Button>
            </CardFooter>
          </Card>
        </div>
      </Section>

      <Section
        id="forms"
        title="Form controls"
        description="Inputs, textareas, and labels for contact and lead-capture forms."
      >
        <Card className="max-w-md">
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="demo-email">Work email</Label>
              <Input
                id="demo-email"
                type="email"
                placeholder="you@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-message">Message</Label>
              <Textarea
                id="demo-message"
                placeholder="Tell us about your project…"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-disabled">Disabled</Label>
              <Input id="demo-disabled" placeholder="Unavailable" disabled />
            </div>
            <Button className="w-full">Send message</Button>
          </CardContent>
        </Card>
      </Section>

      <Section
        id="alerts"
        title="Alerts"
        description="Inline notices with role=alert for assistive tech."
      >
        <div className="space-y-4">
          <Alert>
            <AlertTitle>Note</AlertTitle>
            <AlertDescription>
              This is a default informational message.
            </AlertDescription>
          </Alert>
          <Alert variant="success">
            <AlertTitle>Subscribed</AlertTitle>
            <AlertDescription>You&apos;re on the list.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>Your trial ends in 3 days.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Something went wrong. Try again.</AlertDescription>
          </Alert>
        </div>
      </Section>

      <Section
        id="avatars"
        title="Avatars"
        description="Image avatars with an automatic initials fallback. Three sizes."
      >
        <Example>
          <Avatar size="sm" name="Ada Lovelace" />
          <Avatar size="md" name="Grace Hopper" />
          <Avatar size="lg" name="Linus Torvalds" />
          <Avatar
            size="lg"
            name="Next Marketing"
            src="/favicon.ico"
          />
        </Example>
      </Section>

      <Section
        id="separator"
        title="Separator"
        description="Thin divider for grouping content, horizontal or vertical."
      >
        <Example>
          <div className="w-full">
            <p className="text-sm text-foreground">Above</p>
            <Separator className="my-3" />
            <p className="text-sm text-foreground">Below</p>
            <div className="mt-4 flex h-6 items-center gap-3 text-sm text-muted-foreground">
              <span>Docs</span>
              <Separator orientation="vertical" />
              <span>Pricing</span>
              <Separator orientation="vertical" />
              <span>Blog</span>
            </div>
          </div>
        </Example>
      </Section>

      <Section
        id="accordion"
        title="Accordion (FAQ)"
        description="Built on native details/summary — zero JavaScript, fully crawlable, ideal for FAQ sections."
      >
        <Accordion className="max-w-2xl">
          {FAQ.map((item) => (
            <AccordionItem
              key={item.question}
              question={item.question}
              name="showcase-faq"
            >
              {item.answer}
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <Section
        id="skeleton"
        title="Skeleton"
        description="Loading placeholders that respect reduced-motion preferences."
      >
        <Example>
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </Example>
      </Section>
    </div>
  );
}
