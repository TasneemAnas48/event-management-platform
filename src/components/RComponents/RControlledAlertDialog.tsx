import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";

interface ButtonProps {
    text: string;
    className: string;
}

interface RControlledAlertDialogProps {
    title?: string;
    description?: string;
    cancel?: ButtonProps;
    confirm?: ButtonProps;
    confirmAction?: () => void;
    isOpen: boolean;
    handleCloseAlert: () => void;
    closeOnConfirm?: boolean;
    headerItemsPosition?: string;
    isLoading?: boolean;
}

const RControlledAlertDialog: React.FC<RControlledAlertDialogProps> = ({
    title = "Are_you_sure_you_want_to_delete",
    description = "This_action_cannot_be_undone",
    cancel = { text: "cancel_delete", className: "text-black" },
    confirm = { text: "yes_delete_it", className: "bg-destructive" },
    confirmAction = () => { },
    isOpen = false,
    handleCloseAlert,
    closeOnConfirm = true,
    headerItemsPosition = "items-start",
    isLoading = false,
}) => {
    const { t } = useTranslation();

    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader className={headerItemsPosition}>
                    <AlertDialogTitle className={"font-bold text-[16px]"}>{t(title)}</AlertDialogTitle>
                    <AlertDialogDescription className="text-center">{t(description)}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-[10px] items-end">
                    <AlertDialogCancel
                        onClick={() => {
                            handleCloseAlert();
                        }}
                        className={cancel.className}
                    >
                        {t(cancel.text)}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isLoading}
                        onClick={() => {
                            confirmAction();
                            closeOnConfirm && handleCloseAlert();
                        }}
                        className={confirm.className}
                    >
                        {t(confirm.text)}
                        {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default RControlledAlertDialog;
