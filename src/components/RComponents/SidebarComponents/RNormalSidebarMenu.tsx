import { SidebarMenu } from "@/components/ui/sidebar";
import { SidebarMenuProps } from "@/types/index.type";
import { renderSidebarItem } from "@/components/RComponents/SidebarComponents/renderSidebarItem";

const RNormalSidebarMenu = ({ items }: SidebarMenuProps) => {
  return (
    <SidebarMenu>{items.map((item) => renderSidebarItem(item))}</SidebarMenu>
  );
};

export default RNormalSidebarMenu;
