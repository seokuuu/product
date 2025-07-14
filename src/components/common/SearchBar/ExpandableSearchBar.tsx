import React, { useState, useRef, useEffect } from 'react';
import { useProductStore } from '@/store/useProductStore';

interface ExpandableSearchBarProps {
  placeholder?: string;
  onSearch?: () => void;
}

const ExpandableSearchBar: React.FC<ExpandableSearchBarProps> = ({
  placeholder = "상품명을 검색하세요...",
  onSearch
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchProducts, currentSearchQuery } = useProductStore();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchProducts(searchQuery.trim());
    onSearch?.(); // 검색 시 부모 컴포넌트에 알림
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // 입력값이 없으면 빈값으로 검색
    if (value.trim() === '') {
      searchProducts('');
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    // 빈값으로 검색 (전체 상품 로드)
    searchProducts('');
    onSearch?.(); // 리셋 시에도 부모 컴포넌트에 알림
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-lg border-2 border-blue-500 min-h-[56px]">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="flex-1 outline-none text-gray-800 placeholder-gray-400"
          />
          
          {/* 검색 아이콘 - 항상 노출 */}
          <button
            type="submit"
            className="flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          {/* 새로고침 아이콘 - 검색 결과가 있으면 노출 */}
          {currentSearchQuery && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExpandableSearchBar;