const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function MonthSelector({ currentDate, onChange }) {
  const handlePrev = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    onChange(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    onChange(newDate);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handlePrev}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ←
      </button>
      <span className="text-lg font-medium">
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </span>
      <button
        onClick={handleNext}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        →
      </button>
    </div>
  );
}

export default MonthSelector;