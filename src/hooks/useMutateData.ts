import { useToast } from "@/hooks/useToast";
import { UseMutateDataOptions } from "@/types/index.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export const useMutateData = <TData = any, TVariables = any, TError = any>(
  options: UseMutateDataOptions<TData, TVariables, TError>
) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useTranslation();

  const data = useMutation<TData, TError, TVariables>({
    mutationFn: options.mutationFn,
    mutationKey: options.mutationKey,
    onSuccess: (data: TData, variables: TVariables) => {
      const responseData = data as { data?: { status: number; message: string } };
      if (responseData?.data?.status === 0) {
        toast({
          title: responseData.data.message,
          variant: "destructive",
        });
      }
      else {
        // Invalidate specified queries
        if (options.invalidateKeys) {
          options.invalidateKeys.forEach((key) =>
            queryClient.invalidateQueries(key)
          );
        }
        // Display success message if applicable
        if (options.displaySuccess) {
          if (options.successMessage)
            toast({ title: options.successMessage });
          else toast({ title: (data as any)?.data?.message });
        }

        // Navigate to a specific path if provided
        if (options.navigateToPath) {
          router.push(options.navigateToPath);
        }

        // Call custom onSuccess function
        if (options.onSuccessFn) {
          options.onSuccessFn(data, variables);
        }

        // Dispatch Redux action if specified
        if (options.dispatch && options.action) {
          dispatch(options.action(data as any));
        }
      }

    },
    onError: (error: TError, variables: TVariables) => {
      // Display error message
      toast({
        title: (error as any)?.title || t("an_unexpected_error_occurred_please_try_again"),
        variant: "destructive",
      });

      // Call custom onError function
      if (options.onErrorFn) {
        options.onErrorFn((error as any)?.message ?? "Error", variables);
      }
    },
  });

  return data;
};
