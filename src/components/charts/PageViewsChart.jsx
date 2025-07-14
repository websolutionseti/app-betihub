import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const PageViewsChart = ({ data }) => {
  const chartData = data.map(item => ({
    name: item.page.replace('/', '').charAt(0).toUpperCase() + item.page.replace('/', '').slice(1) || 'Home',
    value: item.viewCount
  }));

  const COLORS = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-effect border border-white/20 rounded-lg p-3 shadow-xl">
          <p className="text-white font-medium">{payload[0].name}</p>
          <p className="text-purple-400">
            {`Visualizações: ${payload[0].value.toLocaleString()}`}
          </p>
          <p className="text-gray-400 text-xs">
            {`${((payload[0].value / data.reduce((sum, item) => sum + item.viewCount, 0)) * 100).toFixed(1)}% do total`}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderLabel = (entry) => {
    const percent = ((entry.value / data.reduce((sum, item) => sum + item.viewCount, 0)) * 100).toFixed(0);
    return `${percent}%`;
  };

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PageViewsChart;