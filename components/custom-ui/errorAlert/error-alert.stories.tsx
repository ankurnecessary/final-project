import type { Meta, StoryObj } from "@storybook/react";
import ErrorAlert from "./error-alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const meta: Meta<typeof ErrorAlert> = {
  title: "Component/Custom-UI/ErrorAlert", // Each slash will create another level in the left menu
  component: ErrorAlert, // Component
  tags: ["autodocs"], // Automatically create a document for all the stories of the button
  parameters: {
    layout: "centered", // Automatically center the button
  },
  argTypes: {
    // Adding textbox for setting custom heading
    heading: {
      control: "text",
    },
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
    heading: "Error alert",
    description: "There is an error in the application",
  }
};