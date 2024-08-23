import type { Meta, StoryObj } from "@storybook/react";
import InfoPopover from "./info-popover";
import PasswordInfo from "@/components/register/passwordInfo";

const meta: Meta<typeof InfoPopover> = {
  title: "Component/Custom-UI/InfoPopover", // Each slash will create another level in the left menu
  component: InfoPopover, // Component
  tags: ["autodocs"], // Automatically create a document for all the stories of the button
  parameters: {
    layout: "centered", // Automatically center the button
  },
  argTypes: {
    children: {
      control: "text",
      description: "Content to be displayed in the popover",
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <PasswordInfo />,
  }
};