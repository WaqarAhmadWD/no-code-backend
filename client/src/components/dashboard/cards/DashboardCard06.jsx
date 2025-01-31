import React from 'react';
import DoughnutChart from '../../charts/DoughnutChart';

// Import utilities
import { tailwindConfig } from '../../../utils/Utils';

function DashboardCard06() {

  const chartData = {
    labels: ['United States', 'Italy', 'Other'],
    datasets: [
      {
        label: 'Top Countries',
        data: [
          30, 50, 20,
        ],
        backgroundColor: [
          tailwindConfig().theme.colors.bluecolortwo[500],
          tailwindConfig().theme.colors.bluecolorthree[500],
          tailwindConfig().theme.colors.bluecolor[500],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.bluecolor[500],
          tailwindConfig().theme.colors.bluecolortwo[500],
          tailwindConfig().theme.colors.bluecolorthree[500],
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100">
        <h1 className="font-semibold blue-text font-weight700 text-center text-lg">Total Overview</h1>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={289} height={200} />
    </div>
  );
}

export default DashboardCard06;
