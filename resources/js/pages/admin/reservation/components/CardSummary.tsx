import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Phone, X } from 'lucide-react';

type Props = {
    data: {
        date?: string;
        time?: string;
    };
    selectedService?: {
        name: string;
        price: number;
        duration_minutes: number;
    };
    selectedStylist?: {
        name: string;
    };
    selectedClient?: {
        name: string;
        phone: string;
    };
    resetForm: () => void;
};

const SectionBlock = ({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) => (
    <div className="border-b border-gray-100 pb-4 last:border-none dark:border-gray-800">
        <p className="mb-2 text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400">
            {label}
        </p>
        {children}
    </div>
);

const Placeholder = () => (
    <p className="text-sm leading-relaxed text-gray-400 dark:text-gray-500">
        No seleccionado
    </p>
);

const CardSummary = ({
    data,
    selectedService,
    selectedStylist,
    selectedClient,
    resetForm,
}: Props) => {
    return (
        <Card aria-labelledby="summary-title">
            <CardHeader>
                <CardTitle>
                    Resumen
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5 pt-4">
                {/* Cliente */}
                <SectionBlock label="CLIENTE">
                    {selectedClient ? (
                        <>
                            <p className="font-medium">
                                {selectedClient.name}
                            </p>
                            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                                <Phone className="h-3 w-3" />{' '}
                                {selectedClient.phone}
                            </p>
                        </>
                    ) : (
                        <Placeholder />
                    )}
                </SectionBlock>

                {/* Servicio */}
                <SectionBlock label="SERVICIO">
                    {selectedService ? (
                        <>
                            <p className="font-medium">
                                {selectedService.name}
                            </p>
                            <div className="mt-2 flex justify-between text-sm">
                                <span className="flex items-center gap-1 text-muted-foreground">
                                    <Clock className="h-3 w-3" />{' '}
                                    {selectedService.duration_minutes} min
                                </span>
                                <span className="font-bold text-primary">
                                    ${selectedService.price}
                                </span>
                            </div>
                        </>
                    ) : (
                        <Placeholder />
                    )}
                </SectionBlock>

                {/* Estilista */}
                <SectionBlock label="ESTILISTA">
                    {selectedStylist ? (
                        <p className="font-medium">
                            {selectedStylist.name}
                        </p>
                    ) : (
                        <Placeholder />
                    )}
                </SectionBlock>

                {/* Fecha y Hora */}
                <SectionBlock label="FECHA Y HORA">
                    {data.date ? (
                        <>
                            <p className="font-medium capitalize">
                                {data.date}
                            </p>
                            {data.time && (
                                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                                    <Clock className="h-3 w-3" /> {data.time}
                                </p>
                            )}
                        </>
                    ) : (
                        <Placeholder />
                    )}
                </SectionBlock>

                {/* Total */}
                {selectedService && (
                    <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-medium">
                            Total a cobrar:
                        </span>
                        <span className="text-2xl font-bold text-primary">
                            ${selectedService.price}
                        </span>
                    </div>
                )}

                {/* Acción */}
                <Button
                    onClick={resetForm}
                    variant={"outline"}
                    color='neutral'
                    startIcon={<X className="h-4 w-4" />}
                >
                    Limpiar
                </Button>
            </CardContent>
        </Card>
    );
};

export default CardSummary;
