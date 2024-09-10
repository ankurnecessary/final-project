import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, waitFor, screen } from '@storybook/test';

import Register from '.';

const meta = {
  title: 'Component/Register',
  component: Register,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Register>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const signupButton = canvas.getByRole('button', { name: /^Sign up$/i });
    await expect(signupButton).toBeInTheDocument();

    // 👇 Simulate interactions with the signup button
    await userEvent.click(signupButton);

    // 👇 Assert Name validation message
    await waitFor(() =>
      expect(screen.queryByText('Name is required')).toBeInTheDocument(),
    );

    // 👇 Assert Email validation message
    await waitFor(() =>
      expect(screen.queryByText('Email is required')).toBeInTheDocument(),
    );

    // 👇 Assert Password validation message
    await waitFor(() =>
      expect(screen.queryByText('Password is required')).toBeInTheDocument(),
    );

    // 👇 Assert Confirm Password validation message
    await waitFor(() =>
      expect(
        screen.queryByText('Confirm Password is required'),
      ).toBeInTheDocument(),
    );

    // 👇 Assert ReCAPTCHA validation message
    await waitFor(() =>
      expect(screen.queryByText('ReCAPTCHA is required')).toBeInTheDocument(),
    );

    // 👇 Simulate interaction with the Name field
    await userEvent.type(canvas.getByTestId('name'), 'Hello');

    // 👇 Assert Name validation message not there
    await waitFor(() =>
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument(),
    );

    // 👇 Simulate interaction with the email field
    await userEvent.type(canvas.getByTestId('email'), 'emailprovider.com');

    // 👇 Assert Invalid Email validation message
    await waitFor(() =>
      expect(screen.queryByText('Invalid email address')).toBeInTheDocument(),
    );

    // 👇 Simulate interactions with the email field
    await userEvent.clear(canvas.getByTestId('email'));
    await userEvent.type(canvas.getByTestId('email'), 'email@provider.com');

    // 👇 Assert Email validation message not there
    await waitFor(() =>
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument(),
    );

    // 👇 Simulate interaction with the password field
    await userEvent.clear(canvas.getByTestId('password'));
    await userEvent.type(canvas.getByTestId('password'), 'h');

    // 👇 Assert Password validation message not there
    await waitFor(() =>
      expect(screen.queryByText('At least 8 characters')).toBeInTheDocument(),
    );

    // 👇 Simulate interaction with the password field
    await userEvent.clear(canvas.getByTestId('password'));
    await userEvent.type(canvas.getByTestId('password'), 'hellohel');

    // 👇 Assert Password validation message not there
    await waitFor(() =>
      expect(
        screen.queryByText(
          'Password must include at least 1 upper case letter.',
        ),
      ).toBeInTheDocument(),
    );

    // 👇 Simulate interaction with the password field
    await userEvent.clear(canvas.getByTestId('password'));
    await userEvent.type(canvas.getByTestId('password'), 'Hellohel');

    // 👇 Assert Password validation message not there
    await waitFor(() =>
      expect(
        screen.queryByText('Password must include at least 1 number.'),
      ).toBeInTheDocument(),
    );

    // 👇 Simulate interaction with the password field
    await userEvent.clear(canvas.getByTestId('password'));
    await userEvent.type(canvas.getByTestId('password'), 'Hellohe1');

    // 👇 Assert Password validation message not there
    await waitFor(() =>
      expect(
        screen.queryByText(
          'Password must include at least 1 special character.',
        ),
      ).toBeInTheDocument(),
    );

    // 👇 Simulate interaction with the password field
    await userEvent.clear(canvas.getByTestId('password'));
    await userEvent.type(canvas.getByTestId('password'), 'Hello@he1');

    // 👇 Assert Password validation message not there
    await waitFor(() =>
      expect(
        screen.queryByText(
          'Password must include at least 1 special character.',
        ),
      ).not.toBeInTheDocument(),
    );

    // 👇 Simulate interaction with the Confirm Password field
    await userEvent.clear(canvas.getByTestId('confirm-password'));
    await userEvent.type(canvas.getByTestId('confirm-password'), 'Hello@he12');

    // 👇 Assert Confirm Password validation message not there
    await waitFor(() =>
      expect(screen.queryByText('Passwords must match')).toBeInTheDocument(),
    );

    // 👇 Simulate interactions with the Confirm Password field
    await userEvent.clear(canvas.getByTestId('confirm-password'));
    await userEvent.type(canvas.getByTestId('confirm-password'), 'Hello@he1');

    // 👇 Assert Confirm Password validation message not there
    await waitFor(() =>
      expect(
        screen.queryByText('Confirm Password is required'),
      ).not.toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(
        screen.queryByText('Passwords must match'),
      ).not.toBeInTheDocument(),
    );
  },
};
