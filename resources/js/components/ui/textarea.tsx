import React from 'react';
import InputError from '../input-error';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  value: string;
  error?: string;
  className?: string;
};

const Textarea: React.FC<TextareaProps> = ({
  value,
  error,
  placeholder = 'Describe detalladamente el servicio, qué incluye, beneficios, etc.',
  maxLength = 500,
  rows = 5,
  className = '',
  ...props
}) => {
  return (
    <>
      <textarea
        className={`w-full placeholder:text-sm resize-none rounded-md bg-background px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] selection:bg-primary selection:text-primary-foreground ${
          error
            ? 'textarea-danger aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
            : 'border-muted placeholder:text-muted-foreground'
        } ${className}`}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        rows={rows}
        aria-invalid={!!error}
        {...props}
      />
      {error && (
        <InputError message={error} />
      )}
    </>
  );
};

export default Textarea;
