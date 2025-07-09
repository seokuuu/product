import React from 'react';
import Head from 'next/head';
import ProductList from '@/components/products/ProductList/ProductList';

const HomePage: React.FC = () => {
    return (
        <>
            <Head>
                <title>ARTINUS 상품 목록</title>
                <meta name="description" content="ARTINUS 프론트엔드 개발자 과제 - 상품 목록 페이지" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-gray-900">
                                ARTINUS Shop
                            </h1>
                            <div className="text-sm text-gray-600">
                                프론트엔드 개발자 과제
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                            전체 상품
                        </h2>
                        <p className="text-gray-600">
                            다양한 카테고리의 상품들을 둘러보세요. 스크롤하면 더 많은 상품을 볼 수 있습니다.
                        </p>
                    </div>

                    <ProductList />
                </div>

                {/* Footer */}
                <footer className="bg-white border-t mt-16">
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <div className="text-center text-gray-600">
                            <p>&copy; 2024 ARTINUS Frontend Assignment. All rights reserved.</p>
                            <p className="mt-2 text-sm">
                                Powered by{' '}
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