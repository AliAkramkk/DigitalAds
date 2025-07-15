import { useState, useEffect } from "react";
import hom1 from "../assets/Images/phone1.png";
import hom2 from "../assets/Images/phone2.png";
// import GridMotion from "../components/HomePage/GridMotion";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowRight,BsBuildingsFill,BsBarChartFill } from "react-icons/bs";
import { AiOutlineUser,AiTwotoneVideoCamera,AiTwotoneDollar } from "react-icons/ai";
import Achievments from "../components/HomePage/Achievments";
import Services from "../components/HomePage/Services";
import holdwatchwin from "../assets/Images/holdwatchwin.png";
import grow from "../assets/Images/grow.png";
import { MdMapsHomeWork } from "react-icons/md";
import TiltedGrid from "../components/HomePage/TiltedImageGrid";
import { Link } from "react-router-dom";


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
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      <Navbar />
      <div className="relative  ">
        {/* Top SVG Wave */}
      

        {/* Hero Section */}
        {/* <div className="relative bg-purple-50 min-h-screen flex flex-col md:flex-row justify-around pt-24 items-center px-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[currentSlide].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-around items-center w-full"
          >
            {/* Text Section */}
            {/* <div className="m-3 py-10 md:py-15 md:px-5 text-left w-full md:w-1/2">
              <h1 className="text-3xl md:text-5xl font-mono text-gray-900">{slides[currentSlide].title}</h1>
              <p className="text-gray-700 mt-4 text-lg md:text-xl">{slides[currentSlide].description}</p>
              <Link to="/signup">
              <button className="mt-3 md:mt-5 md:px-4 md:py-3 p-3 bg-black text-white rounded-lg flex items-center justify-around gap-4 transition-all duration-300 group">
                SignUp Now
                <span className="font-bold text-2xl group-hover:translate-x-2 transition-transform duration-300">
                  <BsArrowRight />
                </span>
              </button>
              </Link>
            </div> */}

            {/* Image Section */}
            {/* <motion.img
              src={slides[currentSlide].img}
              alt=""
              className="m-2 md:py-5 md:w-[500px] md:h-auto object-cover rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
        </AnimatePresence>
      </div> */} 

      {/* herosection */}

      <div className="flex flex-row  m-5 justify-center items-center gap-5">
        <div className="flex flex-col w-1/2">
          <h1 className="text-5xl p-3 font-mono mt-16">Change the  way <br />you use your <br /> social media </h1>
          <p className="md:mt-24">Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi mollitia fugiat id odio neque ducimus, ex suscipit nulla esse cupiditate eum aperiam sequi ipsam quos dolorum eius cumque culpa nisi omnis alias incidunt velit!</p>
          <Link to="/signup">
              <button className="mt-3 md:mt-5 md:px-4 md:py-3 p-3 bg-black text-white rounded-full flex items-center justify-around gap-4 transition-all duration-300 group">
                SignUp Now
                <span className="font-bold text-2xl group-hover:translate-x-2 transition-transform duration-300">
                  <BsArrowRight />
                </span>
              </button>
              </Link>
        </div>

        <div className="flex flex-col mt-28 ">
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
              13+ Active Users <br />80+ Buisness Owners <br /> 100+ Ads Uploaded
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
<h1 className="text-2xl text-green-950 text-center mt-14 font-mono "> About Us</h1>
<h1 className="text-5xl  text-center mt-14 font-mono "> One App For all Your <br />Entertainment</h1>
<h1 className="text-md justify-center text-start  mt-8 ml-[450px] font-mono text-gray-400 "> Ads View redefines the way you earn online. <br />Whether you're a creator, business, or looking to boost passive income, <br />our platform helps you monetize your time effectively</h1>
       
       <div className="mx-20 mt-6 flex flex-row">
        <div className="w-1/4 p-4 h-[280px] text-2xl text-white font-thin bg-amber-300"style={{ backgroundColor: '#1C3F3A' }}>Make Your Digital Time More Meaningfull
        <BsBarChartFill className="w-36 h-48 text-white text-center items-center ml-8 mt-5" />
        </div>
        <div className=" p-4 h-[280px] mx-3 rounded-bl-[80px] w-5/6"style={{ backgroundColor: '#E0EAE8' }}>
        <div className="flex flex-row"
        >
          <div className="w-1/4 border shadow-xl p-4 m-3 font-thin rounded-bl-[40px]">
          <BsBuildingsFill className="w-32 h-40 text-blue-400 " />
         <h1 className="text-center">110+ companies</h1>

          </div>
          <div className="w-1/4 border shadow-xl p-4 m-3 font-thin">
          <AiOutlineUser className="w-32 h-40 text-amber-400"/>
         <h1 className="text-center">200+ Active Users</h1>

          </div>
          <div className="w-1/4 border shadow-xl p-4 m-3 font-thin text-center">
          <AiTwotoneVideoCamera className="w-32 h-40 text-green-600"/>
         <h1 className="text-center">200+ Ads Published</h1>

          </div>
          <div className="w-1/4 border shadow-xl p-4 m-3 font-thin">
          <AiTwotoneDollar className="w-32 h-40 text-blue-600"/>
         <h1 className="text-center">20000+ Rewards delivered</h1>

          </div>
       

        </div>
        
        </div>
       </div>
      </div>
    </>
  );
};

export default Home;
