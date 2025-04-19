import { SidebarMenuSub } from "@/components/ui/sidebar";
import { SidebarSubMenuProps } from "@/types/index.type";
import { renderSidebarItem } from "@/components/RComponents/SidebarComponents/renderSidebarItem";

const RSubMenuSidebar = ({ items }: SidebarSubMenuProps) => {
  return (
    <SidebarMenuSub>
      {items?.map((item) => renderSidebarItem(item))}
    </SidebarMenuSub>
  );
};

export default RSubMenuSidebar;
