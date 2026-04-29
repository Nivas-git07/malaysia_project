import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders main public navigation", () => {
  render(<App />);
  expect(screen.getByText(/home/i)).toBeInTheDocument();
  expect(screen.getByText(/membership/i)).toBeInTheDocument();
});
