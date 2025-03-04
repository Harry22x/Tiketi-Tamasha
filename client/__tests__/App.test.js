import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// Mocking localStorage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => "mockToken");
});

test("renders App without crashing", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Check if Navbar and Footer are rendered
  expect(screen.getByRole("banner")).toBeInTheDocument();
});
