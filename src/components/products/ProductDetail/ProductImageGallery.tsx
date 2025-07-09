import Image from 'next/image';
import React, { useState } from 'react';

interface ProductImageGalleryProps {
    images: string[];
    title: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
                                                                     images,
                                                                     title,
                                                                 }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">이미지가 없습니다</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                    fill
                    className="object-cover"
                    src={images[selectedImageIndex]}
                    alt={`${title} - 이미지 ${selectedImageIndex + 1}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                />
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                index === selectedImageIndex
                                    ? 'border-blue-600 shadow-md'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <Image
                                fill
                                className="object-cover"
                                src={image}
                                alt={`${title} 썸네일 ${index + 1}`}
                                sizes="80px"
                                unoptimized
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Image Counter */}
            <div className="text-center text-sm text-gray-500">
                {selectedImageIndex + 1} / {images.length}
            </div>
        </div>
    );
};

export default ProductImageGallery;