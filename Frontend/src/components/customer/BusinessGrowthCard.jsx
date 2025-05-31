import { useNavigate } from 'react-router-dom';
import { BriefcaseIcon, GlobeAltIcon, ChartBarIcon, SparklesIcon } from '@heroicons/react/24/outline';

const BusinessGrowthCard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-xl border border-gray-100 rounded-3xl p-6 m-5 md:flex items-center justify-between transition-transform hover:scale-[1.01]">
      <div className="flex items-center gap-6">
        <div className="bg-indigo-100 text-indigo-600 rounded-full p-3">
          <SparklesIcon className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Want to Grow Your Business?</h2>
          <p className="text-gray-600 mt-1">
            Unlock growth with services like website creation, SEO, and digital marketing — tailored just for you.
          </p>
        </div>
      </div>
      <button
        onClick={() => navigate('/customer/services')}
        className="mt-4 md:mt-0 bg-indigo-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-indigo-700 transition"
      >
        Explore Services
      </button>
    </div>
  );
};

export default BusinessGrowthCard;

