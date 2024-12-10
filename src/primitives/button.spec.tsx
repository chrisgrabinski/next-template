import { expect, test } from "@playwright/experimental-ct-react";

import { Button } from "./button";

test("default state", async ({ mount }) => {
  let clicked = false;

  const handleClick = () => {
    clicked = true;
  };

  const component = await mount(
    <Button data-testid="button-test-id" onClick={handleClick}>
      Click me
    </Button>,
  );

  // Default component behavior
  await expect(component).toContainText("Click me");
  await expect(component).toHaveAttribute("data-testid", "button-test-id");

  // Applies state attribute
  await expect(component).toHaveAttribute("data-state", "idle");

  // Applies default type attribute
  await expect(component).toHaveAttribute("type", "button");

  // Performs action on click
  await component.click();
  expect(clicked).toBe(true);
});

test("disabled state", async ({ mount }) => {
  let clicked = false;

  const handleClick = () => {
    clicked = true;
  };

  const component = await mount(
    <Button onClick={handleClick} disabled>
      Click me
    </Button>,
  );

  // Applies state attribute
  await expect(component).toHaveAttribute("data-state", "disabled");

  // Accessibility: Does not apply disabled attribute to allow button to be focused
  await expect(component).not.toHaveAttribute("disabled");

  // Accessibility: Applies aria attribute
  await expect(component).toHaveAttribute("aria-disabled", "true");

  // Does not perform action on click
  await component.click({ force: true });
  expect(clicked).toBe(false);
});

test("loading state", async ({ mount }) => {
  let clicked = false;

  const handleClick = () => {
    clicked = true;
  };

  const component = await mount(
    <Button onClick={handleClick} loading>
      Click me
    </Button>,
  );

  // Applies state attribute
  await expect(component).toHaveAttribute("data-state", "loading");

  // Accessibility:Applies aria attribute
  await expect(component).toHaveAttribute("aria-loading", "true");

  // Does not perform action on click
  await component.click();
  expect(clicked).toBe(false);
});

test("should render as child", async ({ mount }) => {
  const component = await mount(
    <Button asChild>
      <a href="/">Click me</a>
    </Button>,
  );
  await expect(component).toHaveRole("link");

  // Should not use default type attribute when rendering as child
  await expect(component).not.toHaveAttribute("type");
});
