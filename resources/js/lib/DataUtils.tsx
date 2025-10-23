
type statusRol = 'admin' | 'stylist';

export interface RoleInfo {
  role: statusRol;
  icon: React.ReactNode | string;
  label: string;
  description: string;
  permissions: string[];
  borderColorClass: string;
  bgColorClass: string;
  radioClass: string;
  color: string;
}

export const rolesData = [
  {
    role: "admin" as statusRol,
    icon: "👑",
    label: "Administrador",
    description: "Control total del sistema",
    permissions: ["Gestión total", "Configuración", "Usuarios", "Reportes"],
    borderColorClass: "border-red-600", // usa un color Tailwind estándar para error/danger
    bgColorClass: "bg-red-600/10",
    radioClass: "accent-red-600",
    color: "danger",
  },
  {
    role: "stylist" as statusRol,
    icon: "👨‍💼",
    label: "Estilista",
    description: "Gestión de servicios y reservas",
    permissions: ["Gestionar servicios", "Gestionar reservas"],
    borderColorClass: "border-blue-600", // usa un azul estándar para info
    bgColorClass: "bg-blue-600/10",
    radioClass: "accent-blue-600",
    color: "info",
  },
];

// Función para obtener info del rol
export const getRoleInfo = (role: statusRol): RoleInfo => {
  return rolesData.find(r => r.role === role)!; // ?? rolesData.find(r => r.role === 'customer')!;
};

export const tipsFormUsers = [
  { text: 'Usa contraseñas únicas y complejas' },
  { text: 'Asigna roles según responsabilidad' },
  { text: 'Verifica el email antes de crear' },
  { text: 'Recomienda cambiar contraseña al primer login' },
];

export const tipsFormServices = [
  { text: 'Usa nombres descriptivos y atractivos' },
  { text: 'Incluye beneficios en la descripción' },
  { text: 'Considera el tiempo de preparación' },
  { text: 'Revisa los precios de la competencia' },
];

