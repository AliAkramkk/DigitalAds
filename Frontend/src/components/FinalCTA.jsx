import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="bg-green-700 text-white py-16 text-center rounded-xl max-w-4xl mx-auto mb-20 shadow-lg px-6">
      <h2 className="text-4xl font-bold mb-4 font-mono">
        Ready to Make Your Time More Rewarding?
      </h2>
      <p className="mb-8 max-w-xl mx-auto">
        Join Ads View today — whether to grow your business or earn rewards effortlessly.
      </p>
      <Link
        to="/signup"
        className="bg-white text-green-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition"
      >
        Get Started Now
      </Link>
    </section>
  );
};

export default FinalCTA;
