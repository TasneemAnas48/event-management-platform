import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ExpandedState,
  getExpandedRowModel,
  ColumnDef,
  Row,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
  HeaderContext,
  CellContext,
} from "@tanstack/react-table";
import RDropdown from "@/components/RComponents/RDropDown";
import RAlertDialog from "@/components/RComponents/RAlertDialog";
import RTooltip from "@/components/RComponents/RTooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { RTableProps, TableAction } from "@/types/index.type";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Loader } from "lucide-react";

interface ActionTypes {
  LOADING: string;
  DISABLED: string;
  NONE: string;
}

const RTable: React.FC<RTableProps> = ({
  Records,
  emptyData,
  callBack,
  finishedOperation,
  setFinishedOperation,
  loading
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [actionsLoading, setActionsLoading] = React.useState<Record<string, string>>({});

  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const { t } = useTranslation();

  const actionTypes: ActionTypes = {
    LOADING: "loading",
    DISABLED: "disabled",
    NONE: "none",
  };


  const addToActionLoading = (action: TableAction, row: Row<any>) => {
    setActionsLoading((oldLoadingStatus) => ({
      ...oldLoadingStatus,
      [row.id]: action.name,
    }));
  };

  const checkActionStatus = (action: TableAction, row: Row<any>): string => {
    if (row.id in actionsLoading) {
      return actionsLoading[row.id] === action.name
        ? actionTypes.LOADING
        : actionTypes.DISABLED;
    }
    return actionTypes.NONE;
  };

  const removeActionFromLoading = React.useCallback((id: string) => {
    setActionsLoading((oldLoadingStatus) => {
      const objectCopy = { ...oldLoadingStatus };
      delete objectCopy[id];
      return objectCopy;
    });
  }, []);

  React.useEffect(() => {
    if (finishedOperation) {
      removeActionFromLoading(finishedOperation);
      setFinishedOperation?.(null);
    }
  }, [finishedOperation, removeActionFromLoading, setFinishedOperation]);

  const columns: ColumnDef<any>[] = Records.columns?.map((columnInfo) => ({
    id: columnInfo?.id ?? undefined,
    accessorKey: columnInfo?.accessorKey ?? undefined,
    header: (info: HeaderContext<any, any>) => columnInfo?.renderHeader(info),
    cell: (info: CellContext<any, any>) => columnInfo?.renderCell(info),
    size: columnInfo.size ? columnInfo?.size : undefined,

  }));
  Records?.actions &&
    Records?.actions?.length > 0 &&
    columns.push({
      id: "actions",
      header: () => <></>,
      cell: (info: CellContext<any, any>) => (
        <div className="flex gap-3 items-center cursor-pointer">
          {Records.actions
            ?.filter((action) => !action.inDropdown && !action.hidden)
            .map((action, index) => {
              const iconComponent = (
                <RTooltip
                  key={`tooltip-${action.name}-${index}`}
                  contentClassName={"bg-white text-[14px] shadow-md " + action.actionIconClass}
                  triggerComponent={
                    checkActionStatus(action, info.row.original) ===
                      actionTypes.LOADING ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      action.Icon && (
                        <action.Icon
                          key={`icon-${action.name}-${index}`}
                          className={cn(
                            "w-5 h-5",
                            `${action.actionIconClass} ${checkActionStatus(action, info.row.original) === actionTypes.DISABLED ? "disabled__link" : ""}`
                          )}
                          aria-label={action.name ?? "default"}
                          onClick={() => {
                            if (
                              !action.inDialog &&
                              checkActionStatus(action, info.row.original) !==
                              actionTypes.DISABLED
                            ) {
                              action.onClick && action.onClick(info);
                              if (
                                action.needLoader &&
                                checkActionStatus(action, info.row.original) ===
                                actionTypes.NONE
                              ) {
                                addToActionLoading(action, info.row.original);
                              }
                            }
                          }}
                        />
                      )
                    )
                  }
                  tooltipText={action.name}
                />
              );
              return action.inDialog ? (
                <RAlertDialog
                  key={`dialog-${action.name}-${index}`}
                  component={iconComponent}
                  disableTrigger={
                    checkActionStatus(action, info.row.original) ===
                    actionTypes.LOADING ||
                    checkActionStatus(action, info.row.original) ===
                    actionTypes.DISABLED
                  }
                  title={action.dialogTitle && action.dialogTitle(info)}
                  description={
                    action.dialogDescription && action.dialogDescription(info)
                  }
                  cancelText={action.cancel}
                  confirmText={action.confirm}
                  loading={action.loading}
                  confirmAction={() => {
                    action.confirmAction && action.confirmAction(info);
                    if (action.needLoader)
                      addToActionLoading(action, info.row.original);
                  }}
                  disabled={action.disabled}
                  headerItemsPosition={action.headerItemsPosition}
                />
              ) : (
                <React.Fragment key={`fragment-${action.name}-${index}`}>
                  {iconComponent}
                </React.Fragment>
              );
            })}
          {!Records?.removeDropDownActions &&
            Records.actions &&
            Records.actions.some((action) => action.inDropdown) && (
              <RDropdown
                triggerComponent={
                  Records.triggerDropDownComponent &&
                  Records.triggerDropDownComponent(info)
                }
                onPointerDownHandler={() =>
                  Records.onPointerDownHandler &&
                  Records.onPointerDownHandler(info)
                }
                side={Records.dropDownSide ?? "bottom"}
                align={Records.dropDownAlign ?? "end"}
                contentClassName={Records.dropDownContentClassName}
                actions={Records.actions
                  .filter((action) => action.inDropdown && !action.hidden)
                  .map((action) => ({
                    ...action,
                    onClick: () => action.onClick && action.onClick(info),
                  }))}
              />
            )}
        </div>
      ),
    });

  const data = Records.data ?? [];

  const table = useReactTable({
    data: data,
    columns: columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      expanded,
    },
    manualPagination: true,
  });

  React.useEffect(() => {
    callBack && callBack(table);
  }, [callBack, table]);

  return (
    <div className="relative mt-2 overflow-x-auto">
      <div
        className={`rounded-md border w-full shadow-sm`}
        style={{ position: "relative", height: loading ? "320px" : "" }}
      >
        {loading && (
          <div style={{ width: "100%", position: "absolute" }}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((_, index) => (
              <div key={index} style={{ marginBottom: "8px", width: "100%" }}>
                <Skeleton className="w-full h-8" />
              </div>
            ))}
          </div>
        )}
        <Table className="min-w-[800px]">
          <TableHeader>
            {table.getHeaderGroups()?.map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers?.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-foreground whitespace-nowrap px-2 md:px-4"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          {/* {loading && <div style={{ height: "260px" }}></div>} */}
          {!loading && (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows?.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-accent"
                  >
                    {row.getVisibleCells()?.map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-2 md:px-4"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={Records.columns.length} className="text-center py-[20px]">
                    {emptyData || t("no_data_available")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
};

export default React.memo(RTable);
