import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Accordion, AccordionItem } from "./accordion";

describe("AccordionItem", () => {
  it("should_render_the_question_in_a_summary", () => {
    render(
      <Accordion>
        <AccordionItem question="Is there a free plan?">Yes.</AccordionItem>
      </Accordion>,
    );
    expect(screen.getByText("Is there a free plan?")).toBeInTheDocument();
  });

  it("should_keep_the_answer_in_the_dom_while_collapsed_for_seo", () => {
    render(
      <Accordion>
        <AccordionItem question="How do I cancel?">
          Cancel anytime from settings.
        </AccordionItem>
      </Accordion>,
    );
    // Crawlable even when collapsed — content is present, not conditionally mounted.
    expect(
      screen.getByText("Cancel anytime from settings."),
    ).toBeInTheDocument();
  });

  it("should_render_expanded_when_defaultOpen_is_set", () => {
    render(
      <Accordion>
        <AccordionItem question="Open?" defaultOpen>
          Answer
        </AccordionItem>
      </Accordion>,
    );
    expect(
      screen.getByText("Open?").closest("details"),
    ).toHaveAttribute("open");
  });
});
