import {
  Bar,
  Cell,
  YAxis,
  XAxis,
  Tooltip,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CustomBarChart = ({ data }) => {
  //----- Configuración de colores
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#9f958a" : "#918574";
  };

  //----- Configuración de etiquetado de valores
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-primary mb-1">
            {payload[0].payload.category}
          </p>
          <p className="text-sm text-content">
            Cantidad:{" "}
            <span className="text-sm font-medium text-primary">
              S/{payload[0].payload.amount}
            </span>
          </p>
        </div>
      );
    }
  };

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey={data[0]?.month ? "month" : "category"}
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={CustomTooltip} />
          <Bar
            dataKey={"amount"}
            fill={"#FF8042"}
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8, fill: "yellow" }}
            activeStyle={{ fill: "green" }}
          >
            {data.map((_entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
