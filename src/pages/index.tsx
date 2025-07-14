import React, { useState } from "react";
import Head from "next/head";
import ProductList from "@/components/products/ProductList/ProductList";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import SortFilter, {
  OrderOption,
  SortOption,
} from "@components/common/Filter/SortFilter";
import CategoryChipFilter from "@components/common/Filter/CategoryChipFilter";
import { useProductStore } from "@/store/useProductStore";

const HomePage: React.FC = () => {
  const [currentSearch, setCurrentSearch] = useState("");
  const [currentSort, setCurrentSort] = useState<SortOption>("title");
  const [currentOrder, setCurrentOrder] = useState<OrderOption>("asc");
  const [currentCategory, setCurrentCategory] = useState("");
  const { fetchProductsByCategory, fetchProductsWithSort, fetchProducts } =
    useProductStore();

  const handleSearch = (query: string) => {
    setCurrentSearch(query);
    // 검색 시 다른 필터 초기화
    if (query) {
      setCurrentCategory("");
      setCurrentSort("title");
      setCurrentOrder("asc");
    }
  };

  const handleSortChange = (sortBy: SortOption, order: OrderOption) => {
    setCurrentSort(sortBy);
    setCurrentOrder(order);
    // 정렬 변경 시 검색 초기화
    setCurrentSearch("");

    // API 호출
    if (currentCategory) {
      fetchProductsByCategory(currentCategory, sortBy, order);
    } else {
      fetchProductsWithSort(sortBy, order);
    }
  };

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    // 카테고리 변경 시 검색 초기화
    setCurrentSearch("");

    // API 호출
    if (category) {
      fetchProductsByCategory(category, currentSort, currentOrder);
    } else {
      // 전체 선택 시 기본 상품 로드
      if (currentSort !== "title" || currentOrder !== "asc") {
        fetchProductsWithSort(currentSort, currentOrder);
      } else {
        fetchProducts();
      }
    }
  };

  const getFilterChips = () => {
    const chips = [];

    if (currentSearch) {
      chips.push({
        type: "search",
        label: `검색: "${currentSearch}"`,
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
              <h1 className="text-3xl font-bold text-gray-900">ARTINUS Shop</h1>
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
              <SearchBar
                placeholder="상품명을 검색하세요..."
                onSearch={handleSearch}
              />
            </div>

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
                    handleSortChange(e.target.value as SortOption, currentOrder)
                  }
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    handleSortChange(currentSort, e.target.value as OrderOption)
                  }
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="asc">오름차순</option>
                  <option value="desc">내림차순</option>
                </select>
              </div>
            </div>

            {/* Filter Status Chips */}
            {getFilterChips().length > 0 && (
              <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 rounded-lg border">
                {getFilterChips().map((chip, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-sm font-medium rounded-full ${chip.color}`}
                  >
                    {chip.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {currentSearch
                ? `"${currentSearch}" 검색 결과`
                : currentCategory
                ? `${
                    currentCategory.charAt(0).toUpperCase() +
                    currentCategory.slice(1).replace("-", " ")
                  } 상품`
                : "전체 상품"}
            </h2>
          </div>

          <ProductList />
        </div>

        {/* Footer */}
        <footer className="bg-white border-t mt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center text-gray-600">
              <p>
                &copy; 2024 ARTINUS Frontend Assignment. All rights reserved.
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
