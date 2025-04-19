import { SidebarItemType } from "@/components/RComponents/SidebarComponents/constants/constant";
import {
  InvalidateQueryFilters,
  MutationFunction,
  MutationKey,
  QueryKey,
  QueryObserverSuccessResult,
} from "@tanstack/react-query";
import { CellContext, HeaderContext } from "@tanstack/react-table";
import { LucideIcon } from "lucide-react";
import React, {
  CSSProperties,
  InputHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";

export type BreadCrumbObject = {
  path: string;
  title: string;
};

export type ActionItem = {
  name: string;
  id?: number;
  onClick?: () => void;
  Icon?: any;
  iconOnRight?: boolean;
  actionIconClass?: string;
  actionTextClass?: string;
  component?: ReactNode;
  addSeparator?: boolean;
  extraValue?: any;
};
export type CheckActionItem = ActionItem & {
  checked: boolean;
  onCheckedChange: (checked: boolean, id?: number | string) => void;
};
export type RDropdownProps = {
  triggerComponent?: ReactNode;
  label?: string | null;
  actions?: ActionItem[];
  onPointerDownHandler?: MouseEventHandler;
  itemClassName?: string;
  contentClassName?: string;
  side?: "bottom" | "right" | "top" | "left";
  align?: "center" | "end" | "start";
};

export type RCheckDropdownProps = {
  triggerComponent?: React.ReactNode;
  label?: string | React.ReactNode;
  actions: { [key: string]: CheckActionItem };
  setActions?: React.Dispatch<React.SetStateAction<any>>;
  contentClassName?: string;
  itemClassName?: string;
  multiFilter?: boolean;
  KeepActiveItemChecked?: boolean;
  side?: "bottom" | "right" | "top" | "left";
  align?: "center" | "end" | "start";
  closeOnSelect?: boolean;
  additionalComponent?: ReactNode;
};

export type SidebarContentProps = {
  type: SidebarItemType.CONTENT;
  item: SidebarGroupProps | SidebarMenuProps;
};
export type SidebarGroupProps = {
  title?: string;
  type: SidebarItemType.GROUP;
  items: SidebarMenuProps[];
  Icon?: LucideIcon; // Add if `icon` is used in items
};
export type SidebarMenuProps = {
  title: string;
  type:
  | SidebarItemType.COLLAPSE_MENU
  | SidebarItemType.NORMAL_MENU
  | SidebarItemType.ICON_MENU;
  items: SidebarItemProps[];
};
export type SidebarItemProps = {
  title: string;
  type:
  | SidebarItemType.COLLAPSE_ITEM
  | SidebarItemType.NORMAL_ITEM
  | SidebarItemType.ICON_ITEM;
  items?: SidebarSubMenuProps[];
  Icon?: LucideIcon;
  path?: string;
  childPaths?: string[];
  actions?: ActionItem[];
  requiredPermissions?: string | string[];
  permission?: string;
};
export type SidebarSubMenuProps = {
  title: string;
  type: SidebarItemType.SUB_MENU;
  items: SidebarSubMenuItemProps[];
  requiredPermissions?: string | string[];
  permission?: string;
};
export type SidebarSubMenuItemProps = {
  title: string;
  type: SidebarItemType.SUB_ITEM;
  Icon?: LucideIcon;
  path?: string;
  actions?: ActionItem[];
  childPaths?: string[];
  requiredPermissions?: string | string[];
  permission?: string;
};

export type AllSidebarItemTypes =
  | SidebarGroupProps
  | SidebarMenuProps
  | SidebarItemProps
  | SidebarSubMenuProps
  | SidebarSubMenuItemProps;

export type TableAction = {
  inDropdown?: boolean;
  hidden?: boolean | (({ row }: any) => boolean);
  name: string;
  Icon?: LucideIcon;
  actionIconClass?: string;
  actionTextClass?: string;
  needLoader?: boolean;
  iconFn?: (info: any) => string;
  onClick?: (info: CellContext<any, any>) => void;
  dialogTitle?: (info: any) => string;
  dialogDescription?: (info: any) => string;
  cancel?: string;
  confirm?: string;
  loading?: boolean;
  confirmAction?: (info: any) => void;
  disabled?: boolean;
  headerItemsPosition?: string;
  inDialog?: boolean;
};
export type CustomColumn = {
  id: string;
  accessorKey?: string;
  renderHeader: (info: HeaderContext<any, any>) => ReactNode;
  renderCell: (info: CellContext<any, any>) => ReactNode;
  size?: number;
};

export type TableRecords = {
  columns: CustomColumn[];
  data: any[];
  actions?: TableAction[];
  removeDropDownActions?: boolean;
  triggerDropDownComponent?: (info: any) => React.ReactNode;
  dropDownSide?: "bottom" | "right" | "top" | "left";
  dropDownAlign?: "center" | "end" | "start";
  dropDownContentClassName?: string;
  onPointerDownHandler?: (info: any) => void;
  staticColumns?: boolean;
  staticHeight?: string;
};

export type FetchFn = (params: { page: number; size: number }) => Promise<{ data: any[] }>;

export type RTableProps = {
  Records: TableRecords;
  tableContainerClassName?: string;
  emptyData?: string | React.ReactNode;
  callBack?: (table: any) => void;
  finishedOperation?: string | null;
  setFinishedOperation?: (value: string | null) => void;
  loading?: boolean;
  excelTitle?: string;
  fetchFn?: FetchFn;
  customTableBody?: React.ComponentType<React.HTMLAttributes<HTMLTableSectionElement>>;
};

export type RTooltipProps = {
  triggerComponent?: ReactNode;
  tooltipText?: string;
  triggerClassName?: string;
  contentClassName?: string;
  delayDuration?: number;
  side?: "top" | "bottom" | "left" | "right";
};

export type RAlertDialogProps = {
  component?: ReactNode;
  title?: string;
  description?: string;
  cancelText?: string;
  cancelClassName?: string;
  cancelAction?: () => void;
  confirmText?: string;
  confirmClassName?: string;
  confirmAction: () => void;
  loading?: boolean;
  disabled?: boolean;
  headerItemsPosition?: string;
  disableTrigger?: boolean;
};

export type RButtonProps = {
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  hidden?: boolean;
  Icon?: any;
  text?: string;
  type?: "button" | "submit" | "reset";
  key?: React.Key;
  id?: string;
  iconRight?: boolean;
  variant?:
  | "default"
  | "ghost"
  | "link"
  | "destructive"
  | "outline"
  | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  ariaLabel?: string;
};

export type RInputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  inputError?: boolean;
  inputClassName?: string;
  isLoading?: boolean;
};

export type RSearchInputProps = {
  searchData: string;
  handleSearchClicked: () => void;
  handleDataChanged: (value: string) => void;
  searchLoading?: boolean;
  placeholder?: string;
  inputDisabled?: boolean;
  className?: string;
  removeCloseIcon?: boolean;
};

export type RImageNameProps = {
  name?: string;
  type?: "user" | "group" | "course";
  image?: string;
  imageClassName?: string;
  className?: string;
  onClick?: () => void;
  textClassName?: string;
};


interface DialogHeaderProps {
  title?: string;
  description?: string;
}

export type RControlledDialogProps = {
  isOpen?: boolean;
  closeDialog?: () => void;
  dialogHeader?: DialogHeaderProps | null;
  dialogBody?: React.ReactNode;
  dialogFooter?: React.ReactNode;
  contentClassName?: string;
}

export type RPopoverProps = {
  triggerComponent?: ReactNode;
  triggerClassName?: string;
  contentComponent: ReactNode;
  contentClassName?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export type RPaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
  paginationContainerClassName?: string;
  paginationContentClassName?: string;
};

export type RPaginateTableProps = RTableProps & RPaginationProps;

export type RCardProps = {
  title?: string;
  description?: string;
  contentComponent: ReactNode;
  contentClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  cardClassName?: string;
  footerClassName?: string;
  footerComponent?: ReactNode;
};
export type RFlippingCardProps = {
  flipCardClassName?: string;
  frontTitle?: string;
  frontDescription?: string;
  frontContentComponent: ReactNode;
  frontContentClassName?: string;
  frontHeaderClassName?: string;
  frontTitleClassName?: string;
  frontDescriptionClassName?: string;
  frontCardClassName?: string;
  frontFooterClassName?: string;
  frontFooterComponent?: ReactNode;
  backTitle?: string;
  backDescription?: string;
  backContentComponent: ReactNode;
  backContentClassName?: string;
  backHeaderClassName?: string;
  backTitleClassName?: string;
  backDescriptionClassName?: string;
  backCardClassName?: string;
  backFooterClassName?: string;
  backFooterComponent?: ReactNode;
};

export type TabElement = {
  value: string;
  title: string;
  disabled?: boolean;
  content?: ReactNode;
};
export type RTabsProps = {
  defaultValue?: string;
  tabs: TabElement[];
  className?: string;
  setActiveTab: React.Dispatch<React.SetStateAction<any>>;
  activeTab: string;
  innerContent?: boolean;
  listClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
};

export type AnimationState = {
  x?: string | number;
  y?: string | number;
  z?: string | number;
  opacity?: number;
  transition?: {
    delay?: number;
    type?: string;
    stiffness?: number;
    when?: "beforeChildren" | "afterChildren";
    staggerChildren?: number;
    delayChildren?: number;
  };
};

export type AnimationVariants = {
  hidden: AnimationState;
  show: AnimationState;
};

export type UseFetchDataParams<TData = any, TError = any, TSelected = any> = {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
  enableCondition?: boolean;
  refetchOnMount?: boolean;
  onSuccessFn?: (data: QueryObserverSuccessResult<TSelected, TError>) => void;
  onErrorFn?: (errorMessage: string) => void;
  selectFn?: (data: TData) => TSelected;
};

export type UseMutateDataOptions<
  TData = any,
  TVariables = any,
  TError = any,
> = {
  mutationFn: MutationFunction<TData, TVariables>;
  mutationKey?: MutationKey;
  invalidateKeys?: InvalidateQueryFilters[]; // QueryKey[] is valid for invalidation
  displaySuccess?: boolean; // Whether to display a success message
  successMessage?: string;
  navigateToPath?: string; // Path to navigate after success
  onSuccessFn?: (data: TData, variables: TVariables) => void; // Custom onSuccess handler
  onErrorFn?: (errorMessage: TError, variables: TVariables) => void; // Custom onError handler
  dispatch?: boolean; // Whether to dispatch an action
  action?: (data: TData) => any; // Redux action creator
};


export type SwiperConfig = {
  slidesPerView?: number;
  navigation?: boolean;
  pagination?: boolean;
  scrollbar?: boolean;
  breakpoints?: any;
  autoplay?: { delay: number; disableOnInteraction: boolean };
  loop?: boolean;
  prevStyle?: CSSProperties;
  nextStyle?: CSSProperties;
  onSlideChange?: () => void;
  onSwiper?: (swiper: any) => void;
}

export type RSwiperProps = {
  slides: ReactNode[];
  config: SwiperConfig;
  className?: string;
}

