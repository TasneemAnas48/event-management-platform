import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { RControlledDialogProps } from "@/types/index.type";

const RControlledDialog: React.FC<RControlledDialogProps> = ({
    isOpen = false,
    closeDialog,
    dialogHeader = null,
    dialogBody = null,
    dialogFooter = null,
    contentClassName = "",
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={closeDialog}>
            <DialogContent
                className={`p-7 shadow-md ${contentClassName}`}
            >
                {dialogHeader && (
                    <DialogHeader>
                        {dialogHeader.title && (
                            <DialogTitle className="font-semibold text-left">
                                {dialogHeader.title}
                            </DialogTitle>
                        )}
                        {dialogHeader.description && (
                            <DialogDescription className="text-destructive">
                                {dialogHeader.description}
                            </DialogDescription>
                        )}
                    </DialogHeader>
                )}
                <div className="flex flex-col space-y-2 ">
                    {dialogBody}
                </div>
                {dialogFooter && (
                    <DialogFooter className="flex justify-end space-x-2">
                        {dialogFooter}
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default RControlledDialog;
