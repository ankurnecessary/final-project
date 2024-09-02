import type { Meta, StoryObj } from "@storybook/react";
import ErrorAlert from "./error-alert";
import { within, expect } from "@storybook/test";

const meta: Meta<typeof ErrorAlert> = {
  title: "Component/Custom-UI/ErrorAlert", // Each slash will create another level in the left menu
  component: ErrorAlert, // Component
  tags: ["autodocs"], // Automatically create a document for all the stories of the button
  parameters: {
    layout: "centered", // Automatically center the button
  },
  argTypes: {
    // Adding textbox for setting custom description
    description: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    description: "There is an error in the application",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ErrorAlert Component renders without crashing
    await expect(canvas.getByText("Error alert")).toBeInTheDocument();
    await expect(
      canvas.getByText("There is an error in the application")
    ).toBeInTheDocument();

    // ErrorAlert Component renders the correct variant class
    const alert = canvas.getByRole("alert");
    expect(alert).toHaveClass("text-destructive");
  },
};
