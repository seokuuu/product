import React from 'react';

interface ProductOrderInfoProps {
    minimumOrderQuantity: number;
    stock: number;
    availabilityStatus: string;
}

const ProductOrderInfo: React.FC<ProductOrderInfoProps> = ({ 
    minimumOrderQuantity, 
    stock, 
    availabilityStatus 
}) => {
    return (
        <div className="bg-white border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">주문 정보</h3>
            
            <div className="space-y-4">
                {/* 최소 주문 수량 */}
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                        <div className="font-medium text-yellow-800">최소 주문 수량</div>
                        <div className="text-sm text-yellow-600">한 번에 주문할 수 있는 최소 개수입니다</div>
                    </div>
                    <div className="text-2xl font-bold text-yellow-800">
                        {minimumOrderQuantity}개
                    </div>
                </div>

                {/* 재고 상태 */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                        <div className="font-medium text-gray-800">현재 재고</div>
                        <div className="text-sm text-gray-600">{availabilityStatus}</div>
                    </div>
                    <div className={`text-2xl font-bold ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stock > 0 ? `${stock}개` : '품절'}
                    </div>
                </div>

                {/* 주문 가능 여부 */}
                <div className="p-3 border rounded-lg">
                    {stock >= minimumOrderQuantity ? (
                        <div className="flex items-center gap-2 text-green-600">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="font-medium">주문 가능</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-red-600">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="font-medium">
                                {stock === 0 ? '품절' : '재고 부족'}
                            </span>
                        </div>
                    )}
                    <div className="text-sm text-gray-600 mt-1">
                        {stock >= minimumOrderQuantity 
                            ? `최소 ${minimumOrderQuantity}개부터 주문 가능합니다`
                            : stock === 0 
                                ? '현재 재고가 없습니다'
                                : `재고가 부족합니다 (현재 ${stock}개, 최소 ${minimumOrderQuantity}개 필요)`
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductOrderInfo;