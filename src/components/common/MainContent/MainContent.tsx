import React from 'react';
import ProductList from "@/components/products/ProductList/ProductList";

interface MainContentProps {
  currentSearchQuery: string;
  currentCategory: string | null;
  products: any[];
  searchLoading: boolean;
  loading: boolean;
}

const MainContent: React.FC<MainContentProps> = ({
  currentSearchQuery,
  currentCategory,
  products,
  searchLoading,
  loading,
}) => {
  return (
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
  );
};

export default MainContent;