import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DashboardChart = ({ summary }) => {
  const data = {
    labels: ['Uploaded Ads', 'Ads Watched', 'Ads Remaining'],
    datasets: [
      {
        label: 'Ad Statistics',
        data: [
          summary.uploadedAdsCount,
          summary.watchedCount,
          summary.adsRemaining,
        ],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-xl font-semibold text-center mb-4">Ad Summary</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DashboardChart;
