import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Avatar, initialsOf } from "./avatar";

describe("initialsOf", () => {
  it("should_return_two_initials_when_given_a_full_name", () => {
    expect(initialsOf("Ada Lovelace")).toBe("AL");
  });

  it("should_cap_at_two_initials_when_given_extra_words", () => {
    expect(initialsOf("Grace Brewster Hopper")).toBe("GB");
  });

  it("should_return_a_single_initial_when_given_one_word", () => {
    expect(initialsOf("Linus")).toBe("L");
  });
});

describe("Avatar", () => {
  it("should_render_initials_when_no_src_is_provided", () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByText("AL")).toBeInTheDocument();
  });

  it("should_render_an_image_with_name_as_alt_when_src_is_provided", () => {
    render(<Avatar name="Ada Lovelace" src="/ada.jpg" />);
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toHaveAttribute(
      "src",
      "/ada.jpg",
    );
  });
});
