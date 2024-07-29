import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen, act } from "@testing-library/react";
import Register from "./register";

describe("Register Component", () => {
  test("1. renders Register form", () => {
    render(<Register />);
    expect(screen.getByText("Welcome!")).toBeInTheDocument();
  });

  test("2. validate form inputs", async () => {
    render(<Register />);
    await act(async () => {
      fireEvent.input(screen.getByLabelText(/name/i), {
        target: { value: "a" },
      });
      fireEvent.input(screen.getByLabelText(/email/i), {
        target: { value: "" },
      });
      fireEvent.input(screen.getByLabelText("Password"), {
        target: { value: "" },
      });
      fireEvent.input(screen.getByLabelText(/confirm password/i), {
        target: { value: "" },
      });
    });

    fireEvent.submit(screen.getByRole("button", { name: /sign up/i }));

    expect(
      await screen.findByText(/Name must be at least 2 characters/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/^Password is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Confirm Password is required/i)
    ).toBeInTheDocument();
  });

  test("3. validate form inputs", async () => {
    render(<Register />);
    await act(async () => {
      fireEvent.input(screen.getByLabelText(/name/i), {
        target: { value: "" },
      });
      fireEvent.input(screen.getByLabelText(/email/i), {
        target: { value: "invalid-email" },
      });
      fireEvent.input(screen.getByLabelText("Password"), {
        target: { value: "123" },
      });
      fireEvent.input(screen.getByLabelText(/confirm password/i), {
        target: { value: "1234" },
      });
    });

    fireEvent.submit(screen.getByRole("button", { name: /sign up/i }));

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/invalid email address/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/at least 6 characters/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/passwords must match/i)
    ).toBeInTheDocument();
  });
});
