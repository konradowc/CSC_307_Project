import React from "react";
import { render, screen } from "@testing-library/react";

test("simple render works", () => {
  render(<div>Hello, test!</div>);
  expect(screen.getByText("Hello, test!")).toBeInTheDocument();
});
