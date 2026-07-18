import React from 'react';

type RadioOption = {
  id: string;
  value: string;
  label: string;
};

type RadioGroupProps = {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {options.map((option) => (
        <div key={option.id} className="flex items-center">
          <input
            id={option.id}
            name={name}
            type="radio"
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange && onChange(e.target.value)}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor={option.id} className="ml-2 block text-sm text-gray-700">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};