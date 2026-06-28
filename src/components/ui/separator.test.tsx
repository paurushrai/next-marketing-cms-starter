import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Separator } from "./separator";

describe("Separator", () => {
  it("should_expose_a_separator_role_when_not_decorative", () => {
    render(<Separator decorative={false} orientation="vertical" />);
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("aria-orientation", "vertical");
  });

  it("should_be_hidden_from_assistive_tech_when_decorative", () => {
    render(<Separator data-testid="rule" />);
    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
  });
});
