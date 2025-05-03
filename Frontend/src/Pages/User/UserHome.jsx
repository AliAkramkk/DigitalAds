import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import UserNavbar from '../../components/User/UserNavbar';
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const { user } = useSelector((state) => state.auth);
  const [ads, setAds] = useState([]);
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

  return (
    <> 
      <UserNavbar />
      <div className='flex md:flex-row m-5 gap-5 h-[145px]'>
        <div className='p-5 w-2/3 shadow-lg bg-white rounded-lg items-center text-center text-5xl'> 
          Welcome {user.name}
        </div>
        <div className='w-1/3 shadow-lg bg-white rounded-lg p-5 text-2xl'>
          Total ads watched
        </div>
      </div> 

      <div className='m-5'>
        <h2 className='text-xl font-semibold mb-3'>Latest Ads</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {ads.map((ad) => (
  <div
    key={ad._id}
    onClick={() => navigate(`/user/ads/${ad._id}`)}
    className='cursor-pointer relative h-48 rounded-xl overflow-hidden shadow-lg bg-center bg-cover'
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
          <button 
            onClick={() => navigate("/ads")}
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
          >
            Show More
          </button>
        </div>
      </div>

      <div className='grid grid-cols-4 m-5 bg-gray-100 h-[350px]'>
        <div className='bg-white m-3 p-4 border-b-lime-300 border-4'>blogs</div>
        {/* repeat for other blogs */}
      </div>

      <div className='bg-blue-200 h-[230px] m-5 text-center items-center justify-center'>
        footer
      </div>
    </>
  );
};

export default UserHome;
