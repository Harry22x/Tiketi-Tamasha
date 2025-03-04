import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SideBar from "../src/components/SideBar";

describe("SideBar Component", () => {
  test("renders correctly for an Organizer", () => {
    render(
      <MemoryRouter>
        <SideBar user={{ role: "Organizer" }} />
      </MemoryRouter>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Attending Events")).toBeInTheDocument();
  });

  test("renders correctly for an Attendee", () => {
    render(
      <MemoryRouter>
        <SideBar user={{ role: "Attendee" }} />
      </MemoryRouter>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.queryByText("Attending Events")).not.toBeInTheDocument();
  });

  test("renders correctly for a guest (no user)", () => {
    render(
      <MemoryRouter>
        <SideBar user={null} />
      </MemoryRouter>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
    expect(screen.queryByText("Attending Events")).not.toBeInTheDocument();
  });
});
