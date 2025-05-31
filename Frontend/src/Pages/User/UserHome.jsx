import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import UserNavbar from '../../components/User/UserNavbar';
import { useNavigate } from "react-router-dom";
import Blogs from '../../components/User/Blogs';

const UserHome = () => {
  const { user } = useSelector((state) => state.auth);
  const [ads, setAds] = useState([]);
  const [stats, setStats] = useState({ totalAdsWatched: 0, totalRewardEarned: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get("/user/latest-ads")
      .then(res => {
        setAds(res.data);
        console.log("Latest ads fetched successfully:", res.data);
        
      })
      .catch(err => {
        console.error("Failed to load ads", err);
      });
  }, []);

  useEffect(() => {
    axiosInstance.get("/user/latest-ads")
      .then(res => setAds(res.data))
      .catch(err => console.error("Failed to load ads", err));
  
    axiosInstance.get("/user/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error("Failed to load stats", err));
  }, []);

  return (
    <> 
      <UserNavbar />
      <div className='flex md:flex-row m-5 gap-5 h-[145px] '>
        <div className='p-5 w-2/3 shadow-lg bg-blend-hue bg-blue-50  font-thin rounded-lg items-center text-center text-xl md:text-5xl'> 
          Welcome to ADs View Dashbord <br /> <span className='uppercase font-mono text-pink-600'>{user.name}</span>
        </div>
        <div className='w-1/3 shadow-lg bg-amber-50 rounded-lg p-5 text-xl md:text-3xl'>
  <div>Total ads watched: <span className='font-bold'>{stats.totalAdsWatched}</span></div>
  <div>Total rewards earned: <span className='font-bold'>{stats.totalRewardEarned}</span></div>
</div>
      </div> 

      <div className='m-5'>
        <div className='flex justify-between'>
        <h2 className='text-xl md:text-2xl font-semibold mb-3 px-4'>Latest Ads</h2>
        {/* <p className=' '>See All ads</p> */}
        <button 
            onClick={() => navigate("/ads")}
            className='rounded-full bg-black text-white p-3 text-sm hover:bg-white hover:text-black hover:border'
          >
            See All Ads
          </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:gap-14 p-6'>
        {ads.map((ad) => (
  <div
    key={ad._id}
    onClick={() => navigate(`/user/ads/${ad._id}`)}
    className='cursor-pointer relative h-56 rounded overflow-hidden shadow-lg bg-center  bg-no-repeat bg-cover transition-transform transform hover:scale-105'
    style={{ backgroundImage: `url(${ad.thumbnailUrl})` }}
  >
    <div className='absolute inset-0 flex flex-col justify-end p-4 text-white border-4'>
      <h3 className='text-lg font-semibold'>{ad.title}</h3>
      <p className='text-sm truncate'>{ad.description}</p>
    </div>
  </div>
))}
        </div>
        <div className='flex justify-center mt-4'>
          
        </div>
      </div>

      {/* <div className='grid grid-cols-4 m-5 bg-gray-100 h-[350px]'>
        <div className='bg-white m-3 p-4 border-b-lime-300 border-4'>blogs</div> */}
        {/* repeat for other blogs */}
      {/* </div> */}
      <h1 className='text-xl md:text-4xl font-thin mb-3 px-4 text-center '>Blogs</h1>
<Blogs limit={3} showMore={true} />
      <div className='bg-blue-200 h-[230px] m-5 text-center items-center justify-center py-10'>
        footer
      </div>
    </>
  );
};

export default UserHome;
