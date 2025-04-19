import RFlex from "@/components/RComponents/RFlex";

export const LangElement = ({
  title,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <RFlex className="gap-1 items-center w-full">
      <span>{title}</span>
    </RFlex>
  );
};
