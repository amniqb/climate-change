import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import styles from "./TimeSeriesChart.module.css";

export default function TimeSeriesChart({
  data,
  title,
  yLabel = "",
  xTickFormatter, 
  yTickFormatter,
  yDomain,
  height = 360,
  stroke = "#333",
}) {
  return (
    <div className={styles.card}>
      {title && <h2>{title}</h2>}
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={xTickFormatter} 
            />
            <YAxis
              tickFormatter={yTickFormatter}
              domain={yDomain || ["auto", "auto"]}
              label={
                yLabel
                  ? {
                      value: yLabel,
                      angle: -90,
                      position: "insideLeft",
                      offset: 10,
                      style: { textAnchor: "middle" }
                    }
                  : null
              }
            />
            <Tooltip
              labelFormatter={(v) => {
                const d = v instanceof Date ? v : new Date(v);
                return d.toISOString().slice(0, 10); 
              }}
              formatter={(v) => [v, "Value"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              dot={false}
              strokeWidth={2}
              stroke={stroke}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
