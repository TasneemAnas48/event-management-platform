import { Loader2 } from "lucide-react";
const RLoader = () => {
  return (
    <div className="flex justify-center items-center w-full h-[100vh]">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );
};

export default RLoader;
