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

    // Actions
    fetchProducts: () => Promise<void>;
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

    // Fetch initial products
    fetchProducts: async () => {
        set({ loading: true, error: null });

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

    // Load more products (infinite scroll)
    loadMoreProducts: async () => {
        const { loading, hasMore, skip, products } = get();

        if (loading || !hasMore) return;

        set({ loading: true });

        try {
            const response = await productAPI.getProducts(LIMIT, skip);

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
        });
    },

    // Search products
    searchProducts: async (query: string) => {
        set({ loading: true, error: null });

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