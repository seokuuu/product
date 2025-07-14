import React, { forwardRef } from 'react';

import { Chip, ChipProps } from '@/components/common/Chip/Chip';

export interface CategoryChipProps extends Omit<ChipProps, 'children'> {
  category: string;
  showCount?: boolean;
  productCount?: number;
}

export const CategoryChip = forwardRef<HTMLButtonElement, CategoryChipProps>(
  ({ category, showCount = false, productCount, ...props }, ref) => {
    const formatCategoryName = (categoryName: string) => {
      return categoryName.charAt(0).toUpperCase() + categoryName.slice(1).replace('-', ' ');
    };

    return (
      <Chip
        ref={ref}
        count={showCount ? productCount : undefined}
        datatype="category"
        {...props}
      >
        {formatCategoryName(category)}
      </Chip>
    );
  },
);

CategoryChip.displayName = 'CategoryChip';