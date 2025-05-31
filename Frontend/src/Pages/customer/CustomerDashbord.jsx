import React, { useState, useEffect } from 'react';
import CustomerNavbar from '../../components/customer/CustomerNavbar';
import { useSelector } from 'react-redux';
import axiosInstance from '../../api/axiosInstance';
import DashboardChart from '../../components/customer/DashboardChart';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import BusinessGrowthCard from '../../components/customer/BusinessGrowthCard';

ChartJS.register(ArcElement, Tooltip, Legend);

const CustomerDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [summary, setSummary] = useState({
    uploadedAdsCount: 0,
    watchedCount: 0,
    adsRemaining: 0,
    planType: '',
    subscriptionExpiry: '',
    daysRemaining: 0,
    comments: [],
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axiosInstance.get('/customer/dashboard-summary');
        setSummary(res.data);
      } catch (err) {
        console.error('Failed to fetch summary', err);
      }
    };

    fetchSummary();
  }, []);

  const doughnutData = {
    labels: ['Used Ads', 'Remaining Ads', 'Days Remaining'],
    datasets: [
      {
        data: [
          summary.uploadedAdsCount,
          summary.adsRemaining,
          summary.daysRemaining,
        ],
        backgroundColor: ['#ef4444', '#22c55e', '#3b82f6'],
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  return (
    <>
      <CustomerNavbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Greeting */}
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome back, <span className="text-amber-500 uppercase">{user.name}</span>
            </h1>
            <p className="text-gray-600 mt-1">Here’s a quick overview of your activity.</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 text-sm">Total Ads Uploaded</h3>
            <p className="text-3xl font-bold text-blue-600">{summary.uploadedAdsCount}</p>
            <h3 className="text-gray-500 text-sm mb-1">Plan Type</h3>
            <p className="text-lg font-medium text-gray-800">{summary.planType || 'N/A'}</p>

            <div className="mt-4">
              <h3 className="text-gray-500 text-sm">Ads Watched</h3>
              <p className="text-xl font-semibold text-green-600">{summary.watchedCount}</p>
              <h3 className="text-gray-500 text-sm mt-2">Ads Remaining</h3>
              <p className="text-xl font-semibold text-orange-500">{summary.adsRemaining}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 text-sm">Days Remaining</h3>
            <p
              className={`text-3xl font-bold ${
                summary.daysRemaining < 5 ? 'text-red-600' : 'text-green-700'
              }`}
            >
              {summary.daysRemaining}
            </p>
            <div className="w-full h-40 mt-6">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
          
          <DashboardChart summary={summary} />
        </div>
        </div>

        {/* Chart */}
       

        {/* Business Growth Card */}
        <div className="mb-10">
          <BusinessGrowthCard />
        </div>

        {/* Comments / Reviews */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-center mb-6">Reviews on Your Ads</h2>
          {summary.comments.length === 0 ? (
            <p className="text-center text-gray-500">No comments yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[450px] overflow-y-auto">
              {summary.comments.slice(0, 6).map((review, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition even:mt-10 odd:mb-10"
                >
                  <h3 className="text-md font-semibold text-blue-600 text-center">{review.adTitle}</h3>
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                  <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                    <span className="text-yellow-500 font-medium">⭐ {review.rating}/5</span>
                    <span>
                      by {review.userName} ·{' '}
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
