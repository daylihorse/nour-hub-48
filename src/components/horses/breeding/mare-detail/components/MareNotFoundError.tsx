
interface MareNotFoundErrorProps {
  mareId: string;
  availableMares: Array<{ id: string; horseName: string }>;
  onBackToMares: () => void;
}

const MareNotFoundError = ({ mareId, availableMares, onBackToMares }: MareNotFoundErrorProps) => {
  return (
    <div className="p-6">
      <p className="text-red-500 mb-2">Mare with ID "{mareId}" not found</p>
      <p className="text-sm text-muted-foreground mb-4">
        Available mares: {availableMares.map(m => `${m.id} (${m.horseName})`).join(', ')}
      </p>
      <button 
        onClick={onBackToMares}
        className="text-blue-500 hover:underline"
      >
        Back to Mares
      </button>
    </div>
  );
};

export default MareNotFoundError;
