import {
  Pie,
  Cell,
  Legend,
  Tooltip,
  PieChart,
  ResponsiveContainer,
} from "recharts";

import CustomLegend from "./CustomLegend";
import CustomToolTip from "./CustomToolTip";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  return (
    <ResponsiveContainer width={"100%"} height={380}>
      <PieChart>
        <Pie
          cx={"50%"}
          cy={"50%"}
          data={data}
          nameKey={"name"}
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
          dataKey={"amount"}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={CustomToolTip} />
        <Legend content={CustomLegend}/>

        {showTextAnchor && (
          <>
            <text
              x={"50%"}
              y={"50%"}
              dy={-25}
              textAnchor="middle"
              fill="#666"
              fontSize={"14px"}
            >
              {label}
            </text>
            <text
              x={"50%"}
              y={"50%"}
              dy={8}
              textAnchor="middle"
              fill="#333"
              fontSize={"18px"}
              fontWeight={"semibold"}
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
