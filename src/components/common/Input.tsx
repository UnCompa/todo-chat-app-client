import React from 'react';
import { cn } from '../../utils/cn';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  className?: string;
}

function Input({ label, errorMessage, className, ...props}: Props) {
  return (
    <div className='flex flex-col'>
      {
        label && <label className='text-text font-WorkSans'>{label}</label>
      }
      <input className={cn('input transition-all duration-200', className)} type="text" {...props} />
      {errorMessage && <span className='text-sm text-danger-500'>{errorMessage}</span>}
    </div>
  )
}

export default Input
