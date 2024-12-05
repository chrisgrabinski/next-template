"use client";

import { Slot } from "@radix-ui/react-slot";
import { ButtonHTMLAttributes, MouseEventHandler, forwardRef } from "react";

const getButtonState = ({
  disabled,
  loading,
}: {
  disabled?: boolean;
  loading?: boolean;
}) => {
  if (loading) return "loading";
  if (disabled) return "disabled";
  return "idle";
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, disabled, loading, onClick, type = "button", ...props }, ref) => {
    const Component = asChild ? Slot : "button";

    const isDisabled = disabled || loading;

    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }

      onClick?.(event);
    };

    return (
      <Component
        aria-disabled={isDisabled}
        data-state={getButtonState({ disabled, loading })}
        onClick={handleClick}
        ref={ref}
        type={type}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
