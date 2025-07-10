import React from 'react';

interface CounterInputProps {
  count: number;
  setCount: (count: number) => void;
  maxCount?: number;
  minCount?: number;
}

const CounterInput = ({ count, setCount, maxCount = 5, minCount = 1 }: CounterInputProps) => {
  const upCount = () => {
    if (count < maxCount) {
      setCount(count + 1);
    }
  };

  const downCount = () => {
    if (count - 1 < minCount) {
      return;
    }
    setCount(count - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= minCount && value <= maxCount) {
      setCount(value);
    }
  };

  return (
    <div className="flex w-32 items-center justify-center rounded border border-gray-300">
      <button
        className={`flex items-center justify-center border-r border-gray-300 p-2 h-10 w-10 ${
          count <= minCount ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'
        }`}
        onClick={downCount}
        disabled={count <= minCount}
      >
        <span className="text-lg font-bold">−</span>
      </button>
      <input
        className="w-12 h-10 text-center font-medium focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        value={count}
        onChange={handleInputChange}
        min={minCount}
        max={maxCount}
        type="number"
      />
      <button
        className={`flex items-center justify-center border-l border-gray-300 p-2 h-10 w-10 ${
          count >= maxCount ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'
        }`}
        onClick={upCount}
        disabled={count >= maxCount}
      >
        <span className="text-lg font-bold">+</span>
      </button>
    </div>
  );
};

export default CounterInput;