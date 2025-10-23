// Definiciones de tipos

interface CardPreferencesProps<T extends string> {
  code: T;
  name: string;
  description: string;
  flag: string;
  selectedCode: T;
  onSelect: (code: T) => void;
  colorClass?: string;
  radioName: string;
  radioClass?: string;
}

// Componente genérico
export function CardPreferences<T extends string>({
  code,
  name,
  description,
  flag,
  selectedCode,
  onSelect,
  colorClass = 'primary',
  radioName,
  radioClass = 'radio-primary',
}: CardPreferencesProps<T>) {
  const isSelected = selectedCode === code;

  return (
    <div
      onClick={() => onSelect(code)}
      className={`card cursor-pointer border-2 transition-all ${
        isSelected
          ? `border-${colorClass} bg-${colorClass}/5 shadow-lg`
          : `border-gray-200 hover:border-${colorClass}/50 hover:shadow-md`
      }`}
    >
      <div className="card-body p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-3xl">{flag}</div>
            <div>
              <h3 className="font-bold">
                {name} ({code})
              </h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
          <input
            type="radio"
            name={radioName}
            className={`radio ${radioClass}`}
            checked={isSelected}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
