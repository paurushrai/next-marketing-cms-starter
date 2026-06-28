import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Card, CardDescription, CardTitle } from "./card";

describe("Card", () => {
  it("should_render_the_title_as_a_level_3_heading", () => {
    render(<CardTitle>Pricing</CardTitle>);
    expect(
      screen.getByRole("heading", { level: 3, name: "Pricing" }),
    ).toBeInTheDocument();
  });

  it("should_compose_title_and_description_within_a_card", () => {
    render(
      <Card>
        <CardTitle>Starter</CardTitle>
        <CardDescription>For small teams.</CardDescription>
      </Card>,
    );
    expect(screen.getByText("Starter")).toBeInTheDocument();
    expect(screen.getByText("For small teams.")).toBeInTheDocument();
  });
});
