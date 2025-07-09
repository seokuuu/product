import { useEffect, useRef, useState } from 'react';

export interface DropDownProps {
    placeholder?: string;
    selectedItem?: any;
    options: any[];
    position?: 'BOTTOM' | 'TOP';
    onSelected: (value: any) => void;
    disabled?: boolean;
    maxCount?: number;
    minWidth?: string;
    hideScroll?: boolean;
    hasBorder?: boolean;
}

export const DropDown = ({
                             placeholder,
                             selectedItem,
                             options,
                             position = 'BOTTOM',
                             onSelected,
                             disabled = false,
                             maxCount = 4,
                             minWidth,
                             hideScroll = false,
                             hasBorder = true,
                         }: DropDownProps) => {
    const [openSelectBox, setOpenSelectBox] = useState(false);
    const dropDownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event: any) => {
        if (dropDownRef?.current && !dropDownRef?.current?.contains(event.target)) {
            setOpenSelectBox(false);
        }
    };

    const toggleSelectBox = () => {
        if (disabled) return;
        setOpenSelectBox((prev) => !prev);
    };

    const onChanged = (item: any) => {
        onSelected?.(item);
        setOpenSelectBox(false);
    };

    const getOptions = () => {
        const isActive = (item: any) => item.value === selectedItem?.value;
        return options.map((row: any, i: number) => (
            <li
                key={i}
                onClick={() => onChanged(row)}
                className={`w-full h-[42px] max-h-[42px] px-4 py-3 cursor-pointer flex justify-start items-center ${
                    isActive(row) ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-700'
                }`}
            >
        <span className="text-sm text-ellipsis break-words line-clamp-1">
          {row.name}
        </span>
            </li>
        ));
    };

    const textColor = () => {
        if (disabled || !selectedItem) return 'text-gray-400';
        return 'text-gray-700';
    };

    // 화살표 아이콘 SVG
    const ArrowIcon = () => (
        <svg
            className={`w-4 h-4 transition-transform duration-300 ${
                openSelectBox ? 'rotate-180' : 'rotate-0'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
            />
        </svg>
    );

    return (
        <div
            ref={dropDownRef}
            className={`${minWidth} w-full h-full flex flex-col gap-[2px] relative`}
        >
            <div
                className={`px-4 py-3 flex justify-between items-center rounded-md gap-2 max-h-[42px] ${
                    hasBorder ? 'border border-gray-300' : ''
                } ${
                    disabled
                        ? 'bg-gray-100 cursor-not-allowed'
                        : 'cursor-pointer bg-white hover:border-gray-400'
                }`}
                onClick={toggleSelectBox}
            >
        <span className={`text-sm text-ellipsis break-words line-clamp-1 ${textColor()}`}>
          {!selectedItem ? placeholder : selectedItem?.name}
        </span>
                <div className={`flex justify-center items-center ${disabled ? 'text-gray-400' : 'text-gray-600'}`}>
                    <ArrowIcon />
                </div>
            </div>

            {openSelectBox && (
                <ul
                    className={`w-full list-none ${
                        hasBorder ? 'border border-gray-300' : ''
                    } rounded-md shadow-lg absolute z-10 bg-white overflow-y-auto ${
                        hideScroll ? 'scrollbar-hide' : ''
                    } right-0 ${position === 'TOP' ? 'bottom-12' : 'top-12'}`}
                    style={{ maxHeight: `${maxCount * 42}px` }}
                >
                    {getOptions()}
                </ul>
            )}
        </div>
    );
};