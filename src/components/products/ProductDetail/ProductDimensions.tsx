import React from 'react';

interface Dimensions {
    width: number;
    height: number;
    depth: number;
}

interface ProductDimensionsProps {
    dimensions: Dimensions;
    weight: number;
}

const ProductDimensions: React.FC<ProductDimensionsProps> = ({ dimensions, weight }) => {
    return (
        <div className="bg-white border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">크기 및 무게</h3>
            
            <div className="space-y-4">
                {/* 크기 정보 */}
                <div>
                    <h4 className="font-medium mb-2 text-gray-700">제품 크기</h4>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{dimensions.width}</div>
                            <div className="text-sm text-gray-600">가로 (cm)</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{dimensions.height}</div>
                            <div className="text-sm text-gray-600">세로 (cm)</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{dimensions.depth}</div>
                            <div className="text-sm text-gray-600">깊이 (cm)</div>
                        </div>
                    </div>
                </div>

                {/* 무게 정보 */}
                <div>
                    <h4 className="font-medium mb-2 text-gray-700">무게</h4>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{weight}</div>
                        <div className="text-sm text-gray-600">kg</div>
                    </div>
                </div>

                {/* 배송 정보 */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2 text-blue-800">배송 참고사항</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>• 크기: {dimensions.width} × {dimensions.height} × {dimensions.depth} cm</li>
                        <li>• 무게: {weight} kg</li>
                        <li>• 부피가 큰 상품은 별도 배송비가 발생할 수 있습니다</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductDimensions;