import React, { ChangeEvent, KeyboardEvent, useEffect } from "react";
import RFlex from "@/components/RComponents/RFlex";
import { Input } from "@/components/ui/input";
import { Loader, Search } from "lucide-react";
import { RSearchInputProps } from "@/types/index.type";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const RSearchInput: React.FC<RSearchInputProps> = ({
  searchLoading,
  searchData,
  handleSearchClicked,
  handleDataChanged,
  placeholder,
  inputDisabled = false,
  className = "w-[250px]",
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (searchData == "")
      handleSearchClicked()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchData])

  return (
    <RFlex className={cn(`relative h-fit w-[250px]`, className)}>
      <Input
        type="text"
        placeholder={placeholder ? t(placeholder) : t`search`}
        value={searchData}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          event.preventDefault();
          handleDataChanged(event.target.value);
        }}
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Enter" && handleSearchClicked) {
            handleSearchClicked();
          }
        }}
        disabled={inputDisabled}
        className="px-8"
      />

      {searchLoading ? (
        <RFlex>
          <Loader className="bsolute left-2 top-[30%] text-themeLight cursor-pointer" />
        </RFlex>
      ) : (
        <Search
          className={` absolute left-3 top-[50%] hover:text-muted-foreground -translate-y-1/2 w-4 h-4 text-themeLight cursor-pointer`}
          onClick={() => handleSearchClicked()}
        />
      )}

      {searchData !== "" && (
        <Cross2Icon
          aria-hidden="true"
          className={`absolute right-9 top-[50%] hover:text-muted-foreground -translate-y-1/2 w-4 h-4 text-themeLight cursor-pointer`}
          onClick={() => {
            if (searchData !== "") {
              handleDataChanged("");
              handleSearchClicked();
            }
          }}
        />
      )}
    </RFlex>
  );
};

export default RSearchInput;
