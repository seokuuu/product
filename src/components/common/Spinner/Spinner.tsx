import React from 'react';

interface SpinnerProps {
    size?: string;
    className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
                                                    size = '24px',
                                                    className = '',
                                                }) => {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div
                className="animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"
                style={{ width: size, height: size }}
            />
        </div>
    );
};