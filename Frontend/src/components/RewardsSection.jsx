import { RiHandCoinFill } from "react-icons/ri";

const RewardsSection = () => {
  return (
    <section className="bg-gradient-to-r from-amber-200 to-violet-300 text-white py-20 px-6 text-center rounded-xl max-w-5xl mx-3 md:mx-auto md:my-20 shadow-lg">
      <RiHandCoinFill size={70} className="mx-auto mb-6 text-yellow-300 drop-shadow-lg" />
      <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
        Earn Rewards Effortlessly
      </h2>
      <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
        Every ad you watch on Ads View earns you cashback and exclusive rewards. 
        Redeem your earnings anytime and enjoy special deals from our partners.
      </p>
      <a
        href="/signup"
        className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300"
      >
        Join & Start Earning
      </a>
    </section>
  );
};

export default RewardsSection;
