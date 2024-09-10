import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover';
import { Info } from 'lucide-react';

type InfoPopoverProps = {
  children: JSX.Element;
  label: string; // Label for the info icon in the trigger component.
  contentOffset?: number;
};

function InfoPopover({
  label,
  children,
  contentOffset,
}: InfoPopoverProps): JSX.Element {
  return (
    <Popover>
      <PopoverTrigger className="inline-block h-[15px] indent-[-10000px]">
        {label}
        <Info
          size={15}
          className="relative top-[-14px] ml-1 cursor-help text-neutral-500"
        />
      </PopoverTrigger>
      <PopoverContent side="top" align="center" sideOffset={contentOffset}>
        <div
          data-testid="info-popover-content"
          className="rounded-md border bg-white p-2 shadow-lg"
        >
          {children}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default InfoPopover;
