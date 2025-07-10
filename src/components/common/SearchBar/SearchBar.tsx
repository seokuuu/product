import React, { useState, useEffect } from 'react';
import { useProductStore } from '@/store/useProductStore';

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
                                                 placeholder = "상품을 검색하세요...",
                                                 onSearch
                                             }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const { searchProducts, fetchProducts } = useProductStore();

    // 디바운스 처리
    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            if (searchQuery.trim()) {
                handleSearch(searchQuery);
            } else {
                // 검색어가 비어있으면 전체 목록 다시 로드
                fetchProducts();
                onSearch?.('');
            }
        }, 300);

        return () => clearTimeout(delayedSearch);
    }, [searchQuery]);

    const handleSearch = async (query: string) => {
        if (!query.trim()) return;

        setIsSearching(true);
        try {
            await searchProducts(query);
            onSearch?.(query);
        } finally {
            setIsSearching(false);
        }
    };

    const handleClear = () => {
        setSearchQuery('');
        fetchProducts();
        onSearch?.('');
    };

    return (
        <div className="relative max-w-md mx-auto">
            <div className="relative">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />

                {/* 검색 아이콘 */}
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    {isSearching ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600"></div>
                    ) : (
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    )}
                </div>

                {/* 클리어 버튼 */}
                {searchQuery && (
                    <button
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                )}
            </div>


        </div>
    );
};

export default SearchBar;