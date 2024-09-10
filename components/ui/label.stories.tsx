import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';

const meta: Meta<typeof Label> = {
  title: 'Component/UI/Label', // Each slash will create another level in the left menu
  component: Label, // Component
  tags: ['autodocs'], // Automatically create a document for all the stories of the button
  parameters: {
    layout: 'centered', // Automatically center the button
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Email',
    htmlFor: 'email',
  },
};
