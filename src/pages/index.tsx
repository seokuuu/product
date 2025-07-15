import React, { useState } from "react";
import Head from "next/head";
import Header from "@/components/common/Header/Header";
import FilterSection from "@/components/common/FilterSection/FilterSection";
import MainContent from "@/components/common/MainContent/MainContent";
import Footer from "@/components/common/Footer/Footer";
import {
  OrderOption,
  SortOption,
} from "@components/common/Filter/SortFilter";
import { useProductStore } from "@/store/useProductStore";

const HomePage: React.FC = () => {
  const [currentSort, setCurrentSort] = useState<SortOption>("title");
  const [currentOrder, setCurrentOrder] = useState<OrderOption>("asc");
  const {
    fetchProductsByCategory,
    fetchProductsWithSort,
    fetchProducts,
    resetProducts,
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
      fetchProductsWithSort(currentSort, currentOrder);
    }
  };

  const handleLogoClick = () => {
    // 검색 결과와 필터 초기화
    setCurrentSort("title");
    setCurrentOrder("asc");
    resetProducts();
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
        <Header onLogoClick={handleLogoClick} />
        
        <FilterSection
          currentSearchQuery={currentSearchQuery}
          currentCategory={currentCategory}
          currentSort={currentSort}
          currentOrder={currentOrder}
          loading={loading}
          onSearchReset={handleSearchReset}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
          filterChips={getFilterChips()}
          onReset={handleLogoClick}
        />

        <MainContent
          currentSearchQuery={currentSearchQuery}
          currentCategory={currentCategory}
          products={products}
          searchLoading={searchLoading}
          loading={loading}
        />

        <Footer />
      </main>
    </>
  );
};

export default HomePage;
