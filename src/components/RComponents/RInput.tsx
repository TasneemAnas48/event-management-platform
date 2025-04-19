import { Input } from "@/components/ui/input";
import { RInputProps } from "@/types/index.type";
import { Loader } from "lucide-react";

const RInput: React.FC<RInputProps> = ({
  className,
  inputClassName,
  isLoading,
  inputError,
  ...props
}) => {
  return (
    <div className={`relative ${className || ""}`}>
      <Input
        {...props}
        className={`${inputError ? " shadow-[0px_0px_5px_0px_#dd0000] focus-visible:ring-0" : ""} ${inputClassName || ""}`}
      />
      {isLoading && <Loader className={`fa-sm right-3 top-1/2 absolute`} />}
    </div>
  );
};

export default RInput;
