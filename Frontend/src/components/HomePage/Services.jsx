import React from "react";
import { FaVideo, FaUpload, FaPaintBrush } from "react-icons/fa";

const Services = () => {
  const services = [
    {
      icon: <FaVideo size={40} className="text-blue-600 " />,
      title: "Watch Ads & Get Rewards",
      description: "Earn rewards by watching ads. Get exclusive deals, cashback, and more!",
      linkText: "Start Watching →",
      borderColor: "border-b-4 border-blue-600",
      hoverBg: "hover:bg-blue-600",
    },
    {
      icon: <FaUpload size={40} className="text-red-500 " />,
      title: "Customers Can Add Ads",
      description: "Easily upload and promote your ads. Get targeted reach & better engagement.",
      linkText: "Upload Ad →",
      borderColor: "border-b-4 border-red-500",
      hoverBg: "hover:bg-red-500",
    },
    {
      icon: <FaPaintBrush size={40} className="text-green-500 e" />,
      title: "Designers Can Add Designs & Earn",
      description: "Submit your creative designs and earn rewards for every purchase.",
      linkText: "Submit Design →",
      borderColor: "border-b-4 border-green-500",
      hoverBg: "hover:bg-green-500",
    },
  ];

  return (
    <div className="p-10 text-center">
      <h2 className="text-3xl font-bold text-blue-900 mb-6">Our Services</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className={`group bg-white p-6 rounded-lg shadow-lg w-80 text-center transition-all duration-300 ${service.borderColor} ${service.hoverBg} hover:text-white`}
          >
            <div className="p-4 bg-white rounded-sm w-1/3  ">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-blue-900 mt-4 group-hover:text-white">{service.title}</h3>
            <p className="text-gray-600 mt-2 group-hover:text-white">{service.description}</p>
            <a href="#" className="font-bold mt-4 block group-hover:text-white">
              {service.linkText}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
