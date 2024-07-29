import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen, act } from "@testing-library/react";
import Login from "./login";

describe("Login Component", () => {
  test("renders Login form", () => {
    render(<Login />);
    expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
  });

  test("1. validate form inputs", async () => {
    render(<Login />);
    await act(async () => {
      fireEvent.input(screen.getByLabelText(/email/i), {
        target: { value: "" },
      });
      fireEvent.input(screen.getByLabelText("Password"), {
        target: { value: "" },
      });
    });

    fireEvent.submit(screen.getByRole("button", { name: /sign in$/i }));

    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/^Password is required/i)).toBeInTheDocument();
    
  });

  test("2. validate form inputs", async () => {
    render(<Login />);
    await act(async () => {
      fireEvent.input(screen.getByLabelText(/email/i), {
        target: { value: "a" },
      });
      fireEvent.input(screen.getByLabelText("Password"), {
        target: { value: "" },
      });
    });

    fireEvent.submit(screen.getByRole("button", { name: /sign in$/i }));

    expect(await screen.findByText(/Invalid email address/i)).toBeInTheDocument();
    expect(await screen.findByText(/^Password is required/i)).toBeInTheDocument();
    
  });

});
