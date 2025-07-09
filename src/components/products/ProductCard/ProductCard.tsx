import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ProductCardProps } from '@/types/product';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const hasDiscount = product.discountPercentage > 0;
    const discountedPrice = hasDiscount
        ? product.price * (1 - product.discountPercentage / 100)
        : product.price;

    return (
        <article className="flex flex-col w-full max-w-[280px] gap-3">
            <Link href={`/products/${product.id}`}>
                <div className="relative w-full h-[280px] overflow-hidden rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    {product.thumbnail ? (
                        <Image
                            fill
                            className="object-cover"
                            src={product.thumbnail}
                            alt={product.title}
                            sizes="280px"
                            unoptimized
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">No Image</span>
                        </div>
                    )}

                    {hasDiscount && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            -{Math.round(product.discountPercentage)}%
                        </div>
                    )}

                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                        ★ {product.rating.toFixed(1)}
                    </div>
                </div>
            </Link>

            <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-500 line-clamp-1">
          {product.brand} • {product.category}
        </span>

                <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors">
                        {product.title}
                    </h3>
                </Link>

                <div className="flex flex-col mt-1">
                    {hasDiscount && (
                        <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-red-500">
                {Math.round(product.discountPercentage)}%
              </span>
                            <span className="text-sm text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
                        </div>
                    )}

                    <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-gray-900">
              ${discountedPrice.toFixed(2)}
            </span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-2">
          <span className={`text-xs px-2 py-1 rounded ${
              product.stock > 0
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
          }`}>
            {product.stock > 0 ? `재고 ${product.stock}개` : '품절'}
          </span>

                    <span className="text-xs text-gray-500">
            {product.availabilityStatus}
          </span>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;