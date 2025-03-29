const CustomToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 border border-gray-300 bg-white shadow-md rounded-lg">
        <p className="mb-1 text-xs font-semibold text-content">
          {payload[0].name}
        </p>
        <p className="text-sm text-content">
          Cantidad:{" "}
          <span className="text-sm font-medium text-primary">
            S/${payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomToolTip;
