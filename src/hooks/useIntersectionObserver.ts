import { useCallback, useRef } from 'react';

interface UseIntersectionObserverProps {
    hasMore: boolean;
    loading: boolean;
    onLoadMore: () => void;
}

export const useIntersectionObserver = ({
                                            hasMore,
                                            loading,
                                            onLoadMore,
                                        }: UseIntersectionObserverProps) => {
    const observer = useRef<IntersectionObserver | null>(null);

    const lastElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    onLoadMore();
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore, onLoadMore]
    );

    return { lastElementRef };
};