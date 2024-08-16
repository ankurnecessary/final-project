import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, waitFor, screen } from '@storybook/test';

import Login from './login';

const meta = {
  title: 'Component/Login',
  component: Login,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Login>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole('button', { name: /^Sign in$/i });
    await expect(loginButton).toBeInTheDocument();

    // 👇 Simulate interactions with the login button
    await userEvent.click(loginButton);

    // 👇 Assert Email validation message
    await expect(
      canvas.getByText(
        'Email is required',
      ),
    ).toBeInTheDocument();

    // 👇 Assert Password validation message
    await expect(
      canvas.getByText(
        'Password is required',
      ),
    ).toBeInTheDocument();

    // 👇 Assert ReCAPTCHA  validation message
    await expect(
      canvas.getByText(
        'ReCAPTCHA is required',
      ),
    ).toBeInTheDocument();

    // 👇 Simulate interaction with the email field
    await userEvent.type(canvas.getByTestId('email'), 'emailprovider.com');

    // 👇 Assert Invalid Email validation message
    await expect(
      canvas.getByText(
        'Invalid email address',
      ),
    ).toBeInTheDocument();

    // 👇 Simulate interactions with the email field
    await userEvent.clear(canvas.getByTestId('email'));
    await userEvent.type(canvas.getByTestId('email'), 'email@provider.com');

    // 👇 Assert Email validation message not there
    await waitFor(() => expect(screen.queryByText('Email is required')).not.toBeInTheDocument());

    // 👇 Simulate interaction with the password field
    await userEvent.type(canvas.getByTestId('password'), '123456');

    // 👇 Assert Password validation message not there
    await waitFor(() => expect(screen.queryByText('Password is required')).not.toBeInTheDocument());

  },
};