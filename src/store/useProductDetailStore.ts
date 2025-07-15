import { create } from 'zustand';
import { Product } from '@/types/product';
import { productAPI } from '@/services/productAPI';

interface ProductDetailStore {
    // State
    product: Product | null;
    loading: boolean;
    error: string | null;
    currentProductId: string | null;

    // Actions
    fetchProduct: (id: string) => Promise<void>;
    clearProduct: () => void;
}

export const useProductDetailStore = create<ProductDetailStore>((set, get) => ({
    // Initial state
    product: null,
    loading: false,
    error: null,
    currentProductId: null,

    // Fetch single product
    fetchProduct: async (id: string) => {
        const { currentProductId, loading } = get();
        
        // 이미 같은 상품을 로딩 중이거나 로딩된 경우 중복 호출 방지
        if (currentProductId === id || loading) return;

        set({ loading: true, error: null, currentProductId: id });

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
                currentProductId: null,
            });
        }
    },

    // Clear
    clearProduct: () => {
        set({
            product: null,
            loading: false,
            error: null,
            currentProductId: null,
        });
    },
}));