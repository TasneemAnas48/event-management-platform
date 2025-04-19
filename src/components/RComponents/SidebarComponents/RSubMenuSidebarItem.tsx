import {
  SidebarMenuButton,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { SidebarSubMenuItemProps } from "@/types/index.type";
import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
const RSubMenuSidebarItem = ({
  title,
  Icon,
  path,
}: SidebarSubMenuItemProps) => {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <SidebarMenuSubItem key={title}>
      {path ? (
        <Link
          href={path}
          className="cursor-pointer"
        >
          <SidebarMenuButton className="cursor-pointer" isActive={isActive}>
            {Icon && <Icon className="[&>svg]:!fill-current"/>}
            <span>{t(title)}</span>
          </SidebarMenuButton>
        </Link>
      ) : (
        <SidebarMenuSubButton className="cursor-pointer text-sidebar-foreground">
          {Icon && <Icon />}
          <span>{t(title)}</span>
        </SidebarMenuSubButton>
      )}
    </SidebarMenuSubItem>
  );
};

export default RSubMenuSidebarItem;
