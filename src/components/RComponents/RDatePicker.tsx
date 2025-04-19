import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface RDatePickerProps {
    field: any;
    label?: string;
    placeholder?: string;
    className?: string;
    buttonClassName?: string;
}

const RDatePicker = ({
    field,
    label,
    placeholder,
    className,
    buttonClassName
}: RDatePickerProps) => {
    return (
        <FormItem className={cn("flex flex-col", className)}>
            {label && <FormLabel>{label}</FormLabel>}
            <Popover>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            className={cn(
                                "w-full pl-3 text-left font-normal hover:shadow-none",
                                field.value ? "!text-[#000]" : "text-gray-500",
                                buttonClassName
                            )}
                        >
                            {field.value ? (
                                format(field.value, "yyyy-MM-dd")
                            ) : (
                                <span>{placeholder}</span>
                            )}
                            <CalendarIcon className="ml-auto h-5 w-5 opacity-50" />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={field.onChange}
                        disabled={(date: Date) =>
                            date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        captionLayout="dropdown"
                        fromYear={1900}
                        toYear={new Date().getFullYear()}
                    />
                </PopoverContent>
            </Popover>
            <FormMessage />
        </FormItem>
    );
}

export default RDatePicker;
