import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

interface Option {
    value: string | any;
    label: string;
    disabled?: boolean;
    className?: string;
}

interface RNewSelectProps {
    triggerClassName?: string;
    classNameContent?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    options: Option[];
    value: string | any;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    error?: boolean;
    isLoading?: boolean;
}

const RSelect: React.FC<RNewSelectProps> = ({
    triggerClassName,
    classNameContent,
    onChange,
    placeholder = "Select",
    options,
    value,
    disabled,
    required,
    name,
    error,
    isLoading
}) => {
    const { t } = useTranslation();
    return (
        <Select disabled={disabled} required={required} name={name} value={value || ""} onValueChange={onChange}>
            <SelectTrigger className={`${triggerClassName} ${error ? "input__error" : ""} relative`}>
                {isLoading ? (
                    <>
                        <span className="text-border text-[#979897]">{placeholder}</span>
                        <Loader className="w-4 h-4 animate-spin absolute right-[40px]" />
                    </>
                ) : (
                    value ? <SelectValue /> : <span className="text-[#979897]">{placeholder}</span>
                )}
            </SelectTrigger>
            <SelectContent className={classNameContent}>
                {!isLoading && options?.length > 0 && options?.map((option) => (
                    <SelectItem
                        key={option.value}
                        disabled={option.disabled}
                        className={"cursor-pointer rtl:justify-end ltr:justify-start " + option.className} value={option.value}
                    >
                        {option.label}
                    </SelectItem>
                ))}
                {!isLoading && options?.length == 0 && <span className="text-center w-full px-[20px]">{t("no_data_available")}</span>}
            </SelectContent>
        </Select>
    );
};

export default RSelect;