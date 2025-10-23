import { Badge } from '@/components/ui/badge';
import { ServiceInterface } from '@/interfaces/Service';
import { formatDuration, formatPrice } from '@/lib/utils';
import clsx from 'clsx';
import { Clock } from 'lucide-react';

type CardServiceFormProps = {
    service: ServiceInterface;
    selectedId: number | null;
    onSelect: (id: number) => void;
};

const CardServiceForm = ({
    service,
    selectedId,
    onSelect,
}: CardServiceFormProps) => {
    const isSelected = selectedId === service.id;

    return (
        <label
            className={clsx(
                'block cursor-pointer rounded-xl border-2 p-3 transition-all duration-200 outline-none',
                'hover:border-green-600 border-gray-500/30 dark:hover:bg-success/5',
                isSelected &&
                    'border-green-600 dark:bg-success/5',
            )}
            tabIndex={0}
            role="radio"
            aria-checked={isSelected}
            onKeyDown={(e) =>
                (e.key === 'Enter' || e.key === ' ') && onSelect(service.id)
            }
        >
            <input type="radio" name="service" className="hidden" checked={isSelected} onChange={() => onSelect(service.id)} />

            <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between">
                    <h3 className="font-medium">
                        {service.name}
                    </h3>
                </div>

                <div className="flex items-center justify-between">
                    <Badge variant="outline" color={ isSelected ? "success" : "neutral"} icon={Clock}>
                        {formatDuration(service.duration_minutes)}
                    </Badge>

                    <p className="font-bold text-primary">
                        {formatPrice(service.price)}
                    </p>
                </div>
            </div>
        </label>
    );
};

export default CardServiceForm;
