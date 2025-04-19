import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import RDropdown from "@/components/RComponents/RDropDown";
import { SidebarItemProps } from "@/types/index.type";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
const RNormalSidebarItem = ({
  Icon,
  title,
  path,
  actions,
}: SidebarItemProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { t } = useTranslation();
  return (
    <SidebarMenuItem key={title}>
      {path ? (
        <Link
          href={path}
          className="cursor-pointer"
        >
          <SidebarMenuButton className="cursor-pointer" isActive={isActive}>
            {Icon && <Icon />}
            <span>{t(title)}</span>
          </SidebarMenuButton>
        </Link>
      ) : (
        <SidebarMenuButton className="cursor-pointer" isActive={isActive}>
          {Icon && <Icon />}
          <span>{t(title)}</span>
        </SidebarMenuButton>
      )}
      {actions?.length && (
        <RDropdown
          triggerComponent={
            <SidebarMenuAction showOnHover>
              <MoreHorizontal />
              <span className="sr-only">More</span>
            </SidebarMenuAction>
          }
          actions={actions}
        />
      )}
    </SidebarMenuItem>
  );
};

export default RNormalSidebarItem;
