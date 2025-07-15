import React, { useEffect } from 'react';
import { useProductStore } from '@/store/useProductStore';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import ProductCard from '@/components/products/ProductCard/ProductCard';
import { Spinner } from '@/components/common/Spinner/Spinner';
import NoResultProduct from '@/components/common/NoResult/NoResultProduct';
import { ProductListProps } from '@/types/product';

const ProductList: React.FC<ProductListProps> = ({ className = '' }) => {
    const {
        products,
        loading,
        infiniteLoading,
        error,
        hasMore,
        fetchProducts,
        loadMoreProducts,
    } = useProductStore();

    const { lastElementRef } = useIntersectionObserver({
        hasMore,
        loading: infiniteLoading,
        onLoadMore: loadMoreProducts,
    });

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, [products.length]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-96 gap-4">
                <div className="text-red-500 text-center">
                    <h3 className="text-lg font-semibold mb-2">오류가 발생했습니다</h3>
                    <p className="text-sm">{error}</p>
                </div>
                <button
                    onClick={fetchProducts}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    다시 시도
                </button>
            </div>
        );
    }

    if (products.length === 0 && !loading) {
        return <NoResultProduct />;
    }

    return (
        <div className={`w-full ${className}`}>
            {/* 상품 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {products.map((product, index) => (
                    <div
                        key={`${product.id}-${index}`}
                        ref={index === products.length - 1 ? lastElementRef : undefined}
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

            {/* 초기 로딩 스피너 (상품이 없을 때만) */}
            {loading && products.length === 0 && (
                <div className="flex justify-center items-center py-8">
                    <Spinner size="40px" />
                </div>
            )}

            {/* 무한 스크롤 로딩 스피너 (작은 스피너) */}
            {infiniteLoading && (
                <div className="flex justify-center items-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-blue-500"></div>
                </div>
            )}

            {/* 목록 끝 */}
            {!hasMore && products.length > 0 && !infiniteLoading && (
                <div className="text-center py-8 text-gray-500">
                    <p>모든 상품을 불러왔습니다. (총 {products.length}개)</p>
                </div>
            )}
        </div>
    );
};

export default ProductList;