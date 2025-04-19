'use client';

import { Button } from "@/components/ui/button";
import RFlex from "@/components/RComponents/RFlex";
import { RButtonProps } from "@/types/index.type";
import { Loader } from "lucide-react";
import { useTranslation } from "react-i18next";

const RButton: React.FC<RButtonProps> = ({
  className,
  disabled = false,
  loading = false,
  onClick,
  hidden = false,
  Icon,
  text,
  type = "button",
  key,
  iconRight = false,
  variant = "default",
  textClassName,
  size = "default",
  ariaLabel,
}) => {
  const { t } = useTranslation();
  return (
    <Button
      key={key || ""}
      className={className}
      onClick={onClick}
      type={type}
      variant={variant}
      disabled={disabled}
      hidden={hidden}
      size={size}
      aria-label={ariaLabel}
    >
      {loading ? (
        <RFlex className="justify-center items-center">
          {text && <span>{t(text)}</span>}
          <Loader className="w-4 h-4 animate-spin" />
        </RFlex>
      ) : Icon && !text ? (
        <Icon className="w-4 h-4" />
      ) : text && Icon ? (
        <>
          {iconRight ? (
            <RFlex className="gap-[5px] items-center">
              {t(text)}
              <Icon className="w-4 h-4" />
            </RFlex>
          ) : (
            <RFlex className="items-center gap-[5px]">
              <Icon className="w-4 h-4" />
              {t(text)}
            </RFlex>
          )}
        </>
      ) : (
        <span className={textClassName}>{text && t(text)}</span>
      )}
    </Button>
  );
};

export default RButton;
