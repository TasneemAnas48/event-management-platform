import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function CompanyLogo({
  company,
}: {
  company: {
    name: string;
    fullLogo?: string;
    logo?: string;
  };
}) {
  const { open: isSidebarOpened, openMobile: isSidebarMobileOpened } =
    useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="!bg-transparent !hover:bg-transparent hover:cursor-auto data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square items-center justify-center text-sidebar-primary-foreground">
            {/* <img
              src={isSidebarOpened || isSidebarMobileOpened ? company.fullLogo : company.logo}
              alt={`${company.name} logo`}
              width={250}
            /> */}
            {company.name}
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
