import { create } from 'zustand';
import { Product } from '@/types/product';
import { productAPI } from '@/services/productAPI';

interface ProductStore {
    // State
    products: Product[];
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    skip: number;
    total: number;

    // Filter state
    currentCategory: string;
    currentSort: string;
    currentOrder: string;
    currentSearchQuery: string;

    // Actions
    fetchProducts: () => Promise<void>;
    fetchProductsWithSort: (sortBy: string, order: string) => Promise<void>;
    fetchProductsByCategory: (category: string, sortBy?: string, order?: string) => Promise<void>;
    loadMoreProducts: () => Promise<void>;
    resetProducts: () => void;
    searchProducts: (query: string) => Promise<void>;
}

const LIMIT = 20;

export const useProductStore = create<ProductStore>((set, get) => ({
    // Initial state
    products: [],
    loading: false,
    error: null,
    hasMore: true,
    skip: 0,
    total: 0,

    // Filter state
    currentCategory: '',
    currentSort: 'title',
    currentOrder: 'asc',
    currentSearchQuery: '',

    // Fetch initial products
    fetchProducts: async () => {
        set({ loading: true, error: null, currentCategory: '', currentSort: 'title', currentOrder: 'asc', currentSearchQuery: '' });

        try {
            const response = await productAPI.getProducts(LIMIT, 0);

            set({
                products: response.products,
                total: response.total,
                skip: LIMIT,
                hasMore: response.products.length === LIMIT && response.skip + LIMIT < response.total,
                loading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch products',
                loading: false,
                hasMore: false,
            });
        }
    },

    // Fetch products with sorting
    fetchProductsWithSort: async (sortBy: string, order: string) => {
        set({ loading: true, error: null, currentSort: sortBy, currentOrder: order, currentCategory: '', currentSearchQuery: '' });

        try {
            const response = await productAPI.getProductsWithSort(sortBy, order, LIMIT, 0);

            set({
                products: response.products,
                total: response.total,
                skip: LIMIT,
                hasMore: response.products.length === LIMIT && response.skip + LIMIT < response.total,
                loading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch sorted products',
                loading: false,
                hasMore: false,
            });
        }
    },

    // Fetch products by category
    fetchProductsByCategory: async (category: string, sortBy: string = 'title', order: string = 'asc') => {
        set({ loading: true, error: null, currentCategory: category, currentSort: sortBy, currentOrder: order, currentSearchQuery: '' });

        try {
            const response = await productAPI.getProductsByCategory(category, sortBy, order, LIMIT, 0);

            set({
                products: response.products,
                total: response.total,
                skip: LIMIT,
                hasMore: response.products.length === LIMIT && response.skip + LIMIT < response.total,
                loading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch products by category',
                loading: false,
                hasMore: false,
            });
        }
    },

    // Load more products (infinite scroll)
    loadMoreProducts: async () => {
        const { loading, hasMore, skip, products, currentCategory, currentSort, currentOrder, currentSearchQuery } = get();

        if (loading || !hasMore) return;

        set({ loading: true });

        try {
            let response;

            if (currentSearchQuery) {
                response = await productAPI.searchProducts(currentSearchQuery, LIMIT, skip);
            } else if (currentCategory) {
                response = await productAPI.getProductsByCategory(currentCategory, currentSort, currentOrder, LIMIT, skip);
            } else if (currentSort !== 'title' || currentOrder !== 'asc') {
                response = await productAPI.getProductsWithSort(currentSort, currentOrder, LIMIT, skip);
            } else {
                response = await productAPI.getProducts(LIMIT, skip);
            }

            set({
                products: [...products, ...response.products],
                skip: skip + LIMIT,
                hasMore: response.products.length === LIMIT && response.skip + LIMIT < response.total,
                loading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to load more products',
                loading: false,
                hasMore: false,
            });
        }
    },

    // Reset products state
    resetProducts: () => {
        set({
            products: [],
            loading: false,
            error: null,
            hasMore: true,
            skip: 0,
            total: 0,
            currentCategory: '',
            currentSort: 'title',
            currentOrder: 'asc',
            currentSearchQuery: '',
        });
    },

    // Search products
    searchProducts: async (query: string) => {
        set({ loading: true, error: null, currentSearchQuery: query, currentCategory: '', currentSort: 'title', currentOrder: 'asc' });

        try {
            const response = await productAPI.searchProducts(query, LIMIT, 0);

            set({
                products: response.products,
                total: response.total,
                skip: LIMIT,
                hasMore: response.products.length === LIMIT && response.skip + LIMIT < response.total,
                loading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to search products',
                loading: false,
                hasMore: false,
            });
        }
    },
}));