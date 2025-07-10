import React, { useState } from 'react';

interface Review {
    reviewerName: string;
    date: string;
    rating: number;
    comment: string;
}

interface ProductReviewsProps {
    reviews: Review[];
    rating: number;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews, rating }) => {
    const [showAll, setShowAll] = useState(false);
    const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

    const getRatingDistribution = () => {
        const distribution = [0, 0, 0, 0, 0];
        reviews.forEach(review => {
            distribution[review.rating - 1]++;
        });
        return distribution;
    };

    const ratingDistribution = getRatingDistribution();

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? 'text-yellow-500' : 'text-gray-300'}>
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="bg-white border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">고객 리뷰</h3>
            
            {/* 리뷰 요약 */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4 mb-3">
                    <div className="text-3xl font-bold">{rating.toFixed(1)}</div>
                    <div>
                        <div className="flex items-center mb-1">
                            {renderStars(Math.round(rating))}
                        </div>
                        <div className="text-sm text-gray-600">
                            {reviews.length}개의 리뷰
                        </div>
                    </div>
                </div>
                
                {/* 별점 분포 */}
                <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map(star => (
                        <div key={star} className="flex items-center gap-3">
                            <span className="text-sm w-8">{star}★</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-yellow-500 h-2 rounded-full"
                                    style={{ 
                                        width: `${reviews.length > 0 ? (ratingDistribution[star - 1] / reviews.length) * 100 : 0}%` 
                                    }}
                                />
                            </div>
                            <span className="text-sm text-gray-600 w-8">
                                {ratingDistribution[star - 1]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 개별 리뷰 */}
            <div className="space-y-4">
                {displayedReviews.map((review, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">{review.reviewerName}</span>
                                <div className="flex items-center">
                                    {renderStars(review.rating)}
                                </div>
                            </div>
                            <span className="text-sm text-gray-500">
                                {new Date(review.date).toLocaleDateString('ko-KR')}
                            </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>
                ))}
            </div>

            {/* 더보기/접기 버튼 */}
            {reviews.length > 3 && (
                <div className="mt-4 text-center">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        {showAll ? '접기' : `더 많은 리뷰 보기 (+${reviews.length - 3}개)`}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductReviews;