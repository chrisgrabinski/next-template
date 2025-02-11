import { render, screen } from '@testing-library/react'
import { Button } from './button'
import { ComponentProps } from 'react';

const mockOnClick = jest.fn();

const renderComponent = ({ children = "Click me", onClick = mockOnClick, ...props}: ComponentProps<typeof Button> = {}) => {
  return render(<Button onClick={onClick} {...props}>{children}</Button>)
}

describe('Button', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('renders default state', () => {
    renderComponent();

    const buttonElement = screen.getByRole('button', { name: 'Click me' })

    expect(buttonElement).toHaveAttribute('type', 'button');

    expect(buttonElement).not.toHaveAttribute('disabled');
    expect(buttonElement).not.toHaveAttribute('aria-busy');

    buttonElement.click();

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  })

  it('renders loading state', () => {
    renderComponent({ loading: true })

    const buttonElement = screen.getByRole('button', { name: 'Click me' })

    expect(buttonElement).toHaveAttribute('aria-busy', 'true');

    buttonElement.click();

    expect(mockOnClick).not.toHaveBeenCalled();
  })

  it('renders disabled state', () => {
    renderComponent({ disabled: true })

    const buttonElement = screen.getByRole('button', { name: 'Click me' })

    expect(buttonElement).not.toHaveAttribute('disabled');
    expect(buttonElement).toHaveAttribute('aria-disabled', 'true');

    buttonElement.click();

    expect(mockOnClick).not.toHaveBeenCalled();
  })
  
  it('renders asChild', () => {
    renderComponent({
      asChild: true,
      // eslint-disable-next-line @next/next/no-html-link-for-pages
      children: <a href="/">Click me</a>
    })

    const buttonElement = screen.getByRole('link', { name: 'Click me' })

    expect(buttonElement).not.toHaveAttribute('type', 'button');
    expect(buttonElement).toHaveAttribute('href', '/');

    buttonElement.click();

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  })
})