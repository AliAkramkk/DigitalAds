
import { GlobeAltIcon, ChartBarIcon, SparklesIcon, DevicePhoneMobileIcon, MegaphoneIcon } from '@heroicons/react/24/outline';
import CustomerNavbar from '../../components/customer/CustomerNavbar';
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';
import axiosInstance from '../../api/axiosInstance';

const services = [
  {
    title: 'Professional Website Development',
    description: 'Custom, fast, and responsive websites that establish your brand presence online and build trust with your customers.',
    icon: <GlobeAltIcon className="w-10 h-10 text-indigo-600" />,
  },
  {
    title: 'Search Engine Optimization (SEO)',
    description: 'Get found on Google. Drive organic traffic to your business with proven SEO strategies and keyword targeting.',
    icon: <ChartBarIcon className="w-10 h-10 text-green-500" />,
  },
  {
    title: 'Digital Marketing Campaigns',
    description: 'Target your audience with laser-focused ads and social media campaigns that generate leads and grow revenue.',
    icon: <MegaphoneIcon className="w-10 h-10 text-yellow-500" />,
  },
  {
    title: 'Branding & Identity',
    description: 'Professional logos, color systems, and brand identity kits that make your business stand out.',
    icon: <SparklesIcon className="w-10 h-10 text-pink-500" />,
  },
  {
    title: 'Mobile Optimization',
    description: 'Ensure your business is mobile-ready with fast, responsive design that performs great on all devices.',
    icon: <DevicePhoneMobileIcon className="w-10 h-10 text-blue-500" />,
  },
];

const CustomerServices = () => {

const { user } = useSelector((state) => state.auth); // Assuming you have user data in your Redux store

    const [formData, setFormData] = useState({
  name: user?.name || "", // assuming you have user from context or redux
  email: user?.email || "",
  service: "",
  message: "",
  phone: "",
});

const [errors, setErrors] = useState({});

const validate = () => {
  const newErrors = {};

  if (!formData.phone || formData.phone.replace(/\D/g, '').length < 9) {
    newErrors.phone = "Please enter a valid phone number.";
  }

  if (!formData.service) {
    newErrors.service = "Please select a service.";
  }

  if (!formData.message.trim()) {
    newErrors.message = "Please enter your message.";
  }

  return newErrors;
};



const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setErrors({});
  try {
    const response = await axiosInstance.post("/customer/inquiries", formData);
    toast.success("Your message is received. Our team will respond shortly.");
    setFormData({ ...formData, phone: "", service: "", message: "" });
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong. Please try again later.");
  }
};


  return (
    <>
      <CustomerNavbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Grow Your Business with Our Services</h1>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Whether you're just starting or looking to scale, we offer services tailored to boost your online presence and drive real results.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

       <div className="text-center mt-14">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Need Help Growing Your Business?</h2>
  <p className="text-gray-600 mb-6">Tell us what you're looking for. Our team will get back to you with how we can help.</p>
  

 <form
  className="max-w-xl mx-auto text-left space-y-4"
  onSubmit={handleSubmit}
>
  <div>
    <label className="block text-sm font-medium text-gray-700">Name</label>
    <input
      type="text"
      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      disabled
    />
    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Email</label>
    <input
      type="email"
      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      disabled
    />
    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Phone</label>
    <PhoneInput
      country={"ae"}
      inputClass="!w-full !py-2 !pl-12 !pr-4 !border !border-gray-300 !rounded-lg"
      value={formData.phone}
      onChange={(phone) => setFormData({ ...formData, phone })}
      enableSearch
    />
    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">
      What service are you interested in?
    </label>
    <select
      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
      value={formData.service}
      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
    >
      <option value="">Select a service</option>
      <option value="Website Development">Website Development</option>
      <option value="SEO">SEO</option>
      <option value="Digital Marketing">Digital Marketing</option>
      <option value="Branding">Branding</option>
      <option value="Mobile Optimization">Mobile Optimization</option>
    </select>
    {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Message</label>
    <textarea
      rows="4"
      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
      value={formData.message}
      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
    />
    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
  </div>
  <div className="text-center">
    <button
      type="submit"
      className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition"
    >
      Send Inquiry
    </button>
  </div>
</form>
    {/* {error && <div className="text-red-600 text-sm mb-4 text-center">{error}</div>} */}
</div>

      </div>
    </>
  );
};

export default CustomerServices;
