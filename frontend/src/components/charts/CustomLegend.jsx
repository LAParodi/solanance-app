const CustomLegend = ({ payload }) => {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2 space-x-6">
      {payload.map((entry, index) => (
        <div key={`legen-${index}`} className="flex items-center space-x-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>

          <span className="text-xs text-content font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};
export default CustomLegend;
