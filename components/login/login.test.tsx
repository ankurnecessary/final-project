import React from "react";
import "@testing-library/jest-dom";
import { useSearchParams } from "next/navigation";
import { render, fireEvent, screen, act } from "@testing-library/react";
import Login from "./login";

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

// Mock the useSearchParams hook
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

describe("Login Component", () => {
  test("1.renders Login form", () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
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
    expect(
      await screen.findByText(/^Password is required/i)
    ).toBeInTheDocument();
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

    expect(
      await screen.findByText(/Invalid email address/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/^Password is required/i)
    ).toBeInTheDocument();
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

    expect(
      await screen.findByText(/ReCAPTCHA is required/i)
    ).toBeInTheDocument();
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

  test("6. form submission fails with invalid reCAPTCHA", async () => {
    // Mock getCaptchaValidity to return false
    const { getCaptchaValidity } = require("@/server-actions/recaptcha");
    getCaptchaValidity.mockResolvedValueOnce(false);

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

    // Check for captcha error message
    expect(
      screen.getByText(/Error with captcha. Please try again./i)
    ).toBeInTheDocument();

    // Verify that the recaptchaRef reset function was called
    const recaptchaMock = jest.requireMock("react-google-recaptcha").default;
    expect(recaptchaMock).toHaveBeenCalled();
  });

  test("displays an error alert when authError query parameter is present", () => {
    // Mock useSearchParams to return 'authError' for the 'error' query parameter
    const mockUseSearchParams = useSearchParams as jest.Mock;
    mockUseSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue("authError"),
    });

    render(<Login />);

    // Check if the error alert is displayed
    const errorAlert = screen.getByText(
      /We couldn’t sign you in. Please try again./i
    );
    expect(errorAlert).toBeInTheDocument();
  });

  test("does not display an error alert when authError query parameter is absent", () => {
    // Mock useSearchParams to return null (no 'error' query parameter)
    const mockUseSearchParams = useSearchParams as jest.Mock;
    mockUseSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });

    render(<Login />);

    // Check if the error alert is not displayed
    const errorAlert = screen.queryByText(
      /We couldn’t sign you in. Please try again./i
    );
    expect(errorAlert).not.toBeInTheDocument();
  });
});

// Mock console.log to suppress output during tests
beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});
