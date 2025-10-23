import { Badge } from "@/components/ui/badge";
import { ServiceInterface } from "@/interfaces/Service";
import { getStatusBadge } from "@/lib/funtionsUtils";
import { formatDuration, formatPrice } from "@/lib/utils";
import { Clock } from "lucide-react";

type CardServiceProps = {
    service: ServiceInterface;
    current_page: number;
    per_page: number;
    index: number;
};

const CardService = ({ service, index, current_page, per_page }: CardServiceProps) => {
    return (
        <div
            key={service.id}
            className="card border shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl"
        >
            <div className="card-body p-6">
                <div className="mb-3 flex items-start justify-between">
                    <Badge variant="soft" color={"primary"}>
                        #
                        {(current_page - 1) * per_page + index + 1}
                    </Badge>
                    <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                            {formatPrice(service.price)}
                        </div>
                    </div>
                </div>

                <h3 className="mb-2 card-title text-lg font-semibold">
                    {service.name}
                </h3>

                <p className="mb-4 line-clamp-2 text-sm">
                    {service.description || 'Sin descripción'}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div>
                            {getStatusBadge(service.status)}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">
                                {formatDuration(service.duration_minutes)}
                            </span>
                        </div>
                    </div>

                    <button className="btn btn-sm btn-primary">
                        Ver detalles
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardService;
