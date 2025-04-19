import { SidebarMenu } from "@/components/ui/sidebar";
import { SidebarItemType } from "@/components/RComponents/SidebarComponents/constants/constant";
import RIconSideBarMenuItem from "@/components/RComponents/SidebarComponents/RIconSideBarMenuItem";
import { SidebarMenuProps } from "@/types/index.type";

const RIconSidebarMenu = ({ items }: SidebarMenuProps) => {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <RIconSideBarMenuItem
          title={item.title}
          Icon={item.Icon}
          type={SidebarItemType.ICON_ITEM}
          items={item.items}
        />
      ))}
    </SidebarMenu>
  );
};

export default RIconSidebarMenu;
