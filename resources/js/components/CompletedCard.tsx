import { Check, CircleCheck, X } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

type CompletedCardProps<T> = {
    data: T;
    fields: {
        label: string;
        value: string;
        validator?: (value: string, data?: T) => boolean;
    }[];
    isValid: () => boolean;
};

function CompletedCard<T>({ data, fields, isValid }: CompletedCardProps<T>) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <CircleCheck className="mr-2 h-5 w-5 text-info" />
                    Completado
                </CardTitle>
            </CardHeader>
            <CardContent>
                {fields.map(({ label, value, validator }, i) => {
                    const valid = validator
                        ? validator(value, data)
                        : Boolean(value);
                    return (
                        <div
                            key={i}
                            className="flex items-center justify-between"
                        >
                            <span className="text-sm text-gray-500">
                                {label}
                            </span>
                            <Badge
                                color={valid ? 'success' : 'error'}
                                icon={valid ? Check : X}
                            />
                        </div>
                    );
                })}

                <Separator className="my-3" />

                <div className="flex items-center justify-between font-semibold">
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                        Formulario
                    </span>
                    <Badge color={isValid() ? 'success' : 'warning'}>
                        {isValid() ? 'Válido' : 'Incompleto'}
                    </Badge>
                </div>

                {isValid() && (
                    <div className="rounded-xl border border-success/20 bg-success/10 p-4 text-center">
                        <CircleCheck className="mx-auto mb-1 h-8 w-8 text-success" />
                        <p className="text-sm font-semibold text-success">
                            ¡Listo para crear!
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default CompletedCard;
