import { create } from 'zustand';
import { Product } from '@/types/product';
import { productAPI } from '@/services/productAPI';

interface ProductDetailStore {
    // State
    product: Product | null;
    loading: boolean;
    error: string | null;

    // Actions
    fetchProduct: (id: string) => Promise<void>;
    clearProduct: () => void;
}

export const useProductDetailStore = create<ProductDetailStore>((set) => ({
    // Initial state
    product: null,
    loading: false,
    error: null,

    // Fetch single product
    fetchProduct: async (id: string) => {
        set({ loading: true, error: null });

        try {
            const product = await productAPI.getProduct(id);

            set({
                product,
                loading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch product',
                loading: false,
                product: null,
            });
        }
    },

    // Clear
    clearProduct: () => {
        set({
            product: null,
            loading: false,
            error: null,
        });
    },
}));