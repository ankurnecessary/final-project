import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Info } from "lucide-react";

type InfoPopoverProps = {
  children: JSX.Element;
  label: string; // Label for the info icon in the trigger component.
  contentOffset?: number;
};

function InfoPopover({ label, children, contentOffset }: InfoPopoverProps): JSX.Element {
  return (
    <Popover>
      <PopoverTrigger className="indent-[-10000px] inline-block h-[15px]">
          {label}
          <Info
            size={15}
            className="ml-1 text-neutral-500 cursor-help relative top-[-14px]"
          />
      </PopoverTrigger>
      <PopoverContent side="top" align="center" sideOffset={contentOffset}>
        <div data-testid="info-popover-content" className="bg-white p-2 border rounded-md shadow-lg">
          {children}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default InfoPopover;
