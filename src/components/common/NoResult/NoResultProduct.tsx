import React from 'react';

interface NoResultProductProps {
    title?: string;
    className?: string;
}

const NoResultProduct: React.FC<NoResultProductProps> = ({
                                                             title = '상품이',
                                                             className = '',
                                                         }) => {
    return (
        <div className={`flex flex-col justify-center items-center gap-3 px-10 py-5 w-full h-96 ${className}`}>
            <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-lg">!</span>
            </div>
            <div className="text-sm text-gray-500">{title} 없습니다.</div>
        </div>
    );
};

export default NoResultProduct;