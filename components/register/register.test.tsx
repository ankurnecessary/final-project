import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen, act } from "@testing-library/react";
import Register from "./register";

// Mocking getCaptchaValidity
jest.mock("@/server-actions/recaptcha", () => ({
  __esModule: true,
  getCaptchaValidity: jest.fn().mockResolvedValue(true), // Mock implementation
}));

// Mock the ReCAPTCHA component
jest.mock("react-google-recaptcha", () => ({
  __esModule: true,
  default: jest.fn((props) => {
    return (
      <div
        data-testid="recaptcha"
        onClick={() => props.onChange("mock-recaptcha-token")}
      />
    );
  }),
}));

describe("Register Component", () => {
  test("renders Register form", () => {
    render(<Register />);
    expect(screen.getByText("Welcome!")).toBeInTheDocument();
  });

  test("validate form inputs", async () => {
    render(<Register />);
    await act(async () => {
      fireEvent.input(screen.getByLabelText(/name/i), {
        target: { value: "a" },
      });
      fireEvent.input(screen.getByLabelText(/email/i), {
        target: { value: "" },
      });
      fireEvent.input(screen.getByTestId("password"), {
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

  test("validate form inputs", async () => {
    render(<Register />);
    await act(async () => {
      fireEvent.input(screen.getByLabelText(/name/i), {
        target: { value: "" },
      });
      fireEvent.input(screen.getByLabelText(/email/i), {
        target: { value: "invalid-email" },
      });
      fireEvent.input(screen.getByTestId("password"), {
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
      await screen.findByText(/at least 8 characters/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/passwords must match/i)
    ).toBeInTheDocument();
  });

  test("validate password <input/>", async () => {
    render(<Register />);
    const passwordField = screen.getByTestId("password");
    await act(async () => {
      fireEvent.input(passwordField, {
        target: { value: "" },
      });
      fireEvent.blur(passwordField);
    });

    expect(
      await screen.findByText(/Password is required/i)
    ).toBeInTheDocument();

    await act(async () => {
      fireEvent.input(passwordField, {
        target: { value: "h" },
      });
      fireEvent.blur(passwordField);
    });

    expect(
      await screen.findByText(/At least 8 characters/i)
    ).toBeInTheDocument();

    await act(async () => {
      fireEvent.input(passwordField, {
        target: { value: "hellohel" },
      });
      fireEvent.blur(passwordField);
    });

    expect(
      await screen.findByText(
        /Password must include at least 1 upper case letter./i
      )
    ).toBeInTheDocument();

    await act(async () => {
      fireEvent.input(passwordField, {
        target: { value: "Hellohel" },
      });
      fireEvent.blur(passwordField);
    });

    expect(
      await screen.findByText(/Password must include at least 1 number./i)
    ).toBeInTheDocument();

    await act(async () => {
      fireEvent.input(passwordField, {
        target: { value: "Hellohe1" },
      });
      fireEvent.blur(passwordField);
    });

    expect(
      await screen.queryByText(
        /Password must include at least 1 special character./i
      )
    ).toBeInTheDocument();

    await act(async () => {
      fireEvent.input(passwordField, {
        target: { value: "Hello@he1" },
      });
      fireEvent.blur(passwordField);
    });

    expect(
      await screen.queryByText(
        /Password must include at least 1 special character./i
      )
    ).toBeNull();
  });

  test("form submission fails without reCAPTCHA", async () => {
    render(<Register />);
    await act(async () => {
      fireEvent.input(screen.getByLabelText(/name/i), {
        target: { value: "Test User" },
      });
      fireEvent.input(screen.getByLabelText(/email/i), {
        target: { value: "test@example.com" },
      });
      fireEvent.input(screen.getByTestId("password"), {
        target: { value: "password" },
      });
      fireEvent.input(screen.getByLabelText(/confirm password/i), {
        target: { value: "password" },
      });
    });

    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: /sign up/i }));
    });

    expect(
      await screen.findByText(/ReCAPTCHA is required/i)
    ).toBeInTheDocument();
  });

  test("form submission succeeds with reCAPTCHA", async () => {
    render(<Register />);
    await act(async () => {
      fireEvent.input(screen.getByLabelText(/name/i), {
        target: { value: "Test User" },
      });
      fireEvent.input(screen.getByLabelText(/email/i), {
        target: { value: "test@example.com" },
      });
      fireEvent.input(screen.getByTestId("password"), {
        target: { value: "Password@123" },
      });
      fireEvent.input(screen.getByLabelText(/confirm password/i), {
        target: { value: "Password@123" },
      });
    });

    // Simulate reCAPTCHA completion
    fireEvent.click(screen.getByTestId("recaptcha"));

    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: /sign up/i }));
    });

    // Ensure no validation errors are shown
    expect(
      screen.queryByText(/Name must be at least 2 characters/i)
    ).toBeNull();
    expect(screen.queryByText(/Email is required/i)).toBeNull();
    expect(screen.queryByText(/^Password is required/i)).toBeNull();
    expect(screen.queryByText(/Confirm Password is required/i)).toBeNull();
    expect(screen.queryByText(/ReCAPTCHA is required/i)).toBeNull();

    // Ensure form data is logged correctly
    expect(console.log).toHaveBeenCalledWith("Form data", {
      name: "Test User",
      email: "test@example.com",
      password: "Password@123",
      "confirm-password": "Password@123",
      recaptcha: "mock-recaptcha-token",
    });
  });

  // New test case: form submission with invalid CAPTCHA
  test("form submission fails with invalid CAPTCHA", async () => {
    // Change the mock to return false for this specific test
    const { getCaptchaValidity } = require("@/server-actions/recaptcha");
    getCaptchaValidity.mockResolvedValueOnce(false);

    render(<Register />);
    await act(async () => {
      fireEvent.input(screen.getByLabelText(/name/i), {
        target: { value: "Test User" },
      });
      fireEvent.input(screen.getByLabelText(/email/i), {
        target: { value: "test@example.com" },
      });
      fireEvent.input(screen.getByTestId("password"), {
        target: { value: "Password@123" },
      });
      fireEvent.input(screen.getByLabelText(/confirm password/i), {
        target: { value: "Password@123" },
      });
    });

    // Simulate reCAPTCHA completion
    fireEvent.click(screen.getByTestId("recaptcha"));

    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: /sign up/i }));
    });

    // Check for captcha error alert
    expect(screen.getByText(/Error with captcha/i)).toBeInTheDocument();
  });
});

// Mock console.log to suppress output during tests
beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});
