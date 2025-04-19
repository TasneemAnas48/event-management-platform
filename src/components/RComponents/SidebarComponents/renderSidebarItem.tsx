import { useSidebar } from "@/components/ui/sidebar";
import RCollapseSidebarItem from "@/components/RComponents/SidebarComponents/RCollapseSidebarItem";
import RCollapseSidebarMenu from "@/components/RComponents/SidebarComponents/RCollapseSidebarMenu";
import RIconSidebarMenu from "@/components/RComponents/SidebarComponents/RIconSidebarMenu";
import RIconSideBarMenuItem from "@/components/RComponents/SidebarComponents/RIconSideBarMenuItem";
import RNormalSidebarItem from "@/components/RComponents/SidebarComponents/RNormalSidebarItem";
import RNormalSidebarMenu from "@/components/RComponents/SidebarComponents/RNormalSidebarMenu";
import RSidebarGroup from "@/components/RComponents/SidebarComponents/RSidebarGroup";
import RSubMenuSidebar from "@/components/RComponents/SidebarComponents/RSubMenuSidebar";
import RSubMenuSidebarItem from "@/components/RComponents/SidebarComponents/RSubMenuSidebarItem";
import { AllSidebarItemTypes } from "@/types/index.type";
import { SidebarItemType } from "./constants/constant";

export const renderSidebarItem = (item: AllSidebarItemTypes) => {
  const { open: isSidebarOpened, openMobile: isSidebarMobileOpened } =
    useSidebar();
  if (!isSidebarOpened && !isSidebarMobileOpened) {
    switch (item.type) {
      case SidebarItemType.COLLAPSE_ITEM:
      case SidebarItemType.NORMAL_ITEM:
      case SidebarItemType.ICON_ITEM:
        return <RIconSideBarMenuItem key={item.title} {...item} />;
    }
  }
  switch (item.type) {
    case SidebarItemType.GROUP:
      return <RSidebarGroup key={item.title} {...item} />;
    case SidebarItemType.COLLAPSE_MENU:
      return <RCollapseSidebarMenu key={item.title} {...item} />;
    case SidebarItemType.NORMAL_MENU:
      return <RNormalSidebarMenu key={item.title} {...item} />;
    case SidebarItemType.ICON_MENU:
      return <RIconSidebarMenu key={item.title} {...item} />;
    case SidebarItemType.COLLAPSE_ITEM:
      return <RCollapseSidebarItem key={item.title} {...item} />;
    case SidebarItemType.NORMAL_ITEM:
      return <RNormalSidebarItem key={item.title} {...item} />;
    case SidebarItemType.ICON_ITEM:
      return <RIconSideBarMenuItem key={item.title} {...item} />;
    case SidebarItemType.SUB_MENU:
      return <RSubMenuSidebar key={item.title} {...item} />;
    case SidebarItemType.SUB_ITEM:
      return <RSubMenuSidebarItem key={item.title} {...item} />;
    default:
      "wrong type";
  }
};
