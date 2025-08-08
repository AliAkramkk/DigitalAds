import { useState, useEffect } from "react";
import hom1 from "../assets/Images/phone1.png";
import hom2 from "../assets/Images/phone2.png";
// import GridMotion from "../components/HomePage/GridMotion";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowRight,BsBuildingsFill,BsBarChartFill } from "react-icons/bs";
import { AiOutlineUser,AiTwotoneVideoCamera,AiTwotoneDollar } from "react-icons/ai";
import { RiBardLine } from "react-icons/ri"
import Achievments from "../components/HomePage/Achievments";
import Services from "../components/HomePage/Services";
import holdwatchwin from "../assets/Images/holdwatchwin.png";
import grow from "../assets/Images/grow.png";
import { MdMapsHomeWork } from "react-icons/md";
import TiltedGrid from "../components/HomePage/TiltedImageGrid";
import { Link } from "react-router-dom";
import Footer from "../components/HomePage/Footer";
import ChatBox from "../components/ChatBox";


const Home = () => {
 const slides = [
    {
      id: 1,
      title: (
        <>
          MAKE A BETTER <br />
          <span className="text-blue-900">INCOME</span>
        </>
      ),
      description:
        "Ads View redefines the way you earn online. Whether you're a creator, business, or looking to boost passive income, our platform helps you monetize your time effectively.",
      img: hom1,
    },
    {
      id: 2,
      title: (
        <>
          Are You A <span className="text-blue-900">Business Owner?</span>
        </>
      ),
      description:
        "Promote your products or services easily on Ads View. Reach a broader audience, increase brand visibility, and drive real engagement while monitoring your ad performance.",
      img: hom2,
    },
  ]; 

   const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % 2); // Only 2 posters
  }, 5000); // Change every 5 seconds

  return () => clearInterval(interval);
}, []);

  return (
    <>
      <Navbar />
      <div className="relative  ">
        {/* Top SVG Wave */}
      
<div className="relative w-full overflow-hidden mt-20">
  <AnimatePresence mode="wait">
    {currentSlide === 0 && (
      <motion.div
        key="poster1"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-amber-300 to-yellow-200 p-6 md:p-12 rounded-2xl shadow-lg mx-4 md:mx-20"
      >
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-5xl font-bold text-green-900">
            🎉 New Customers Get <span className="text-red-600">2 FREE Ads!</span>
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            Promote your products and services at zero cost! Sign up now and get
            two ad uploads absolutely free. Start reaching your audience today.
          </p>
          <Link to="/signup">
            <button className="mt-6 px-6 py-3 bg-green-900 text-white rounded-full flex items-center gap-3 hover:bg-green-700 transition-all">
              Claim Your Free Ads <BsArrowRight className="text-xl" />
            </button>
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img src={hom1} alt="Free Ads Promo" className="w-72 md:w-96 drop-shadow-xl" />
        </div>
      </motion.div>
    )}

    {currentSlide === 1 && (
      <motion.div
        key="poster2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-green-900 to-green-700 p-6 md:p-12 rounded-2xl shadow-lg mx-4 md:mx-20"
      >
        <div className="md:w-1/2 text-white">
          <h1 className="text-3xl md:text-5xl font-bold">
            💰 Earn Rewards While You Watch
          </h1>
          <p className="mt-4 text-lg">
            Every ad you watch turns into real rewards. Sign up today and start
            earning from your screen time. The more you watch, the more you earn!
          </p>
          <Link to="/signup">
            <button className="mt-6 px-6 py-3 bg-amber-300 text-green-900 rounded-full flex items-center gap-3 hover:bg-amber-200 transition-all">
              Start Earning Now <BsArrowRight className="text-xl" />
            </button>
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img src={hom2} alt="Earn Rewards" className="w-72 md:w-96 drop-shadow-xl rounded-xl" />
        </div>
      </motion.div>
    )}
  </AnimatePresence>

  {/* Carousel Dots */}
  <div className="flex justify-center mt-4 gap-3">
    {[0, 1].map((index) => (
      <button
        key={index}
        onClick={() => setCurrentSlide(index)}
        className={`h-3 w-3 rounded-full transition-all ${
          currentSlide === index ? "bg-green-900 w-6" : "bg-gray-400"
        }`}
      />
    ))}
  </div>
</div>
      

      <div className="flex md:flex-row flex-col  m-5 justify-center items-center gap-5">
        <div className="flex flex-col w-full md:w-2/3 mt-20 md:p-5 bg-amber-300 rounded-r-full">
          <h1 className="md:text-5xl p-3 font-mono mt-16">Change the  way <br />you use your <br /> social media </h1>
          <p className="md:mt-24 text-gray-800 p-5">Make your digital time more meaningful with Ads View.Turn your screen time into rewards. Watch ads, earn cashback, and unlock exclusive deals effortlessly.
            
            Join us today and start earning while you engage with content you love.
          </p>
          <Link to="/signup">
              <button className="mt-3 md:mt-5 md:px-4 md:py-3 p-3 m-4 bg-black text-white rounded-full flex items-center justify-around gap-4 transition-all duration-300 group">
                SignUp Now
                <span className="font-bold text-2xl group-hover:translate-x-2 transition-transform duration-300">
                  <BsArrowRight />
                </span>
              </button>
              </Link>
        </div>

        <div className="relative flex flex-col mt-28 bg-amber-300 p-4 overflow-hidden">
            <div className="hidden md:block absolute -left-72 -top-0 h-full w-10/12 bg-white rounded-full z-0"></div>
          <div className="flex flex-row gap- ml-32">
            <div className="w-48 p-8"style={{ backgroundColor: '#E0EAE8' }}>
              {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, suscipit? */}
              <img src={holdwatchwin} alt="" className="-mt-12 w-[400px] h-[150px]" />
            </div>
            <div className="w-48 h-[200px] rounded-l-[150px]"style={{ backgroundColor: '#EBE8D8' }}>
              <h1 className="text-end text-xl m-3 font-thin">121+</h1>
              <h1 className="text-start m-3 mt-10 text-xl font-thin">Companies</h1>
             <h1 className="text-end text-5xl ml-32 font-thin"> <MdMapsHomeWork /></h1>
            </div>
          </div>

           <div className="flex flex-row  ml-32">
            <div className="w-48 p-8 rounded-tr-[105px] font-thin"style={{ backgroundColor: '#E0EAE8' }}>
              <RiBardLine className=" w-10 h-10 text-start justify-start items-start mr-80"/>
              80+ Users Online <br />80+ Buisness Owners 
            </div>
            <div className="w-48"style={{ backgroundColor: '#1C3F3A' }}>
        <img src={grow} alt="" className="items-center justify-center m-8" />
            </div>
          </div>
          
        </div>
      </div>

        {/* Customers Section */}
 {/* <Achievments /> */}
{/* <Services /> */}
<h1 className="text-xl md:text-2xl text-green-950 text-center mt-14 font-mono "> About Us</h1>
<h1 className="px-4 md:px-0 md:text-5xl  md:text-center mt-14 font-mono "> One App For all Your <br />Entertainment</h1>
<h1 className="px-4 text-md md:justify-center text-start  mt-8 md:ml-[450px] font-mono text-gray-400 "> Ads View redefines the way you earn online. <br />Whether you're a creator, business, or looking to boost passive income, <br />our platform helps you monetize your time effectively</h1>
       
       <div className="md:mx-20 mx-5 mt-6 flex md:flex-row flex-row-2">
        <div className="w:1/2 md:w-1/4 p-4 h-[280px] text-2xl text-white font-thin bg-amber-300"style={{ backgroundColor: '#1C3F3A' }}>Make Your Digital Time More Meaningfull
        <BsBarChartFill className="md:w-36 md:h-48 h-28 text-white text-center items-center ml-8 mt-5" />
        </div>
        <div className=" p-4 h-[280px] m:3 md:mx-3 rounded-bl-[80px] md:w-5/6"style={{ backgroundColor: '#E0EAE8' }}>
        <div className="flex md:flex-row "
        >
          <div className="w-1/4 border shadow-xl md:p-4 m-3 md:ml-16 font-thin ">
          <BsBuildingsFill className="w-24 h-28 md:w-32 md:h-40 text-blue-400 " />
         <h1 className="text-center">110+ companies</h1>

          </div>
          <div className="w-1/4 border shadow-xl md:p-4 m-3 font-thin">
          <AiOutlineUser className="w-24 h-28 md:w-32 md:h-40 text-amber-700"/>
         <h1 className="text-center">200+ Active Users</h1>

          </div>
          <div className="w-1/4 border shadow-xl md:p-4 m-3 font-thin text-center">
          <AiTwotoneVideoCamera className="w-24 h-28 md:w-32 md:h-40 text-white"/>
         <h1 className="text-center">200+ Ads Published</h1>

          </div>
          {/* <div className="w-1/4 border shadow-xl p-4 m-3 font-thin">
          <AiTwotoneDollar className="w-32 h-40 text-blue-300"/>
         <h1 className="text-center">20000+ Rewards delivered</h1>

          </div> */}
       

        </div>
        
        </div>
       </div>
       <Services />
      </div>
      <ChatBox />
      <Footer />
    </>
  );
};

export default Home;
