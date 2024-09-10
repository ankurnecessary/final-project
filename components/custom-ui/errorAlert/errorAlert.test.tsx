import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorAlert from '.';

describe('ErrorAlert Component', () => {
  test('renders without crashing', () => {
    render(<ErrorAlert description="Error description" />);

    // Check if the component renders the description
    expect(screen.getByText('Error description')).toBeInTheDocument();
  });

  test('renders the correct variant class', () => {
    render(<ErrorAlert description="Error description" />);

    // Check if the Alert component has the correct variant class
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('text-destructive');
  });

  test('renders description correctly', () => {
    render(<ErrorAlert description="Unable to connect to server." />);

    // Check if the description is rendered correctly
    expect(
      screen.getByText('Unable to connect to server.'),
    ).toBeInTheDocument();
  });

  test('renders correctly with different props - Dynamically', () => {
    const { rerender } = render(<ErrorAlert description="Description 1" />);

    // Initial render
    expect(screen.getByText('Description 1')).toBeInTheDocument();

    // Rerender with new props
    rerender(<ErrorAlert description="Description 2" />);

    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });
});
