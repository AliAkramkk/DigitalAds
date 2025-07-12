import React from "react";
import { FaVideo, FaUpload, FaPaintBrush } from "react-icons/fa";

const Services = () => {
  const services = [
    {
      icon: <FaVideo size={40} className="text-blue-800 " />,
      title: "Watch Ads & Get Rewards",
      description: "Turn your screen time into rewards. Watch ads, earn cashback, and unlock exclusive deals effortlessly.!",
      linkText: "Start Watching by Login ",
      borderColor: "border-b-4 border-gray-600",
      hoverBg: "hover:bg-gray-600",
    },
    {
      icon: <FaUpload size={40} className="text-red-800 " />,
      title: "Customers Can Add Ads",
      description: "Promote your business to a targeted audience and increase engagement effortlessly. Upload your ads, track performance, and grow your brand with AdsView.",
      linkText: "Upload Ad ",
      borderColor: "border-b-4 border-gray-600",
      hoverBg: "hover:bg-gray-600",
    },
    // {
    //   icon: <FaPaintBrush size={30} className="text-green-800 " />,
    //   title: "Designers Oppurtunity to connect buisness owner & Earn",
    //   description: "Submit your creative designs and earn rewards for every purchase.",
    //   linkText: "Submit Design →",
    //   borderColor: "border-b-4 border-gray-600",
    //   hoverBg: "hover:bg-gray-600",
    // },
  ];

  return (
    <div className="p-10 text-center">
      {/* <h2 className="text-3xl md:text-5xl font-mono text-blue-800 mb-6">Our Services</h2> */}
      <div className="flex flex-wrap justify-between gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className={`group bg-white p-6 rounded-lg shadow-lg w-[600px] text-center transition-all duration-300 ${service.borderColor} ${service.hoverBg} hover:text-white`}
          >
            <div className="flex flex-row justify-between">
            <div className="p-4 bg-white rounded-lg w-1/3  ">
              {service.icon}
            </div>
            <h3 className="text-xl font-mono text-left px-2 text-blue-900 mt-4 group-hover:text-white">{service.title}</h3>
            </div>
            <p className="text-gray-600 mt-2 group-hover:text-white text-start">{service.description}</p>
            <a href="#" className="font-bold mt-4 block group-hover:text-white">
              {/* {service.linkText} */}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
