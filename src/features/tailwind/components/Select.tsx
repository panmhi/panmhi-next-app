'use client';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';

const baseInputStyle = 'mb-1 rounded border border-border text-primary/80 outline-none';
const baseSelectStyle = 'transition inline-block cursor-pointer ';
const optionStyle = 'px-2 py-1 hover:bg-slate-100';

export const Select = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState('Option 1');

  const updateValue = (value: string) => {
    setSelectValue(value);
    setIsOpen(false);
  };

  return (
    <div className={cn(baseInputStyle, baseSelectStyle)}>
      <div
        className={cn(optionStyle, 'flex items-center justify-between gap-2')}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selectValue}</span>
        <div className={isOpen ? 'rotate-180 transition' : 'rotate-0 transition'}>
          <ChevronDownIcon />
        </div>
      </div>
      {isOpen && (
        <div>
          <ul className='flex flex-col divide-y border-t'>{children}</ul>
        </div>
      )}
    </div>
  );
};

export const SelectOption = ({ children }: { children: React.ReactNode }) => {
  return <li className={optionStyle}>{children}</li>;
};
