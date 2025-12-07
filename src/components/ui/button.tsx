import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-2 border-black uppercase tracking-wider font-bold",
  {
    variants: {
      variant: {
        default: "bg-gold text-black shadow-heavy hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-subtle active:translate-x-0.5 active:translate-y-0.5",
        destructive: "bg-pink text-white shadow-heavy hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-subtle active:translate-x-0.5 active:translate-y-0.5",
        outline: "border-gold bg-transparent text-gold shadow-medium hover:bg-gold hover:text-black hover:shadow-heavy hover:-translate-x-0.5 hover:-translate-y-0.5",
        secondary: "bg-obsidian text-white border-gold shadow-heavy hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5",
        ghost: "hover:bg-gold/20 hover:text-gold border-transparent shadow-none",
        link: "text-gold underline-offset-4 hover:underline border-transparent shadow-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
