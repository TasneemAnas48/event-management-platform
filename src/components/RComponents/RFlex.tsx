import React, { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RFlexProps extends React.HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  ref?: React.Ref<HTMLElement>;
}

const RFlex = React.forwardRef<HTMLElement, RFlexProps>(
  ({ children, className, style, ...props }, ref) => {
    return (
      <section
        className={cn(`flex gap-[10px]`, className)}
        style={{
          ...style,
        }}
        ref={ref}
        {...props}
      >
        {children}
      </section>
    );
  }
);

RFlex.displayName = "RFlex";

export default RFlex;
