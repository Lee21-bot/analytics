import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:transform hover:-translate-y-0.5 shadow-md hover:shadow-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:transform hover:-translate-y-0.5 shadow-md hover:shadow-lg",
        outline: "border border-input bg-background hover:bg-accent hover:transform hover:-translate-y-0.5 text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:transform hover:-translate-y-0.5",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-green-600 text-white hover:bg-green-700 hover:transform hover:-translate-y-0.5 shadow-md hover:shadow-lg",
        warning: "bg-yellow-600 text-white hover:bg-yellow-700 hover:transform hover:-translate-y-0.5 shadow-md hover:shadow-lg",
        slider: "relative overflow-hidden bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 hover:scale-105 group",
        "slider-outline": "relative overflow-hidden border-2 border-blue-600 text-blue-600 font-semibold bg-transparent hover:text-white transition-all duration-300 hover:transform hover:-translate-y-1 hover:scale-105 group",
        "slider-premium": "relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 hover:scale-105 group",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const isSliderVariant = variant === "slider" || variant === "slider-outline" || variant === "slider-premium"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {!asChild && isSliderVariant && (
          <>
            {/* Sliding background effect */}
            {variant === "slider" && (
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
            )}
            {variant === "slider-outline" && (
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            )}
            {variant === "slider-premium" && (
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
            )}
            {/* Simple shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-15 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-600" />
          </>
        )}
        {!asChild ? (
          <span className="relative z-10 flex items-center justify-center">
            {loading ? (
              <>
                <svg
                  className="mr-2 h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </>
            ) : (
              children
            )}
          </span>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants } 