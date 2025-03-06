import React from "react";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { BsCloudDownload, BsPeople } from "react-icons/bs";

const Achievements = () => {
  const achievements = [
    { icon: <FaRegFaceSmileBeam size={60} className="text-blue-600" />, count: "122,360", label: "Active Users" },
    { icon: <FaRegStar size={60} className="text-orange-500" />, count: "1,820", label: "Reviews" },
    { icon: <BsCloudDownload size={60} className="text-green-500" />, count: "48,597", label: "App Downloads" },
    { icon: <BsPeople size={60} className="text-pink-600" />, count: "10,289,020", label: "Impressions" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {achievements.map((ach, index) => (
        <div key={index} className="bg-white p-6 rounded-sm shadow-xl flex items-center gap-4 w-64 h-36 text-center">
          <div className="p-3">{ach.icon}</div>
          <div>
            <h1 className="text-2xl font-bold text-blue-900">{ach.count}</h1>
            <p className="text-gray-600">{ach.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Achievements;
