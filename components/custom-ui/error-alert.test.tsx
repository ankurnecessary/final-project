// ErrorAlert.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import ErrorAlert from "./error-alert";

describe("ErrorAlert Component", () => {
  test("renders without crashing", () => {
    render(<ErrorAlert heading="Error Heading" description="Error description" />);
    
    // Check if the component renders the heading and description
    expect(screen.getByText("Error Heading")).toBeInTheDocument();
    expect(screen.getByText("Error description")).toBeInTheDocument();
  });

  test("renders the correct variant class", () => {
    render(<ErrorAlert heading="Error Heading" description="Error description" />);
    
    // Check if the Alert component has the correct variant class
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("text-destructive");
  });

  test("renders heading and description correctly", () => {
    render(<ErrorAlert heading="Network Error" description="Unable to connect to server." />);
    
    // Check if the heading and description are rendered correctly
    expect(screen.getByText("Network Error")).toBeInTheDocument();
    expect(screen.getByText("Unable to connect to server.")).toBeInTheDocument();
  });

  test("renders correctly with different props", () => {
    const { rerender } = render(<ErrorAlert heading="Error 1" description="Description 1" />);
    
    // Initial render
    expect(screen.getByText("Error 1")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    
    // Rerender with new props
    rerender(<ErrorAlert heading="Error 2" description="Description 2" />);
    
    expect(screen.getByText("Error 2")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();
  });
});
