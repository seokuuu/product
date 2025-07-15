import React from 'react';
import ExpandableSearchBar from "@/components/common/SearchBar/ExpandableSearchBar";
import CategoryChipFilter from "@components/common/Filter/CategoryChipFilter";
import { OrderOption, SortOption } from "@components/common/Filter/SortFilter";

interface FilterSectionProps {
  currentSearchQuery: string;
  currentCategory: string | null;
  currentSort: SortOption;
  currentOrder: OrderOption;
  loading: boolean;
  onSearchReset: () => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sortBy: SortOption, order: OrderOption) => void;
  filterChips: Array<{
    type: string;
    label: string;
    color: string;
  }>;
  onReset: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  currentSearchQuery,
  currentCategory,
  currentSort,
  currentOrder,
  loading,
  onSearchReset,
  onCategoryChange,
  onSortChange,
  filterChips,
  onReset,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="flex justify-center">
          <ExpandableSearchBar
            placeholder="상품명을 검색하세요..."
            onSearch={onSearchReset}
          />
        </div>

        {/* Category & Sort Filter - 검색 중에는 숨김 */}
        {!currentSearchQuery && (
          <>
            {/* Category Filter */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <CategoryChipFilter
                onCategoryChange={onCategoryChange}
                selectedCategory={currentCategory ?? undefined}
              />
            </div>

            {/* Sort Filter */}
            <div className="flex justify-end items-center gap-4">
              <div className="flex items-center gap-2">
                <select
                  value={currentSort}
                  onChange={(e) =>
                    onSortChange(
                      e.target.value as SortOption,
                      currentOrder
                    )
                  }
                  disabled={loading}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="title">이름순</option>
                  <option value="price">가격순</option>
                  <option value="rating">평점순</option>
                  <option value="stock">재고순</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={currentOrder}
                  onChange={(e) =>
                    onSortChange(
                      currentSort,
                      e.target.value as OrderOption
                    )
                  }
                  disabled={loading}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="asc">오름차순</option>
                  <option value="desc">내림차순</option>
                </select>
              </div>
            </div>
          </>
        )}

        {/* Filter Status Chips */}
        {filterChips.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-gray-50 rounded-lg border">
            <div className="flex flex-wrap items-center gap-2">
              {filterChips.map((chip, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 text-sm font-medium rounded-full ${chip.color}`}
                >
                  {chip.label}
                </span>
              ))}
            </div>
            <button
              onClick={onReset}
              className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-full hover:bg-white transition-colors"
            >
              초기화
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSection;