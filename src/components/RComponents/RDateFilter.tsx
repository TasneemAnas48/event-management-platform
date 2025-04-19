import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/useMobile";
import { cn } from "@/lib/utils";
import RButton from "@/components/RComponents/RButton";
import RFlex from "@/components/RComponents/RFlex";
import RInput from "@/components/RComponents/RInput";
import RPopover from "@/components/RComponents/RPopover";
import { ArrowBigDownIcon, ArrowBigRight, Filter } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const RDateFilter = ({
  backChecked,
  setBackChecked,
  triggerClassName,
  orentation = "vertical",
}: {
  backChecked: boolean;
  setBackChecked: React.Dispatch<React.SetStateAction<any>>;
  triggerClassName?: string;
  orentation?: "horizontal" | "vertical";
}) => {
  const { t } = useTranslation();
  const [frontChecked, setFronChecked] = useState<any>(backChecked);
  const isMobile = useIsMobile();
  const currenOorentation = isMobile ? "vertical" : orentation;
  return (
    <RPopover
      triggerComponent={
        <Button variant="ghost" className="p-0 hover:bg-transparent w-fit">
          <Filter className={cn("w-4 h-4", triggerClassName)} />
        </Button>
      }
      contentClassName="w-fit"
      contentComponent={
        <RFlex className="flex-col">
          <RFlex className="gap-1">
            <Checkbox
              id="range"
              checked={frontChecked}
              onCheckedChange={(checked) => setFronChecked(checked)}
            />
            <Label htmlFor="range" className="cursor-pointer">
              {t("range")}
            </Label>
          </RFlex>
          <RFlex className="flex-col items-end">
            <RFlex
              className={`${currenOorentation == "vertical" ? "flex-col" : ""} gap-1 items-center`}
            >
              <RInput type="date" />
              {frontChecked && (
                <>
                  {currenOorentation == "vertical" ? (
                    <ArrowBigDownIcon />
                  ) : (
                    <ArrowBigRight />
                  )}
                  <RInput type="date" />
                </>
              )}
            </RFlex>
            <RButton
              text="filter"
              onClick={() => {
                setBackChecked(frontChecked);
              }}
            />
          </RFlex>
        </RFlex>
      }
    />
  );
};

export default RDateFilter;
