import React from 'react';
import { Check } from 'lucide-react'; // Ajusta import si usas otro paquete o icono
import { Button } from '@/components/ui/button';

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  processing: boolean;
  isEdit: boolean;
  isFormValid: () => boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  processing,
  isEdit,
  isFormValid,
  disabled,
  ...props
}) => {
  const isDisabled = processing || !isFormValid() || disabled;

  return (
    <Button
      type="submit"
      className={`${processing ? 'loading' : ''}`}
      disabled={isDisabled}
      {...props}
    >
      {processing ? (
        <>
          <span className="loading loading-sm loading-spinner"></span>
          {isEdit ? 'Actualizando...' : 'Creando...'}
        </>
      ) : (
        <>
          <Check className="mr-2 h-4 w-4" />
          {isEdit ? 'Actualizar Servicio' : 'Crear Servicio'}
        </>
      )}
    </Button>
  );
};

export default SubmitButton;
