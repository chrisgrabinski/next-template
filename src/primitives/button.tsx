"use client";

import { Slot } from "@radix-ui/react-slot";
import { ButtonHTMLAttributes, MouseEventHandler, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { asChild, disabled = false, loading = false, onClick, type, ...props },
    ref,
  ) => {
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
        ref={ref}
        type={type || defaultButtonType}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
