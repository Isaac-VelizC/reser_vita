import admin from "@/routes/admin";
import { ChartNoAxesColumn, Clock, Plus, UserPlus, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import TextLink from "../text-link";
import { Button } from "../ui/button";

const QuickActions = () => {
    return (
        <Card className="border border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-primary" />
                    Acciones Rápidas
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <Button onClick={() => admin.reservations.create().url} color="primary">
                        <Plus className="h-4 w-4" />
                        Nueva Reserva
                    </Button>

                    <Button onClick={() => admin.usuarios.create().url} color={"secondary"} startIcon={<UserPlus />}>
                        Nuevo Cliente
                    </Button>

                    <Button onClick={() => admin.services.create().url} color={"accent"}>
                        <Plus className="h-4 w-4" />
                        Nuevo Servicio
                    </Button>

                    <Button onClick={() => admin.availability.index().url} color="info">
                        <Clock className="h-4 w-4" />
                        Horarios
                    </Button>
                </div>

                <TextLink
                    href="/reportes"
                    className="flex items-center justify-center mt-2 w-full gap-2 text-sm"
                >
                    <ChartNoAxesColumn className="h-4 w-4" />
                    Ver Estadísticas Completas
                </TextLink>
            </CardContent>
        </Card>
    );
};

export default QuickActions;
