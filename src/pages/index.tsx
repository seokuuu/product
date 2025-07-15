import React, { useState } from "react";
import Head from "next/head";
import ProductList from "@/components/products/ProductList/ProductList";
import ExpandableSearchBar from "@/components/common/SearchBar/ExpandableSearchBar";
import SortFilter, {
  OrderOption,
  SortOption,
} from "@components/common/Filter/SortFilter";
import CategoryChipFilter from "@components/common/Filter/CategoryChipFilter";
import { useProductStore } from "@/store/useProductStore";

const HomePage: React.FC = () => {
  const [currentSort, setCurrentSort] = useState<SortOption>("title");
  const [currentOrder, setCurrentOrder] = useState<OrderOption>("asc");
  const {
    fetchProductsByCategory,
    fetchProductsWithSort,
    fetchProducts,
    currentSearchQuery,
    products,
    currentCategory,
    searchLoading,
    loading,
  } = useProductStore();

  // 검색 시 카테고리와 정렬 상태 초기화
  const handleSearchReset = () => {
    setCurrentSort("title");
    setCurrentOrder("asc");
  };

  const handleSortChange = (sortBy: SortOption, order: OrderOption) => {
    setCurrentSort(sortBy);
    setCurrentOrder(order);

    // 카테고리와 정렬을 함께 API 호출
    if (currentCategory) {
      fetchProductsByCategory(currentCategory, sortBy, order);
    } else {
      fetchProductsWithSort(sortBy, order);
    }
  };

  const handleCategoryChange = (category: string) => {
    // 카테고리와 정렬을 함께 API 호출
    if (category) {
      fetchProductsByCategory(category, currentSort, currentOrder);
    } else {
      // 전체 선택 시 현재 정렬 유지
      if (currentSort !== "title" || currentOrder !== "asc") {
        fetchProductsWithSort(currentSort, currentOrder);
      } else {
        fetchProducts();
      }
    }
  };

  const handleLogoClick = () => {
    // 검색 결과와 필터 초기화
    setCurrentSort("title");
    setCurrentOrder("asc");
    fetchProducts();
  };

  const getFilterChips = () => {
    const chips = [];

    if (currentSearchQuery) {
      chips.push({
        type: "search",
        label: `검색: "${currentSearchQuery}"`,
        color: "bg-purple-100 text-purple-800",
      });
    }

    if (currentCategory) {
      chips.push({
        type: "category",
        label: `카테고리: ${
          currentCategory.charAt(0).toUpperCase() +
          currentCategory.slice(1).replace("-", " ")
        }`,
        color: "bg-blue-100 text-blue-800",
      });
    }

    if (currentSort !== "title" || currentOrder !== "asc") {
      const sortLabel = {
        title: "이름",
        price: "가격",
        rating: "평점",
        stock: "재고",
      }[currentSort];
      chips.push({
        type: "sort",
        label: `정렬: ${sortLabel} ${currentOrder === "asc" ? "↑" : "↓"}`,
        color: "bg-green-100 text-green-800",
      });
    }

    return chips;
  };

  return (
    <>
      <Head>
        <title>ARTINUS 상품 목록</title>
        <meta
          name="description"
          content="ARTINUS 프론트엔드 개발자 과제 - 상품 목록 페이지"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <button
                onClick={handleLogoClick}
                className="text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
              >
                ARTINUS Shop
              </button>
              <div className="text-sm text-gray-600">
                프론트엔드 개발자 과제
              </div>
            </div>
          </div>
        </header>

        {/* Search & Filter Section */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex justify-center">
              <ExpandableSearchBar
                placeholder="상품명을 검색하세요..."
                onSearch={handleSearchReset}
              />
            </div>

            {/* Category & Sort Filter - 검색 중에는 숨김 */}
            {!currentSearchQuery && (
              <>
                {/* Category Filter */}
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <CategoryChipFilter
                    onCategoryChange={handleCategoryChange}
                    selectedCategory={currentCategory}
                  />
                </div>

                {/* Sort Filter */}
                <div className="flex justify-end items-center gap-4">
                  <div className="flex items-center gap-2">
                    <select
                      value={currentSort}
                      onChange={(e) =>
                        handleSortChange(
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
                        handleSortChange(
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
            {getFilterChips().length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-gray-50 rounded-lg border">
                <div className="flex flex-wrap items-center gap-2">
                  {getFilterChips().map((chip, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 text-sm font-medium rounded-full ${chip.color}`}
                    >
                      {chip.label}
                    </span>
                  ))}
                </div>
                <button
                  onClick={handleLogoClick}
                  className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-full hover:bg-white transition-colors"
                >
                  초기화
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 pb-8 min-h-[60vh]">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {currentSearchQuery
                ? `"${currentSearchQuery}" 검색 결과`
                : currentCategory
                ? `${
                    currentCategory.charAt(0).toUpperCase() +
                    currentCategory.slice(1).replace("-", " ")
                  } 상품`
                : "전체 상품"}
            </h2>

            {/* 검색 결과 개수 표시 */}
            {currentSearchQuery && (
              <p className="text-sm text-gray-600 mb-4">
                총 {products.length}개의 상품이 검색되었습니다.
              </p>
            )}
          </div>

          {/* 로딩 스피너 (검색, 정렬, 카테고리 필터 등) */}
          {(searchLoading || loading) ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500"></div>
            </div>
          ) : /* 검색 결과가 없을 때 메시지 표시 */
          currentSearchQuery && products.length === 0 ? (
            <div className="text-center py-6">
              <svg
                className="w-12 h-12 mx-auto text-gray-400 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                검색 결과가 없습니다
              </h3>
              <p className="text-gray-600">
                "{currentSearchQuery}"에 대한 검색 결과를 찾을 수 없습니다.
                <br />
                다른 키워드로 검색해보세요.
              </p>
            </div>
          ) : (
            <ProductList />
          )}
        </div>

        {/* Footer */}
        <footer className="bg-white border-t mt-8">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center text-gray-600">
              <p>
                &copy; 2025 ARTINUS Frontend Assignment. All rights reserved.
              </p>
              <p className="mt-2 text-sm">
                Powered by{" "}
                <a
                  href="https://dummyjson.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  DummyJSON API
                </a>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default HomePage;
