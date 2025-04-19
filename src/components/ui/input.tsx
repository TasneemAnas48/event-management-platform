import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode; // Icon to display
  iconPosition?: "left" | "right"; // Position of the icon (default: "left")
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, iconPosition = "left", ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full h-[40px] rounded-md border border-gray-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            icon && iconPosition === "left" && "pl-10", // Add left padding if icon is on the left
            icon && iconPosition === "right" && "pr-10", // Add right padding if icon is on the right
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <div
            className={cn(
              "absolute inset-y-0 flex items-center",
              iconPosition === "left" ? "left-0 pl-3" : "right-0 pr-3" // Position the icon based on the prop
            )}
          >
            {icon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
