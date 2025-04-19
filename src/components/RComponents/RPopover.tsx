import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { RPopoverProps } from "@/types/index.type";

const RPopover = ({
  triggerComponent,
  triggerClassName,
  contentComponent,
  contentClassName,
  isOpen,
  onOpenChange,
}: RPopoverProps) => {
  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger
        className={cn("cursor-pointer", triggerClassName)}
        asChild
      >
        {triggerComponent ? (
          triggerComponent
        ) : (
          <Button variant="outline">Open popover</Button>
        )}
      </PopoverTrigger>
      <PopoverContent className={contentClassName}>
        {contentComponent}
      </PopoverContent>
    </Popover>
  );
};

export default RPopover;
