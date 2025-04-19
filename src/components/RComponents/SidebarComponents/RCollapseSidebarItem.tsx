import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { SidebarItemProps } from "@/types/index.type";
import { renderSidebarItem } from "@/components/RComponents/SidebarComponents/renderSidebarItem";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { t } from "i18next";
const RCollapseSidebarItem = ({
  items,
  title,
  Icon,
  path,
  childPaths,
}: SidebarItemProps) => {
  const pathname = usePathname();
  console.log(pathname.split("/"));
  let childPathActive =
    childPaths?.some((childPath) => pathname.split("/").includes(childPath)) ??
    false;
  React.useEffect(() => {
    childPathActive =
      // eslint-disable-next-line react-hooks/exhaustive-deps
      childPaths?.some((childPath) => pathname.split("/").includes(childPath)) ??
      false;
    setIsActive(childPathActive);
  }, [pathname]);

  const [isActive, setIsActive] = useState<boolean>(childPathActive);
  const router = useRouter();
  return (
    <AccordionItem
      id="accordion item"
      key={title}
      value={title}
      hasBorder={false}
    >
      <SidebarMenuItem>
        <AccordionTrigger
          id="trigger"
          className={`p-0 ltr:pr-2 rtl:pl-2 font-normal hover:no-underline hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}
        >
          {path ? (
            <SidebarMenuButton
              className="cursor-pointer"
              isActive={isActive}
              onClick={() => router.push(path)}
            >
              {Icon && <Icon />}
              <span>{t(title)}</span>
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton className="cursor-pointer" isActive={isActive}>
              {Icon && <Icon />}
              <span>{t(title)}</span>
            </SidebarMenuButton>
          )}
        </AccordionTrigger>
        <AccordionContent className="pb-0" containerClassName="p-1">
          {items?.map((item) => {
            return renderSidebarItem(item);
          })}
        </AccordionContent>
      </SidebarMenuItem>
    </AccordionItem>
  );
};

export default RCollapseSidebarItem;
