import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  UsersIcon,
  UserCheckIcon,
  UserCogIcon,
  FilmIcon,
  ClockIcon,
  GiftIcon,
  CreditCardIcon,
  CalendarCheckIcon,
} from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

const DashboardMetrics = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axiosInstance.get("/admin/dashboard-details");
        setMetrics(res.data);
      } catch (err) {
        console.error("Error fetching dashboard metrics", err);
      }
    };
    fetchMetrics();
  }, []);

  if (!metrics) {
    return <div className="text-center p-4">Loading metrics...</div>;
  }

  const cards = [
    {
      title: "Total Users",
      value: metrics.totalUsers,
      icon: <UsersIcon className="w-6 h-6 text-white" />,
      color: "bg-blue-500",
    },
    {
      title: "Total Customers",
      value: metrics.totalCustomers,
      icon: <UserCheckIcon className="w-6 h-6 text-white" />,
      color: "bg-green-500",
    },
    {
      title: "Total Admins",
      value: metrics.totalAdmins,
      icon: <UserCogIcon className="w-6 h-6 text-white" />,
      color: "bg-yellow-500",
    },
    {
      title: "Total Ads",
      value: metrics.totalAds,
      icon: <FilmIcon className="w-6 h-6 text-white" />,
      color: "bg-purple-500",
    },
    {
      title: "Pending Ads",
      value: metrics.pendingAds,
      icon: <ClockIcon className="w-6 h-6 text-white" />,
      color: "bg-orange-500",
    },
    {
      title: "Total Rewards",
      value: `${metrics.totalRewardsGiven.toFixed(2)} AED`,
      icon: <GiftIcon className="w-6 h-6 text-white" />,
      color: "bg-pink-500",
    },
    {
      title: "Payments Made",
      value: `${metrics.totalPaymentsMade.toFixed(2)} AED`,
      icon: <CreditCardIcon className="w-6 h-6 text-white" />,
      color: "bg-indigo-500",
    },
    {
      title: "Active Subscriptions",
      value: metrics.activeSubscriptions,
      icon: <CalendarCheckIcon className="w-6 h-6 text-white" />,
      color: "bg-teal-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`rounded-2xl shadow-md p-4 text-white flex items-center justify-between ${card.color}`}
        >
          <div>
            <h3 className="text-sm font-semibold">{card.title}</h3>
            <p className="text-xl font-bold">{card.value}</p>
          </div>
          <div className="ml-4">{card.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardMetrics;
