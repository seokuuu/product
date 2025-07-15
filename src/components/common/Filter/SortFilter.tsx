import React, { useState, useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import { DropDown } from "@components/common/Dropdown/Dropdown";
import { productAPI } from "@/services/productAPI";

export type SortOption = "title" | "price" | "rating" | "stock";
export type OrderOption = "asc" | "desc";

interface SortFilterProps {
  onSortChange?: (sortBy: SortOption, order: OrderOption) => void;
  onCategoryChange?: (category: string) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({
  onSortChange,
  onCategoryChange,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>("title");
  const [order, setOrder] = useState<OrderOption>("asc");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

  const { fetchProductsWithSort, fetchProductsByCategory, fetchProducts } =
    useProductStore();

  // 카테고리 옵션 생성
  const categoryOptions = [
    { value: "", name: "전체 카테고리" },
    ...categories.map((category) => ({
      value: category,
      name:
        category.charAt(0).toUpperCase() + category.slice(1).replace("-", " "),
    })),
  ];

  // 정렬 옵션 생성
  const sortOptions = [
    { value: "title", name: "이름순" },
    { value: "price", name: "가격순" },
    { value: "rating", name: "평점순" },
    { value: "stock", name: "재고순" },
  ];

  // 정렬 순서 옵션 생성
  const orderOptions = [
    { value: "asc", name: "오름차순" },
    { value: "desc", name: "내림차순" },
  ];

  // 현재 선택된 값들 찾기
  const selectedCategoryOption = categoryOptions.find(
    (opt) => opt.value === selectedCategory
  );
  const selectedSortOption = sortOptions.find((opt) => opt.value === sortBy);
  const selectedOrderOption = orderOptions.find((opt) => opt.value === order);

  // 카테고리 목록 로드
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryList = await productAPI.getCategoryList();
        setCategories(categoryList);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    loadCategories();
  }, []);

  const handleSortChange = (newSortBy: SortOption, newOrder: OrderOption) => {
    setSortBy(newSortBy);
    setOrder(newOrder);

    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory, newSortBy, newOrder);
    } else {
      fetchProductsWithSort(newSortBy, newOrder);
    }

    onSortChange?.(newSortBy, newOrder);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    if (category) {
      fetchProductsByCategory(category, sortBy, order);
    } else {
      fetchProductsWithSort(sortBy, order);
    }

    onCategoryChange?.(category);
  };

  const handleSortOptionChange = (option: any) => {
    const newSortBy = option.value as SortOption;
    handleSortChange(newSortBy, order);
  };

  const handleOrderOptionChange = (option: any) => {
    const newOrder = option.value as OrderOption;
    handleSortChange(sortBy, newOrder);
  };

  const handleCategoryOptionChange = (option: any) => {
    handleCategoryChange(option.value);
  };

  const handleReset = () => {
    // 상태 초기화
    setSortBy("title");
    setOrder("asc");
    setSelectedCategory("");

    // 전체 상품 로드
    fetchProducts();

    // 부모 컴포넌트에 초기화 상태 전달
    onSortChange?.("title", "asc");
    onCategoryChange?.("");
  };

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-lg shadow-sm border">
      {/* 카테고리 필터 */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
          카테고리:
        </label>
        <div className="w-48">
          <DropDown
            placeholder="카테고리 선택"
            selectedItem={selectedCategoryOption}
            options={categoryOptions}
            onSelected={handleCategoryOptionChange}
            maxCount={6}
          />
        </div>
      </div>

      {/* 정렬 기준 */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
          정렬:
        </label>
        <div className="w-32">
          <DropDown
            placeholder="정렬 선택"
            selectedItem={selectedSortOption}
            options={sortOptions}
            onSelected={handleSortOptionChange}
            maxCount={4}
          />
        </div>
      </div>

      {/* 정렬 순서 */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
          순서:
        </label>
        <div className="w-32">
          <DropDown
            placeholder="순서 선택"
            selectedItem={selectedOrderOption}
            options={orderOptions}
            onSelected={handleOrderOptionChange}
            maxCount={2}
          />
        </div>
      </div>

      {/* 리셋 버튼 */}
      <button
        onClick={handleReset}
        className="px-4 py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors whitespace-nowrap"
      >
        초기화
      </button>
    </div>
  );
};

export default SortFilter;
