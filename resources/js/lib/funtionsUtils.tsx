import { Badge } from "@/components/ui/badge";
import { StatusKey } from "@/types";
import { type LucideIcon, ShieldPlus, User } from "lucide-react"; // importa los íconos que usarás

type RoleKey = "admin" | "stylist" | "customer"

export const getRoleBadge = (role: RoleKey) => {
  const roleConfig: Record<
    RoleKey,
    {
      color: React.ComponentProps<typeof Badge>["color"]
      label: string
      icon: LucideIcon
    }
  > = {
    admin: {color: "error", label: "Administrador", icon: ShieldPlus },
    stylist: { color: "warning", label: "Estilista", icon: User },
    customer: { color: "info", label: "Cliente", icon: User },
  }

  const config = roleConfig[role] || roleConfig.customer
  const IconComponent = config.icon

  return (
    <Badge color={config.color} variant={"soft"}>
      <IconComponent className="h-3 w-3" aria-hidden="true" />
      {config.label}
    </Badge>
  )
}

export const getStatusBadge = (status: StatusKey) => {
  const statusConfig: Record<
    StatusKey,
    {
      color: React.ComponentProps<typeof Badge>["color"]
      variant?: React.ComponentProps<typeof Badge>["variant"]
      label: string
    }
  > = {
    active: { color: "success", variant: "soft", label: "Activo" },
    inactive: { color: "neutral", variant: "outline", label: "Inactivo" },
    suspended: { color: "error", variant: "soft", label: "Suspendido" },
    confirmed: { color: "success", variant: "solid", label: "Confirmada" },
    in_progress: { color: "info", variant: "soft", label: "En Progreso" },
    pending: { color: "warning", variant: "soft", label: "Pendiente" },
    completed: { color: "primary", variant: "solid", label: "Completada" },
    canceled: { color: "error", variant: "outline", label: "Cancelada" },
  }

  const config = statusConfig[status] || statusConfig.inactive

  return (
    <Badge color={config.color} variant={config.variant} className="capitalize">
      {config.label}
    </Badge>
  )
}

export const calculatePasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (password.length >= 12) strength += 25;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
        if (/\d/.test(password)) strength += 15;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 10;
        return Math.min(strength, 100);
    };
    