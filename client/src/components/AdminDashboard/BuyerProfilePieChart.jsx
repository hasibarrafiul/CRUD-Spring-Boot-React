import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const data = [
    { name: "Sugar", value: 10 },
    { name: "Rice", value: 20 },
    { name: "Steel", value: 40 },
];

const RADIAN = Math.PI / 180;
const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default function BuyerProfilePieChart() {
    return (
        <div className="flex h-[22rem] w-[20rem] flex-col rounded-sm border border-gray-200 bg-white p-4">
            <strong className="font-medium text-gray-700">Commodity</strong>
            <div className="w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={300}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="45%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={105}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
