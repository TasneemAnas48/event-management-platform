"use client"

import dynamic from "next/dynamic"; 

const RCollapseSidebarItem = dynamic(() => import("@/components/RComponents/SidebarComponents/RCollapseSidebarItem"));
const RCollapseSidebarMenu = dynamic(() => import("@/components/RComponents/SidebarComponents/RCollapseSidebarMenu"));
const RIconSidebarMenu = dynamic(() => import("@/components/RComponents/SidebarComponents/RIconSidebarMenu"));
const RIconSideBarMenuItem = dynamic(() => import("@/components/RComponents/SidebarComponents/RIconSideBarMenuItem"));
const RNormalSidebarItem = dynamic(() => import("@/components/RComponents/SidebarComponents/RNormalSidebarItem"));
const RNormalSidebarMenu = dynamic(() => import("@/components/RComponents/SidebarComponents/RNormalSidebarMenu"));
const RSidebarGroup = dynamic(() => import("@/components/RComponents/SidebarComponents/RSidebarGroup"));
const RSubMenuSidebar = dynamic(() => import("@/components/RComponents/SidebarComponents/RSubMenuSidebar"));
const RSubMenuSidebarItem = dynamic(() => import("@/components/RComponents/SidebarComponents/RSubMenuSidebarItem"));

export enum SidebarItemType {
  CONTENT = "content",
  GROUP = "group",
  COLLAPSE_MENU = "collapseMenu",
  NORMAL_MENU = "normalMenu",
  ICON_MENU = "iconMenu",
  SUB_MENU = "subMenu",
  COLLAPSE_ITEM = "collapseItem",
  NORMAL_ITEM = "normalItem",
  ICON_ITEM = "iconItem",
  SUB_ITEM = "subItem",
}
export const mapSidebarItemTypeToComponent = {
  [SidebarItemType.GROUP]: RSidebarGroup,
  [SidebarItemType.COLLAPSE_MENU]: RCollapseSidebarMenu,
  [SidebarItemType.NORMAL_MENU]: RNormalSidebarMenu,
  [SidebarItemType.ICON_MENU]: RIconSidebarMenu,
  [SidebarItemType.SUB_MENU]: RSubMenuSidebar,
  [SidebarItemType.COLLAPSE_ITEM]: RCollapseSidebarItem,
  [SidebarItemType.NORMAL_ITEM]: RNormalSidebarItem,
  [SidebarItemType.ICON_ITEM]: RIconSideBarMenuItem,
  [SidebarItemType.SUB_ITEM]: RSubMenuSidebarItem,
};
