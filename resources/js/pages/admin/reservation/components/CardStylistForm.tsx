import { StylistInterface } from '@/interfaces/Profile';

type CardStylistFormProps = {
    dataStylist: StylistInterface;
    selectedId: number | null;
    onSelect: (id: number) => void;
};

const CardStylistForm = ({
    dataStylist,
    selectedId,
    onSelect,
}: CardStylistFormProps) => {
    const isSelected = selectedId === dataStylist.id;

    return (
        <>
            <button
                key={dataStylist.id}
                onClick={() => onSelect(dataStylist.id)}
                disabled={!dataStylist.status}
                className={`rounded-lg border-2 p-3 cursor-pointer transition-all ${
                    isSelected
                        ? 'border-green-600 bg-success/5'
                        : dataStylist.status
                          ? 'border-gray-500/30 hover:border-green-600 hover:bg-success/5'
                          : 'cursor-not-allowed border-gray-200 bg-gray-100 opacity-60'
                }`}
            >
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                        {dataStylist.name}
                    </p>
                    {dataStylist.status ? (
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    ) : (
                        <span className="text-xs text-gray-500">
                            No disponible
                        </span>
                    )}
                </div>
            </button>
        </>
    );
};

export default CardStylistForm;
