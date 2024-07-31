import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen, act } from "@testing-library/react";
import Login from "./login";

// Mock the ReCAPTCHA component
jest.mock("react-google-recaptcha", () => ({
  __esModule: true,
  default: jest.fn((props) => {
    return <div data-testid="recaptcha" onClick={() => props.onChange("mock-recaptcha-token")} />;
  }),
}));

describe("Login Component", () => {
  test("1.renders Login form", () => {
    render(<Login />);
    expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
  });

  test("2. validate form inputs", async () => {
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

  test("3. validate form inputs", async () => {
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

  test("4. form submission fails without reCAPTCHA", async () => {
    render(<Login />);
    await act(async () => {
      fireEvent.input(screen.getByLabelText(/email/i), {
        target: { value: "test@example.com" },
      });
      fireEvent.input(screen.getByLabelText("Password"), {
        target: { value: "password" },
      });
    });

    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: /sign in$/i }));
    });

    expect(await screen.findByText(/ReCAPTCHA is required/i)).toBeInTheDocument();
  });

  test("5. form submission succeeds with reCAPTCHA", async () => {
    render(<Login />);
    await act(async () => {
      fireEvent.input(screen.getByLabelText(/email/i), {
        target: { value: "test@example.com" },
      });
      fireEvent.input(screen.getByLabelText("Password"), {
        target: { value: "password" },
      });
    });

    // Simulate reCAPTCHA completion
    fireEvent.click(screen.getByTestId("recaptcha"));

    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: /sign in$/i }));
    });

    // Ensure no validation errors are shown
    expect(screen.queryByText(/Email is required/i)).toBeNull();
    expect(screen.queryByText(/^Password is required/i)).toBeNull();
    expect(screen.queryByText(/Invalid email address/i)).toBeNull();

    // Ensure form data is logged correctly
    expect(console.log).toHaveBeenCalledWith("Form data", {
      email: "test@example.com",
      password: "password",
      recaptcha: "mock-recaptcha-token",
    });
  });

});

// Mock console.log to suppress output during tests
beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});
