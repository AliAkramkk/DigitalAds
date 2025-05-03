// components/SubscriptionStatus.jsx

import React from "react";
import { useSelector } from "react-redux";
import { FaRegClock, FaBullhorn, FaCrown } from "react-icons/fa";

const SubscriptionStatus = () => {


  
  const { subscriptionPlan, adsRemaining, daysRemaining, } = useSelector(
    (state) => state.payment
  );

  if (!subscriptionPlan) {
    return (
      <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl shadow-md mb-4">
        <p className="font-semibold">You are currently on the Free Trial plan.</p>
        {/* <p className="text-sm">You can upload up to 2 ads for free.</p> */}
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl shadow mb-4 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-2">
        <FaCrown className="text-blue-600" />
        <span className="font-medium">Plan:</span> {subscriptionPlan}
      </div>
      <div className="flex items-center gap-2">
        <FaBullhorn className="text-green-600" />
        <span className="font-medium">Ads Left:</span> {adsRemaining}
      </div>
      <div className="flex items-center gap-2">
        <FaRegClock className="text-purple-600" />
        <span className="font-medium">Expires In:</span> {daysRemaining} days
      </div>
    </div>
  );
};

export default SubscriptionStatus;
