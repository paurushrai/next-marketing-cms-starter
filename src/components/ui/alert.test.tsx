import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Alert, AlertDescription, AlertTitle } from "./alert";

describe("Alert", () => {
  it("should_expose_the_alert_role_for_assistive_tech", () => {
    render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Something happened.</AlertDescription>
      </Alert>,
    );
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Heads up");
    expect(alert).toHaveTextContent("Something happened.");
  });

  it("should_apply_destructive_variant_classes", () => {
    render(<Alert variant="destructive">Failed</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("text-destructive");
  });
});
