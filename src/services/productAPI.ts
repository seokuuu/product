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
    getProductsByCategory: async (category: string, limit: number = 20, skip: number = 0): Promise<ProductsResponse> => {
        try {
            const response = await fetch(`${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Failed to fetch products for category ${category}:`, error);
            throw error;
        }
    }
};