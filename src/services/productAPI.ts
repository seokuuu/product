import { Product, ProductsResponse } from '@/types/product';

const BASE_URL = 'https://dummyjson.com';

export const productAPI = {
    // 상품 목록 조회
    getProducts: async (limit: number = 20, skip: number = 0): Promise<ProductsResponse> => {
        try {
            const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to fetch products:', error);
            throw error;
        }
    },

    // 상품 목록 조회 (정렬 포함)
    getProductsWithSort: async (
        sortBy: string,
        order: string,
        limit: number = 20,
        skip: number = 0
    ): Promise<ProductsResponse> => {
        try {
            const response = await fetch(
                `${BASE_URL}/products?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to fetch sorted products:', error);
            throw error;
        }
    },

    // 단일 상품 조회
    getProduct: async (id: string): Promise<Product> => {
        try {
            const response = await fetch(`${BASE_URL}/products/${id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Failed to fetch product ${id}:`, error);
            throw error;
        }
    },

    // 상품 검색
    searchProducts: async (query: string, limit: number = 20, skip: number = 0): Promise<ProductsResponse> => {
        try {
            const response = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to search products:', error);
            throw error;
        }
    },

    // 카테고리별 상품 조회
    getProductsByCategory: async (
        category: string,
        sortBy: string = 'title',
        order: string = 'asc',
        limit: number = 20,
        skip: number = 0
    ): Promise<ProductsResponse> => {
        try {
            const response = await fetch(
                `${BASE_URL}/products/category/${category}?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Failed to fetch products for category ${category}:`, error);
            throw error;
        }
    },

    // 카테고리 목록 조회
    getCategories: async (): Promise<Array<{ slug: string; name: string; url: string }>> => {
        try {
            const response = await fetch(`${BASE_URL}/products/categories`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            throw error;
        }
    },

    // 카테고리 리스트 조회 (간단한 문자열 배열)
    getCategoryList: async (): Promise<string[]> => {
        try {
            const response = await fetch(`${BASE_URL}/products/category-list`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to fetch category list:', error);
            throw error;
        }
    },

    // 최적화된 상품 조회 (선택된 필드만)
    getProductsOptimized: async (
        fields: string[] = ['id', 'title', 'price', 'thumbnail', 'rating', 'stock'],
        limit: number = 20,
        skip: number = 0
    ): Promise<ProductsResponse> => {
        try {
            const selectFields = fields.join(',');
            const response = await fetch(
                `${BASE_URL}/products?select=${selectFields}&limit=${limit}&skip=${skip}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to fetch optimized products:', error);
            throw error;
        }
    }
};