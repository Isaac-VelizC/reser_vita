import { cn } from '@/lib/utils';
import { CircleAlert } from 'lucide-react';
import { type HTMLAttributes } from 'react';

export default function InputError({
    message,
    className = '',
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p
            {...props}
            className={cn('flex items-center text-sm text-red-600 dark:text-red-400', className)}
        >
            <CircleAlert className="mr-1 h-4 w-4" />
            {message}
        </p>
    ) : null;
}
