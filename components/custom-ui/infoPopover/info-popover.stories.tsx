import type { Meta, StoryObj } from "@storybook/react";
import InfoPopover from "./info-popover";
import PasswordInfo from "@/components/register/passwordInfo";
import { within, expect, userEvent } from "@storybook/test";

// TODO: Add jest test cases
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
    },
    label: {
      control: "text",
      description: "Accessibility label",
    },
    contentOffset: {
      control: "number",
      description: "Additional offset from the trigger element",
    }
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <InfoPopover label={args.label} contentOffset={args.contentOffset}>
      {args.children}
    </InfoPopover>
  ),
  args: {
    children: <PasswordInfo />,
    label: "Password information",
    contentOffset: -8,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // InfoPopover Component renders without crashing
    await expect(canvas.getByText(args.label)).toBeInTheDocument();

    const button = canvas.getByRole('button', { name: args.label });
    await userEvent.click(button);
    await expect(canvas.getByTestId('info-popover-content')).toBeInTheDocument();
  },
};
