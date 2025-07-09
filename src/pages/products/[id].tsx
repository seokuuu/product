import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ProductDetail from '@/components/products/ProductDetail/ProductDetail';
import { useProductDetailStore } from '@/store/useProductDetailStore';

const ProductDetailPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const { product } = useProductDetailStore();

    const pageTitle = product
        ? `${product.title} - ARTINUS Shop`
        : 'Loading... - ARTINUS Shop';

    const pageDescription = product
        ? `${product.description.slice(0, 160)}...`
        : 'ARTINUS 프론트엔드 개발자 과제 - 상품 상세 페이지';

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                {/* Open Graph Meta Tags */}
                {product && (
                    <>
                        <meta property="og:title" content={product.title} />
                        <meta property="og:description" content={product.description} />
                        <meta property="og:image" content={product.thumbnail} />
                        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.id}`} />
                        <meta property="og:type" content="product" />
                    </>
                )}
            </Head>

            <main className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-900">
                                <a href="/" className="hover:text-blue-600 transition-colors">
                                    ARTINUS Shop
                                </a>
                            </h1>
                            <div className="text-sm text-gray-600">
                                상품 상세
                            </div>
                        </div>
                    </div>
                </header>

                {/* Product Detail Content */}
                <ProductDetail />
            </main>
        </>
    );
};

export default ProductDetailPage;