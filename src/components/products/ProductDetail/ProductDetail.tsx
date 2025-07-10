import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useProductDetailStore } from '@/store/useProductDetailStore';
import { useProductStore } from '@/store/useProductStore';
import ProductImageGallery from './ProductImageGallery';
import ProductReviews from './ProductReviews';
import ProductMetadata from './ProductMetadata';
import CounterInput from '@/components/common/CounterInput/CounterInput';
import { Spinner } from '@/components/common/Spinner/Spinner';

const ProductDetail: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [orderQuantity, setOrderQuantity] = useState(1);

    const { product, loading, error, fetchProduct } = useProductDetailStore();
    const { searchProducts } = useProductStore();

    useEffect(() => {
        if (id && typeof id === 'string') {
            fetchProduct(id);
        }
    }, [id, fetchProduct]);

    useEffect(() => {
        if (product) {
            setOrderQuantity(product.minimumOrderQuantity);
        }
    }, [product]);

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

    const handleTagClick = async (tag: string) => {
        await searchProducts(tag);
        router.push('/');
    };

    // 구조화된 데이터 (JSON-LD) 생성
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.title,
        "description": product.description,
        "image": product.images,
        "brand": {
            "@type": "Brand",
            "name": product.brand
        },
        "category": product.category,
        "sku": product.sku,
        "offers": {
            "@type": "Offer",
            "price": discountedPrice.toFixed(2),
            "priceCurrency": "USD",
            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "seller": {
                "@type": "Organization",
                "name": "ARTINUS Shop"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating,
            "reviewCount": product.reviews.length
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 pb-24 md:pb-8">
            {/* JSON-LD 구조화된 데이터 */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData, null, 2)
                }}
            />

            {/* Breadcrumb */}
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
                {/* Image Gallery */}
                <div>
                    <ProductImageGallery images={product.images} title={product.title} />
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-6">
                    {/* Basic Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm text-gray-500 capitalize">{product.brand}</span>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-500 capitalize">{product.category}</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.title}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center">
                                <span className="text-yellow-500">★</span>
                                <span className="ml-1 font-medium">{product.rating.toFixed(1)}</span>
                            </div>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-600">{product.reviews.length}개 리뷰</span>
                        </div>

                        {/* Price */}
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

                    {/* Description */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">상품 설명</h3>
                        <p className="text-gray-700 leading-relaxed">{product.description}</p>
                    </div>

                    {/* Tags */}
                    {product.tags && product.tags.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-3">태그</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.tags.map((tag, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleTagClick(tag)}
                                        className="px-3 py-1 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors cursor-pointer"
                                    >
                                        #{tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Stock Status */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">재고 정보</h3>
                        <div className="space-y-3">
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
                            
                            {/* 최소 주문 수량 */}
                            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                <div>
                                    <div className="font-medium text-yellow-800">최소 주문 수량</div>
                                    <div className="text-sm text-yellow-600">한 번에 주문할 수 있는 최소 개수입니다</div>
                                </div>
                                <div className="text-lg font-bold text-yellow-800">
                                    {product.minimumOrderQuantity}개
                                </div>
                            </div>

                            {/* 주문 가능 여부 */}
                            <div className="p-3 border rounded-lg">
                                {product.stock >= product.minimumOrderQuantity ? (
                                    <div className="flex items-center gap-2 text-green-600">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span className="font-medium">주문 가능</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-red-600">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <span className="font-medium">
                                            {product.stock === 0 ? '품절' : '재고 부족'}
                                        </span>
                                    </div>
                                )}
                                <div className="text-sm text-gray-600 mt-1">
                                    {product.stock >= product.minimumOrderQuantity 
                                        ? `최소 ${product.minimumOrderQuantity}개부터 주문 가능합니다`
                                        : product.stock === 0 
                                            ? '현재 재고가 없습니다'
                                            : `재고가 부족합니다 (현재 ${product.stock}개, 최소 ${product.minimumOrderQuantity}개 필요)`
                                    }
                                </div>
                            </div>

                            {/* 주문 수량 선택 */}
                            {product.stock >= product.minimumOrderQuantity && (
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                    <div>
                                        <div className="font-medium text-blue-800">주문 수량</div>
                                        <div className="text-sm text-blue-600">원하는 수량을 선택해주세요</div>
                                    </div>
                                    <CounterInput
                                        count={orderQuantity}
                                        setCount={setOrderQuantity}
                                        minCount={product.minimumOrderQuantity}
                                        maxCount={product.stock}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Additional Info */}
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
                                <span className="text-gray-600">크기:</span>
                                <span className="font-medium">{product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm</span>
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

                    {/* Purchase Button - Desktop */}
                    <div className="pt-6 hidden md:block">
                        <button
                            onClick={() => setShowServiceModal(true)}
                            className="w-full px-6 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            disabled={product.stock < product.minimumOrderQuantity}
                        >
                            {product.stock < product.minimumOrderQuantity ? '구매 불가' : '구매하기'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Additional sections */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 리뷰 섹션 */}
                <div className="lg:col-span-2">
                    <ProductReviews reviews={product.reviews} rating={product.rating} />
                </div>

                {/* 메타데이터 */}
                <div className="lg:col-span-2">
                    <ProductMetadata
                        sku={product.sku}
                        barcode={product.meta?.barcode}
                        qrCode={product.meta?.qrCode}
                        createdAt={product.meta?.createdAt}
                        updatedAt={product.meta?.updatedAt}
                    />
                </div>
            </div>

            {/* Mobile Fixed Purchase Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-40">
                <button
                    onClick={() => setShowServiceModal(true)}
                    className="w-full px-6 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={product.stock < product.minimumOrderQuantity}
                >
                    {product.stock < product.minimumOrderQuantity ? '구매 불가' : '구매하기'}
                </button>
            </div>

            {/* Service Modal */}
            {showServiceModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <div className="text-center">
                            <div className="mb-4">
                                <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-yellow-600 text-2xl">⚠️</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">서비스 준비중입니다</h3>
                                <p className="text-gray-600">
                                    현재 구매 기능을 준비중입니다.<br />
                                    빠른 시일 내에 서비스를 제공하겠습니다.
                                </p>
                            </div>
                            <button
                                onClick={() => setShowServiceModal(false)}
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;