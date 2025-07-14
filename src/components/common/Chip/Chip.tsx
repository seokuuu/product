import React, { forwardRef } from 'react';

import { ChildrenProps } from '@/interfaces/common/ChildrenProps';
import { isMob } from '@/lib/deviceDetect';

export interface ChipProps extends ChildrenProps {
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  count?: number;
  datatype?: string;
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ isActive = false, count, disabled = false, ...props }, ref) => {
    const CHIP_DEFAULT = `text-gray-700 bg-white border border-gray-300 ${isMob ? '' : 'hover:bg-gray-50 '}`;
    const CHIP_ACTIVE = `text-white bg-blue-600 border border-blue-600`;
    const CHIP_DISABLED = `text-gray-400 bg-white border border-gray-200 cursor-not-allowed`;

    const initializeColor = () => {
      if (disabled) {
        return CHIP_DISABLED;
      }

      if (isActive) {
        return CHIP_ACTIVE;
      }

      return CHIP_DEFAULT;
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          BODY-14-B
          py-[8px] px-[12px]
          h-[34px] min-h-[34px] max-h-[34px]
          ${initializeColor()}
          flex justify-center items-center gap-[4px]
          rounded-full
          whitespace-nowrap select-none
          transition-all duration-200
        `}
        {...props}
      >
        {props.children}
        {count !== undefined && (
          <span
            className={`
            ml-1 px-1.5 py-0.5 text-xs rounded-full
            ${
              // eslint-disable-next-line no-nested-ternary
              isActive
                ? 'bg-white/20 text-white'
                : disabled
                  ? 'bg-gray-1 text-gray-2'
                  : 'bg-gray-1 text-gray-5'
            }
          `}
          >
            {count}
          </span>
        )}
      </button>
    );
  },
);

Chip.displayName = 'Chip';