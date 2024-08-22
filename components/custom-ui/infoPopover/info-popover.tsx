import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Info } from "lucide-react";

type InfoPopoverProps = {
  children: JSX.Element;
};

function InfoPopover({ children }: InfoPopoverProps): JSX.Element {
  return (
    <Popover>
      <PopoverTrigger>
        <Info size={15} className="ml-1 text-neutral-500 cursor-help" />
      </PopoverTrigger>
      <PopoverContent side="top" align="center">
        <div className="bg-white p-2 border rounded-md mb-1 shadow-lg">
          {children}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default InfoPopover;
