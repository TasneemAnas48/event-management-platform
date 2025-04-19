import { SidebarItemType } from "../constants/constant";
import { SidebarContentProps } from "@/types/index.type";
import { ChartArea } from "lucide-react";

export const sidebarContent: SidebarContentProps[] = [
  {
    type: SidebarItemType.CONTENT,
    item: {
      type: SidebarItemType.GROUP,
      items: [
        {
          type: SidebarItemType.COLLAPSE_MENU,
          title: "main",
          items: [
            {
              type: SidebarItemType.NORMAL_ITEM,
              Icon: ChartArea,
              title: "statistics",
              path: "statistics",
            },
          ],
        },
      ],
    },
  },
];
