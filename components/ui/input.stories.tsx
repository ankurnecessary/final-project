import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";
import { Formik, Form } from "formik";

const meta: Meta<typeof Input> = {
  title: "Component/UI/Formik/Input", // Each slash will create another level in the left menu
  component: Input, // Component
  tags: ["autodocs"], // Automatically create a document for all the stories of the button
  parameters: {
    layout: "centered", // Automatically center the button
  },
  argTypes: {
    // Adding <Input/> type
    type: {
      control: "select",
      description: "Input type",
      options: [
        "text",
        "search",
        "number",
        "password",
        "date",
        "month",
        "email",
        "file",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  render: (args) => (
    <Formik
      initialValues={{ inputField_text: "" }}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <Input name="inputField_text" {...args} />
      </Form>
    </Formik>
  ),
  args: {
    type: "text",
    className: "shadow-lg",
  },
};

export const Search: Story = {
  render: (args) => (
    <Formik
      initialValues={{ inputField_search: "" }}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <Input name="inputField_search" {...args} />
      </Form>
    </Formik>
  ),
  args: {
    type: "search",
    className: "shadow-lg",
  },
};

export const Number: Story = {
  render: (args) => (
    <Formik
      initialValues={{ inputField_number: "" }}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <Input name="inputField_number" {...args} />
      </Form>
    </Formik>
  ),
  args: {
    type: "number",
    className: "shadow-lg",
  },
};

export const Password: Story = {
  render: (args) => (
    <Formik
      initialValues={{ inputField_password: "" }}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <Input name="inputField_password" {...args} />
      </Form>
    </Formik>
  ),
  args: {
    type: "password",
    className: "shadow-lg",
  },
};

export const Date: Story = {
  render: (args) => (
    <Formik
      initialValues={{ inputField_date: "" }}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <Input name="inputField_date" {...args} />
      </Form>
    </Formik>
  ),
  args: {
    type: "date",
    className: "shadow-lg",
  },
};

export const Month: Story = {
  render: (args) => (
    <Formik
      initialValues={{ inputField_month: "" }}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <Input name="inputField_month" {...args} />
      </Form>
    </Formik>
  ),
  args: {
    type: "month",
    className: "shadow-lg",
  },
};

export const Email: Story = {
  render: (args) => (
    <Formik
      initialValues={{ inputField_email: "" }}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <Input name="inputField_email" {...args} />
      </Form>
    </Formik>
  ),
  args: {
    type: "email",
    className: "shadow-lg",
  },
};

export const File: Story = {
  render: (args) => (
    <Formik
      initialValues={{ inputField_file: "" }}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <Input name="inputField_file" {...args} />
      </Form>
    </Formik>
  ),
  args: {
    type: "file",
    className: "shadow-lg",
  },
};
