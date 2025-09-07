import { Link } from "react-router-dom";
import { FaBullhorn, FaUsers } from "react-icons/fa";

const UserCustomerSplit = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 bg-gray-50 rounded-xl shadow-md">
      {/* Business Owner Section */}
      <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
        <FaBullhorn size={50} className="text-yellow-600 mb-4" />
        <h3 className="text-3xl font-bold mb-4 text-yellow-700">Business Owners</h3>
        <p className="mb-6 text-gray-700">
          Promote your business by uploading targeted ads. Reach a wider audience,
          monitor your performance, and grow your brand effortlessly.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-yellow-600 text-white px-6 py-3 rounded-full hover:bg-yellow-700 transition"
        >
          Market Your Business
        </Link>
      </div>

      {/* Users Section */}
      <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
        <FaUsers size={50} className="text-green-600 mb-4" />
        <h3 className="text-3xl font-bold mb-4 text-green-700">Users</h3>
        <p className="mb-6 text-gray-700">
          Watch ads and earn real rewards. Turn your screen time into cashback and exclusive deals.
          The more you watch, the more you earn!
        </p>
        <Link
          to="/signup"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
        >
          Start Earning Rewards
        </Link>
      </div>
    </section>
  );
};

export default UserCustomerSplit;
