import React, { useState } from 'react';

interface ProductMetadataProps {
    sku: string;
    barcode?: string;
    qrCode?: string;
    createdAt?: string;
    updatedAt?: string;
}

const ProductMetadata: React.FC<ProductMetadataProps> = ({ 
    sku, 
    barcode, 
    qrCode, 
    createdAt, 
    updatedAt 
}) => {
    const [showQRPopup, setShowQRPopup] = useState(false);
    return (
        <div className="bg-white border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">상품 메타데이터</h3>
            
            <div className="space-y-3">
                {/* SKU */}
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">SKU</span>
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {sku}
                    </span>
                </div>

                {/* 바코드 */}
                {barcode && (
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">바코드</span>
                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                            {barcode}
                        </span>
                    </div>
                )}

                {/* QR 코드 */}
                {qrCode && (
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">QR 코드</span>
                        <button 
                            onClick={() => setShowQRPopup(true)}
                            className="font-mono text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded transition-colors cursor-pointer"
                        >
                            QR 코드 보기
                        </button>
                    </div>
                )}

                {/* 등록일 */}
                {createdAt && (
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">등록일</span>
                        <span className="text-sm text-gray-700">
                            {new Date(createdAt).toLocaleDateString('ko-KR')}
                        </span>
                    </div>
                )}

                {/* 수정일 */}
                {updatedAt && (
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">수정일</span>
                        <span className="text-sm text-gray-700">
                            {new Date(updatedAt).toLocaleDateString('ko-KR')}
                        </span>
                    </div>
                )}
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">
                    * 이 정보는 상품 관리 및 재고 추적을 위한 메타데이터입니다.
                </p>
            </div>

            {/* QR 코드 팝업 */}
            {showQRPopup && qrCode && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-semibold">QR 코드</h4>
                            <button 
                                onClick={() => setShowQRPopup(false)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>
                        <div className="text-center">
                            <div className="bg-gray-100 p-4 rounded-lg mb-4">
                                <img 
                                    src={qrCode}
                                    alt="QR 코드"
                                    className="w-48 h-48 mx-auto object-contain"
                                />
                            </div>

                            <button 
                                onClick={() => setShowQRPopup(false)}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductMetadata;