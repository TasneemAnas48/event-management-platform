import { SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { SidebarGroupProps } from "@/types/index.type";
import { renderSidebarItem } from "@/components/RComponents/SidebarComponents/renderSidebarItem";
import { useTranslation } from "react-i18next";
const RSidebarGroup = ({ title, items, Icon }: SidebarGroupProps) => {
  const { t } = useTranslation();
  return (
    <SidebarGroup>
      {title && (
        <SidebarGroupLabel>
          {Icon && <Icon />}
          {title && t(title)}
        </SidebarGroupLabel>
      )}
      {items.map((item) => renderSidebarItem(item))}
    </SidebarGroup>
  );
};

export default RSidebarGroup;
