import { RiHandCoinFill } from "react-icons/ri";

const RewardsSection = () => {
  return (
    <section className="bg-gradient-to-r from-green-600 to-green-400 text-white py-20 px-6 text-center rounded-xl max-w-5xl mx-5 md:mx-auto my-20 shadow-lg">
      <RiHandCoinFill size={70} className="mx-auto mb-6" />
      <h2 className="text-4xl font-bold mb-4 font-mono">Earn Rewards Effortlessly</h2>
      <p className="text-lg max-w-3xl mx-auto mb-8">
        Every ad you watch on Ads View earns you cashback and exclusive rewards. 
        Redeem your earnings anytime and enjoy special deals from our partners.
      </p>
      <a
        href="/signup"
        className="bg-white text-green-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition"
      >
        Join & Start Earning
      </a>
    </section>
  );
};

export default RewardsSection;
