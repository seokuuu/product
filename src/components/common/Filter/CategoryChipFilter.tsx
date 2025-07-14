import React, { useState, useEffect, useRef } from "react";
import { CategoryChip } from "@/components/common/CategoryChip/CategoryChip";

interface CategoryChipFilterProps {
  onCategoryChange?: (category: string) => void;
  selectedCategory?: string;
}

const CategoryChipFilter: React.FC<CategoryChipFilterProps> = ({
  onCategoryChange,
  selectedCategory = "",
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 카테고리 목록 로드
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/category-list"
        );
        const categoryList = await response.json();
        setCategories(categoryList);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    loadCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    // 드래그 중이면 클릭 무시
    if (isDragging) return;

    // 같은 카테고리를 클릭하면 선택 해제
    const newCategory = selectedCategory === category ? "" : category;
    onCategoryChange?.(newCategory);

    // 선택된 카테고리를 맨 앞으로 스크롤
    if (newCategory && scrollContainerRef.current) {
      const selectedElement = scrollContainerRef.current.querySelector(
        `[data-category="${category}"]`
      );
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    }
  };

  // 드래그 시작
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  // 드래그 중
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  // 드래그 끝
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 터치 이벤트 (모바일)
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(
      e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0)
    );
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x =
      e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        {/* 좌측 그라데이션 표시 */}
        <div
          className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none opacity-0 transition-opacity duration-300"
          id="left-gradient"
        />

        {/* 우측 그라데이션 표시 */}
        <div
          className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none opacity-100 transition-opacity duration-300"
          id="right-gradient"
        />

        <div
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto pb-2 cursor-grab select-none scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onScroll={(e) => {
            const container = e.currentTarget;
            const leftGradient = document.getElementById("left-gradient");
            const rightGradient = document.getElementById("right-gradient");

            if (leftGradient && rightGradient) {
              // 좌측 그라데이션: 스크롤이 왼쪽으로 갔을 때 표시
              leftGradient.style.opacity = container.scrollLeft > 0 ? "1" : "0";

              // 우측 그라데이션: 스크롤이 끝까지 가지 않았을 때 표시
              const isScrolledToEnd =
                container.scrollLeft + container.clientWidth >=
                container.scrollWidth - 1;
              rightGradient.style.opacity = isScrolledToEnd ? "0" : "1";
            }
          }}
        >
          {/* 전체 카테고리를 맨 앞에 배치 */}
          <div className="flex-shrink-0" data-category="">
            <CategoryChip
              category="전체"
              isActive={selectedCategory === ""}
              onClick={() => handleCategoryClick("")}
            />
          </div>

          {categories.map((category) => (
            <div
              key={category}
              className="flex-shrink-0"
              data-category={category}
            >
              <CategoryChip
                category={category}
                isActive={selectedCategory === category}
                onClick={() => handleCategoryClick(category)}
              />
            </div>
          ))}

          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default CategoryChipFilter;
