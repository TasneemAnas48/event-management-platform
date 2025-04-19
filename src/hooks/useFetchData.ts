"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/useToast";
import { UseFetchDataParams } from "@/types/index.type";
import { useQuery, QueryObserverSuccessResult } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useFetchData = <TData = any, TError = any, TSelected = TData>({
  queryKey,
  queryFn,
  enableCondition = true,
  refetchOnMount = true,
  onSuccessFn,
  onErrorFn,
  selectFn,
}: UseFetchDataParams<TData, TError, TSelected>) => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const data = useQuery<TData, TError, TSelected>({
    queryKey,
    queryFn,
    refetchOnWindowFocus: false,
    refetchOnMount: refetchOnMount ?? false,
    retry: 1,
    enabled: enableCondition,

    select: (data: TData) => {
      if (selectFn) {
        return selectFn(data);
      }
      return data as any;
    },
  });

  const errorMessage = data.isError
    ? (data.error as Error)?.message || t("an_unexpected_error_occurred_please_try_again")
    : null;

  useEffect(() => {
    if (data.isError && errorMessage) {
      toast({ title: errorMessage, variant: "destructive" });
      onErrorFn && onErrorFn(errorMessage);
    }
  }, [data.isError, errorMessage, toast, onErrorFn]);

  useEffect(() => {
    if (data.isSuccess) {
      onSuccessFn &&
        onSuccessFn(data as QueryObserverSuccessResult<TSelected, TError>);
    }
  }, [data.isSuccess, onSuccessFn, data]);

  return data;
};