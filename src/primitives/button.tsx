"use client";

import { Slot } from "@radix-ui/react-slot";
import { ComponentProps, MouseEventHandler } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = ({
  asChild,
  disabled = false,
  loading = false,
  onClick,
  type,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot : "button";

  const defaultButtonType = !asChild ? "button" : undefined;

  const isNonInteractive = disabled || loading;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (isNonInteractive) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
  };

  return (
    <Component
      aria-busy={loading || undefined}
      aria-disabled={disabled || undefined}
      onClick={handleClick}
      type={type || defaultButtonType}
      {...props}
    />
  );
};

export { Button };
export type { ButtonProps };
