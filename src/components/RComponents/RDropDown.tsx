import React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RDropdownProps } from "@/types/index.type";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/useMobile";

const RDropdown: React.FC<RDropdownProps> = ({
  triggerComponent = null,
  label = null,
  actions = [],
  onPointerDownHandler,
  itemClassName,
  contentClassName,
  align,
  side,
}) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        onPointerDown={(e) => {
          onPointerDownHandler && onPointerDownHandler(e);
        }}
        className="cursor-pointer"
      >
        {triggerComponent ? (
          triggerComponent
        ) : (
          <Button variant="ghost" className="h-fit w-fit p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="!size-6" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={side ? side : isMobile ? "bottom" : "right"}
        align={align ? align : isMobile ? "end" : "start"}
        className={cn("w-48 rounded-[6px]", contentClassName)}
      >
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}

        {actions.map((action, index) => (
          <React.Fragment key={index}>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                action.onClick && action.onClick();
              }}
              className={itemClassName + " cursor-pointer"}
            >
              {action.component ? (
                action.component
              ) : (
                <>
                  {action.Icon && !action.iconOnRight && (
                    <action.Icon className={action.actionIconClass} />
                  )}
                  <span className={`${action.actionTextClass} cursor-pointer`}>
                    {t(action.name)}
                  </span>
                  {action.Icon && action.iconOnRight && (
                    <action.Icon className={action.actionIconClass} />
                  )}
                </>
              )}
            </DropdownMenuItem>
            {action.addSeparator && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RDropdown;
