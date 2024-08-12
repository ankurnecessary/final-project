import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const meta: Meta<typeof Alert> = {
  title: "Component/UI/Alert", // Each slash will create another level in the left menu
  component: Alert, // Component
  tags: ["autodocs"], // Automatically create a document for all the stories of the button
  parameters: {
    layout: "centered", // Automatically center the button
  },
  argTypes: {
    // Adding dropdown for variants
    variant: {
      control: "select",
      description: "Alert variants",
      options: ["default", "destructive"],
    },
    className: {
      control: "text",
      description: "Custom tailwind CSS classes to apply to the button",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    className: "shadow-lg",
  },

  render: (args) => (
    <Alert variant={args.variant} className={args.className}>
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Lorem ipsum dolor sit</AlertTitle>
      <AlertDescription>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad harum
        expedita quo minus repellendus, quam accusantium! Deleniti fugiat
        reprehenderit facilis culpa accusantium praesentium debitis ipsam natus
        repudiandae autem. Non, dolor.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    className: "shadow-lg",
  },

  render: (args) => (
    <Alert variant={args.variant} className={args.className}>
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Lorem ipsum dolor sit</AlertTitle>
      <AlertDescription>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad harum
        expedita quo minus repellendus, quam accusantium! Deleniti fugiat
        reprehenderit facilis culpa accusantium praesentium debitis ipsam natus
        repudiandae autem. Non, dolor.
      </AlertDescription>
    </Alert>
  ),
};
