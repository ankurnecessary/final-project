import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Button } from "./button";
import { action } from "@storybook/addon-actions";

const meta: Meta = {
  title: "Component/UI/Popover",
  component: Popover,
  // Subcomponent's tabs are empty because of https://storybook.js.org/docs/writing-stories/stories-for-multiple-components
  subcomponents: {
    PopoverTrigger: PopoverTrigger as React.ComponentType<any>,
    PopoverContent: PopoverContent as React.ComponentType<any>,
  },
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    defaultOpen: {
      control: "boolean",
      description:
        "The open state of the popover when it is initially rendered. Use when you do not need to control its open state.",
      defaultValue: false,
    },
    modal: {
      control: "boolean",
      description:
        "The modality of the popover. When set to true, interaction with outside elements will be disabled and only popover content will be visible to screen readers.",
      defaultValue: false,
    },
    onOpenChange:{
      description: "Event handler called when the open state of the popover changes."
    }
  },
  args: { onOpenChange: fn() },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button>Click me</Button>
      </PopoverTrigger>
      <PopoverContent side="top" align="center">
        <ul className="flex flex-col font-normal gap-y-1 text-xs">
          <li>At least 8 characters</li>
          <li>At least 1 upper case letter.</li>
          <li>At least 1 lower case letter.</li>
          <li>At least 1 number.</li>
          <li>At least 1 special character.</li>
        </ul>
      </PopoverContent>
    </Popover>
  ),
  args: {
    defaultOpen: false,
    onOpenChange: action("Default button click"),
    modal: false
  },
};

export const Open: Story = {
  args: {
    defaultOpen: true,
    modal: false
  },

  render: args => (<Popover {...args}>
    <PopoverTrigger asChild>
      <Button>Click me</Button>
    </PopoverTrigger>
    <PopoverContent side="top" align="center">
      <ul className="flex flex-col font-normal gap-y-1 text-xs">
        <li>At least 8 characters</li>
        <li>At least 1 upper case letter.</li>
        <li>At least 1 lower case letter.</li>
        <li>At least 1 number.</li>
        <li>At least 1 special character.</li>
      </ul>
    </PopoverContent>
  </Popover>)
};
