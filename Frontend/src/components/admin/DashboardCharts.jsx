import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

const DashboardCharts = () => {
  const [planData, setPlanData] = useState([]);
  const [adDurationData, setAdDurationData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const planRes = await axiosInstance.get("/admin/plan-distribution");
        const durationRes = await axiosInstance.get("/admin/ad-duration-stats");
        setPlanData(planRes.data);
        setAdDurationData(durationRes.data);
      } catch (error) {
        console.error("Error loading chart data:", error);
      }
    };
    fetchChartData();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
      {/* Plan Popularity Chart */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <h2 className="text-lg font-semibold mb-2">Plan Popularity</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={planData}
              dataKey="count"
              nameKey="plan"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {planData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Most Watched Ad Durations */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <h2 className="text-lg font-semibold mb-2">Most Watched Ad Durations</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={adDurationData}>
            <XAxis dataKey="duration" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="views" fill="#8884d8" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;