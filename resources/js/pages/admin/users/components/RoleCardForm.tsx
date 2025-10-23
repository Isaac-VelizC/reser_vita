import React from "react";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type statusRol = "admin" | "stylist";

type RoleCardProps = {
  role: statusRol;
  selectedRole: statusRol;
  onSelect: (role: statusRol) => void;
  icon: React.ReactNode;
  title: string;
  description: string;
  permissions: string[];
  borderColorClass: string; // ej: 'border-danger'
  bgColorClass: string; // ej: 'bg-danger/5'
  radioClass: string; // ej: 'bg-danger'
};

const RoleCard: React.FC<RoleCardProps> = ({
  role,
  selectedRole,
  onSelect,
  icon,
  title,
  description,
  permissions,
  borderColorClass,
  bgColorClass,
  radioClass,
}) => {
  const isSelected = selectedRole === role;

  return (
    <Card
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      className={`cursor-pointer border transition-shadow duration-300 focus:outline-none        ${
          isSelected
            ? `${borderColorClass} ${bgColorClass} shadow-lg`
            : `border-gray-300 dark:border-gray-700 hover:shadow-md hover:${borderColorClass}/50 bg-white dark:bg-transparent`
        }
      `}
      onClick={() => onSelect(role)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(role);
        }
      }}
    >
      <CardContent>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-3xl select-none">{icon}</span>
          <input
            type="radio"
            name="role"
            className={`accent-current pointer-events-none ${radioClass} h-5 w-5`}
            checked={isSelected}
            readOnly
            aria-label={`${title} role`}
          />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">{description}</p>
        <div className="space-y-1">
          {permissions.map((perm, i) => (
            <div
              key={i}
              className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 select-none"
            >
              <Check className="h-4 w-4 text-green-500" />
              {perm}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleCard;
