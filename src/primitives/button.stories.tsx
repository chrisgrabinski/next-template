import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Click me",
  },
  render: ({ asChild, children, ...props }) => {
    if (asChild) {
      return (
        <Button asChild {...props}>
          <a href="https://chrisgrabinski.com">{children}</a>
        </Button>
      );
    }

    return <Button {...props}>{children}</Button>;
  },
};
