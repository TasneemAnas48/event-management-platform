import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  // SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
// import RDropdown from "@/components/RComponents/RDropDown";
// import RNormalSidebarItem from "@/components/RComponents/SidebarComponents/RNormalSidebarItem";
// import RIconSideBarMenuItem from "@/components/RComponents/SidebarComponents/RIconSideBarMenuItem";

export function NavProjects(
  {
    // projects,
  }: {
    projects?: {
      title: string;
      url: string;
      name: string;
      icon: LucideIcon;
      items: any;
    }[];
  }
) {
  const { open: isSidebarOpened, openMobile: isSidebarMobileOpened } =
    useSidebar();
  //className="group-data-[collapsible=icon]:hidden"
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      {isSidebarOpened || isSidebarMobileOpened ? (
        <SidebarMenu>
          {/* {projects.map((item, index) => (
            <RNormalSidebarItem item={item} />
          ))} */}
          <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-foreground/70">
              <DotsHorizontalIcon className="text-sidebar-foreground/70" />
              <span>More</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      ) : (
        <SidebarMenu>
          {/* {projects.map((item) => (
            <RIconSideBarMenuItem item={item} />
          ))} */}
        </SidebarMenu>
      )}
    </SidebarGroup>
  );
}
