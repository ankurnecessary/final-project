import React from 'react';
import '@testing-library/jest-dom';
import { useSearchParams } from 'next/navigation';
import { render, screen } from '@testing-library/react';
import SocialAuthErrorAlert from '.';

// Mock the useSearchParams hook
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

describe('Login Component', () => {
  test('displays an error alert when authError query parameter is present', () => {
    // Mock useSearchParams to return 'authError' for the 'error' query parameter
    const mockUseSearchParams = useSearchParams as jest.Mock;
    mockUseSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue('authError'),
    });

    render(<SocialAuthErrorAlert />);

    // Check if the error alert is displayed
    const errorAlert = screen.getByText(
      /We couldn’t sign you in. Please try again./i,
    );
    expect(errorAlert).toBeInTheDocument();
  });

  test('does not display an error alert when authError query parameter is absent', () => {
    // Mock useSearchParams to return null (no 'error' query parameter)
    const mockUseSearchParams = useSearchParams as jest.Mock;
    mockUseSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });

    render(<SocialAuthErrorAlert />);

    // Check if the error alert is not displayed
    const errorAlert = screen.queryByText(
      /We couldn’t sign you in. Please try again./i,
    );
    expect(errorAlert).not.toBeInTheDocument();
  });
});
