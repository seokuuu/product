import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useProductDetailStore } from '@/store/useProductDetailStore';
import ProductImageGallery from './ProductImageGallery';
import { Spinner } from '@/components/common/Spinner/Spinner';

const ProductDetail: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    const { product, loading, error, fetchProduct } = useProductDetailStore();

    useEffect(() => {
        if (id && typeof id === 'string') {
            fetchProduct(id);
        }
    }, [id, fetchProduct]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="60px" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <h2 className="text-xl font-semibold text-red-600">오류가 발생했습니다</h2>
                <p className="text-gray-600">{error}</p>
                <div className="flex gap-4">
                    <button
                        onClick={() => id && typeof id === 'string' && fetchProduct(id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        다시 시도
                    </button>
                    <Link
                        href="/"
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                        목록으로 돌아가기
                    </Link>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <h2 className="text-xl font-semibold">상품을 찾을 수 없습니다</h2>
                <Link
                    href="/"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    목록으로 돌아가기
                </Link>
            </div>
        );
    }

    const hasDiscount = product.discountPercentage > 0;
    const discountedPrice = hasDiscount
        ? product.price * (1 - product.discountPercentage / 100)
        : product.price;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* 브레드크럼 */}
            <nav className="mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Link href="/" className="hover:text-blue-600">
                        홈
                    </Link>
                    <span>/</span>
                    <span className="capitalize">{product.category}</span>
                    <span>/</span>
                    <span className="text-gray-900 font-medium truncate">{product.title}</span>
                </div>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* 이미지 갤러리 */}
                <div>
                    <ProductImageGallery images={product.images} title={product.title} />
                </div>

                {/* 상품 정보 */}
                <div className="flex flex-col gap-6">
                    {/* 기본 정보 */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm text-gray-500 capitalize">{product.brand}</span>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-500 capitalize">{product.category}</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.title}</h1>

                        {/* 평점 */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center">
                                <span className="text-yellow-500">★</span>
                                <span className="ml-1 font-medium">{product.rating.toFixed(1)}</span>
                            </div>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-600">{product.reviews.length}개 리뷰</span>
                        </div>

                        {/* 가격 */}
                        <div className="mb-6">
                            {hasDiscount && (
                                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-semibold text-red-500">
                    {Math.round(product.discountPercentage)}% 할인
                  </span>
                                    <span className="text-gray-400 line-through">${product.price.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="text-3xl font-bold text-gray-900">
                                ${discountedPrice.toFixed(2)}
                            </div>
                        </div>
                    </div>

                    {/* 설명 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">상품 설명</h3>
                        <p className="text-gray-700 leading-relaxed">{product.description}</p>
                    </div>

                    {/* 태그 */}
                    {product.tags && product.tags.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-3">태그</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                    >
                    #{tag}
                  </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 재고 상태 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">재고 정보</h3>
                        <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded text-sm font-medium ${
                  product.stock > 0
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
              }`}>
                {product.stock > 0 ? `재고 ${product.stock}개` : '품절'}
              </span>
                            <span className="text-sm text-gray-600">{product.availabilityStatus}</span>
                        </div>
                    </div>

                    {/* 추가 정보 */}
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold mb-3">추가 정보</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">브랜드:</span>
                                <span className="font-medium">{product.brand}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">SKU:</span>
                                <span className="font-medium">{product.sku}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">무게:</span>
                                <span className="font-medium">{product.weight}kg</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">보증:</span>
                                <span className="font-medium">{product.warrantyInformation}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">배송:</span>
                                <span className="font-medium">{product.shippingInformation}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">반품 정책:</span>
                                <span className="font-medium">{product.returnPolicy}</span>
                            </div>
                        </div>
                    </div>

                    {/* 뒤로 가기 버튼 */}
                    <div className="pt-6">
                        <Link
                            href="/"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            ← 상품 목록으로 돌아가기
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;