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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { RAlertDialogProps } from "@/types/index.type";
import { useTranslation } from "react-i18next";

const RAlertDialog: React.FC<RAlertDialogProps> = ({
  component,
  title,
  description,
  cancelText,
  cancelClassName,
  confirmText,
  confirmClassName,
  confirmAction = () => { },
  headerItemsPosition = "items-start",
  disableTrigger = false,
}) => {
  const { t } = useTranslation();
  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={disableTrigger}>
        {component ? component : <Button>{t("Open_Alert_Dialog")}</Button>}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className={headerItemsPosition}>
          <AlertDialogTitle className="font-bold text-[16px]">
            {title ? t(title) : t("Are_you_sure_you_want_to_delete")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description ? t(description) : t("This action cannot be undone")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="items-end gap-[10px]">
          <AlertDialogCancel className={cancelClassName}>
            {cancelText ? t(cancelText) : t("Cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => confirmAction()}
            className={confirmClassName}
          >
            {confirmText ? t(confirmText) : t("Confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RAlertDialog;
