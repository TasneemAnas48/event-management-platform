import { Accordion } from "@/components/ui/accordion";
import { SidebarMenu, useSidebar } from "@/components/ui/sidebar";
import { SidebarMenuProps } from "@/types/index.type";
import { renderSidebarItem } from "@/components/RComponents/SidebarComponents/renderSidebarItem";

const RCollapseSidebarMenu = ({ items }: SidebarMenuProps) => {
  const { open: isSidebarOpened, openMobile: isSidebarMobileOpened } =
    useSidebar();
  const isOpen = isSidebarMobileOpened || isSidebarOpened;
  return (
    <SidebarMenu className={isOpen ? "px-1" : ""}>
      <Accordion id="accordion" className="flex flex-col gap-1" type="multiple">
        {items.map((item) => renderSidebarItem(item))}
      </Accordion>
    </SidebarMenu>
  );
};

export default RCollapseSidebarMenu;
