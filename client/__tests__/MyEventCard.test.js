import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MyEventCard from "../src/components/MyEventCard";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useOutletContext: () => [jest.fn(), {}, jest.fn()],
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

const mockEvent = {
  name: "Tech Conference",
  location: "New York",
  id: 1,
  time: "10:00 AM",
  description: "A big tech event.",
  image: "event.jpg",
  date: "2025-05-01",
};

describe("MyEventCard Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders event details correctly", () => {
    render(
      <MemoryRouter>
        <MyEventCard {...mockEvent} />
      </MemoryRouter>
    );

    expect(screen.getByText("Tech Conference")).toBeInTheDocument();
    expect(screen.getByText("Description: A big tech event.")).toBeInTheDocument();
    expect(screen.getByText("Location: New York")).toBeInTheDocument();
    expect(screen.getByText("Date: 2025-05-01")).toBeInTheDocument();
    expect(screen.getByText("Time: 10:00 AM")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "event.jpg");
  });

  test("opens and closes edit form", () => {
    render(
      <MemoryRouter>
        <MyEventCard {...mockEvent} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Edit"));
    expect(screen.getByLabelText("Event Name")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByLabelText("Event Name")).not.toBeInTheDocument();
  });

  test("submits form successfully", async () => {
    render(
      <MemoryRouter>
        <MyEventCard {...mockEvent} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Edit"));

    fireEvent.change(screen.getByLabelText("Event Name"), { target: { value: "Updated Event" } });
    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });

  test("deletes event when delete button is clicked", async () => {
    render(
      <MemoryRouter>
        <MyEventCard {...mockEvent} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Delete"));

    await waitFor(() => expect(fetch).toHaveBeenCalledWith(expect.stringContaining("events/1"), expect.anything()));
  });
});
