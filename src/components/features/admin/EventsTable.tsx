import { Event } from '@/types/event';
import { CustomColumn, TableAction } from "@/types/index.type";
import React, { useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import RTable from '@/components/RComponents/RTable';
import RSeeMore from '@/components/RComponents/SidebarComponents/RSeeMore';
import { formatDate } from '@/utils/formatters';
import { capitalizeFirstLetter } from '@/utils/helperFunctions';

interface EventsTableProps {
    data: Event[];
    onEdit: (event: Event) => void;
    onDelete: (id: string) => void;
}

const EventsTable: React.FC<EventsTableProps> = ({
    data,
    onEdit,
    onDelete,
}) => {
    const [finishedOperation, setFinishedOperation] = useState<string | null>(null);

    const columns: CustomColumn[] = useMemo(
        () => [
            {
                id: "title",
                renderHeader: () => {
                    return <span className="w-max">Title</span>;
                },
                renderCell: ({ row }) => {
                    return <span>{row.original.title}</span>;
                },
            },
            {
                id: "date",
                renderHeader: () => {
                    return <span className="w-max">Date & Time</span>;
                },
                renderCell: ({ row }) => {
                    return <span>{formatDate(row.original.date) + " - " + (row.original.time)}</span>;
                },
            },
            {
                id: "location",
                renderHeader: () => {
                    return <span className="w-max">Location</span>;
                },
                renderCell: ({ row }) => {
                    return <span>{capitalizeFirstLetter(row.original.location.replace(/-/g, ' '))}</span>;
                },
            },
            {
                id: "category",
                renderHeader: () => {
                    return <span className="w-max">Category</span>;
                },
                renderCell: ({ row }) => {
                    return (
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded capitalize">
                            {row.original.category}
                        </span>
                    );
                },
            },
            {
                id: "description",
                renderHeader: () => {
                    return <span className="w-max">Description</span>;
                },
                renderCell: ({ row }) => {
                    return <span><RSeeMore text={row.original.description} maxChars={20} /></span>;
                },
            },
        ],
        []
    );

    const actions: TableAction[] = useMemo(
        () => [
            {
                name: "Edit",
                Icon: Pencil,
                inDropdown: false,
                onClick: ({ row }: { row: any }) => {
                    onEdit(row.original);
                },
                actionIconClass: "text-green-500",
                actionTextClass: "text-green-500",
            },
            {
                name: "Delete",
                Icon: Trash2,
                inDropdown: false,
                inDialog: true,
                dialogTitle: ({ row }: { row: any }) => {
                    return `Are you sure you want to delete ${row.original.title}?`
                },
                confirmAction: ({ row }: { row: any }) => {
                    onDelete(row.original.id);
                },
                actionIconClass: "text-red-500",
                actionTextClass: "text-red-500",
                needLoader: true,
            },
        ],
        [onDelete, onEdit]
    );

    const records = useMemo(
        () => ({
            columns,
            data,
            actions,
        }),
        [columns, data, actions]
    );

    return (
        <RTable
            Records={records}
            finishedOperation={finishedOperation}
            setFinishedOperation={setFinishedOperation}
            emptyData="No events found"
        />
    );
};

export default React.memo(EventsTable, (prevProps, nextProps) => {
    return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
}); 