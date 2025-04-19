import React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckActionItem, RCheckDropdownProps } from "@/types/index.type";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/useMobile";

const RCheckDropdown: React.FC<RCheckDropdownProps> = ({
  triggerComponent = null,
  label = null,
  actions = {},
  setActions,
  multiFilter = false,
  contentClassName,
  itemClassName,
  KeepActiveItemChecked,
  align,
  side,
  closeOnSelect = true,
  additionalComponent,
}) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        {triggerComponent ? (
          triggerComponent
        ) : (
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={side ? side : isMobile ? "bottom" : "right"}
        align={align ? align : isMobile ? "end" : "start"}
        className={cn("w-24 rounded-lg", contentClassName)}
      >
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
        {Object.keys(actions).map((key, index) => {
          const Icon = actions[key].Icon;
          return (
            <React.Fragment key={index}>
              <DropdownMenuCheckboxItem
                className={"cursor-pointer " + itemClassName}
                checked={actions[key].checked}
                onSelect={(event) => {
                  closeOnSelect ? "" : event.preventDefault();
                }}
                onCheckedChange={(checked) => {
                  // Pass the `checked` state and `id` to the `onCheckedChange` function
                  actions[key].onCheckedChange(checked, actions[key].id);

                  if (setActions) {
                    if (multiFilter) {
                      setActions((oldActions: any) => ({
                        ...oldActions,
                        [key]: {
                          ...oldActions[key],
                          checked: !oldActions[key].checked,
                        },
                      }));
                    } else {
                      setActions((oldActions: any) => {
                        const newState: { [key: string]: CheckActionItem } = {};
                        Object.keys(oldActions).forEach((innerKey) => {
                          newState[innerKey] = {
                            ...oldActions[innerKey],
                            checked:
                              innerKey === key
                                ? KeepActiveItemChecked
                                  ? true
                                  : !oldActions[innerKey].checked
                                : false,
                          };
                        });
                        return newState;
                      });
                    }
                  }
                }}
              >
                {actions[key].component ? (
                  actions[key].component
                ) : (
                  <>
                    {Icon && !actions[key].iconOnRight && (
                      <Icon className={actions[key].actionIconClass} />
                    )}
                    <span className={actions[key].actionTextClass}>
                      {t(actions[key].name)}
                    </span>
                    {Icon && actions[key].iconOnRight && (
                      <Icon className={actions[key].actionIconClass} />
                    )}
                  </>
                )}
              </DropdownMenuCheckboxItem>
              {actions[key].addSeparator && <DropdownMenuSeparator />}
            </React.Fragment>
          );
        })}
        {additionalComponent && additionalComponent}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RCheckDropdown;