import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
const steps = [
  {
    title: "Seamless Ad Creation",
    description:
      "Customers can design and publish ads effortlessly, reaching the right audience in just a few clicks.",
  },
  {
    title: "Engage & Earn",
    description:
      "Users get rewarded for watching ads — turning every view into an opportunity.",
  },
  {
    title: "Real-Time Insights",
    description:
      "Track ad performance instantly with analytics that help you maximize results.",
  },
  {
    title: "Secure & Scalable",
    description:
      "Built with modern technology to ensure smooth, safe, and scalable ad experiences for all.",
  }
];


const StepCard = ({ step, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.6, once: false });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.9, filter: "blur(6px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : { opacity: 0.4, scale: 0.95, filter: "blur(4px)" }
      }
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 relative"
    >
      {/* Number Badge */}
      <div className="absolute -left-6 top-6 w-10 h-10 flex items-center justify-center rounded-full bg-[#1C3F3A] text-white font-bold shadow-md">
        {index + 1}
      </div>

      <h2 className="text-2xl font-semibold text-[#1C3F3A] mb-4">
        {step.title}
      </h2>
      <p className="text-gray-600">{step.description}</p>
    </motion.div>
  );
};

const ServiceCard = () => {
  return (
    <section className="relative py-20  my-28 mx-4 md:m-24">
      <div className="md:max-w-7xl mx-auto grid md:grid-cols-2 gap-16 px-6">
        {/* Left fixed heading */}
      

        {/* Right scroll steps */}
        <div className="space-y-32 relative">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
<div className="sticky md:top-40 h-fit rounded-full bg-amber-300 md:w-[600px] md:h-[600px] w-[400px] h-[400px] flex items-center justify-center">
  <div className="flex flex-col items-center md:items-start">
    <h1 className="text-xl md:text-5xl font-stretch-50% text-[#1C3F3A] m-4 md:m-0 mb-6">
      Ads That Work,<br /> Rewards That Matter
    </h1>
    <p className="md:text-lg text-black font-thin m-4 md:m-0 max-w-sm">
      A smart platform where businesses grow with ads and users get rewarded for engagement.
    </p>
  </div>
</div>

      </div>
    </section>
  );
};

export default ServiceCard;
