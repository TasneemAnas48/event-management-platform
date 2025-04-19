"use client"

import * as React from "react";
import { NavUser } from "@/components/RComponents/SidebarComponents/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { renderSidebarItem } from "@/components/RComponents/SidebarComponents/renderSidebarItem";
import { CompanyLogo } from "@/components/RComponents/SidebarComponents/CompanyLogo";
import { sidebarContent } from "@/components/RComponents/SidebarComponents/data/sidebarContent";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const company = {
  name: "Event Management",
  // fullLogo: logo.src,
  // logo: logo.src,
};
const RAppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar> & {
}) => {
  const isRTL = document.dir === 'rtl';
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      className="h-full shadow-lg"
      side={isRTL ? "right" : "left"}
      {...props}
    >
      <SidebarHeader>
        <CompanyLogo company={company} />
      </SidebarHeader>
      <SidebarContent style={{ scrollbarWidth: "none" }}>
        {sidebarContent.map((content) => {
          return renderSidebarItem(content.item);
        })}
      </SidebarContent>
      <SidebarFooter className="border-t">
        <NavUser user={user as any} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default RAppSidebar;
