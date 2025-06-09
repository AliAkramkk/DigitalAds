import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaUsers, FaAd, FaChartBar } from 'react-icons/fa'

const Sidebar = () => {
  return (
    <div className='w-1/6 flex flex-col'>
        <div className='bg-gray-800 text-white p-4'>
            <h2 className='text-xl font-bold'>Admin Dashboard</h2>
        </div>
        <nav className='flex flex-col p-4 space-y-2'>
            <Link to="/admin" className='flex items-center text-gray-700 hover:text-blue-500'>
            <FaHome className='mr-2' /> Home
            </Link>
            <Link to="/admin/user-list" className='flex items-center text-gray-700 hover:text-blue-500'>
            <FaUsers className='mr-2' /> Users
            </Link>
            <Link to="/admin/pending-ad" className='flex items-center text-gray-700 hover:text-blue-500'>
            <FaAd className='mr-2' /> Ads
            </Link>
            <Link to="/admin/blogs" className='flex items-center text-gray-700 hover:text-blue-500'>
            <FaChartBar className='mr-2' /> Blogs
            </Link>
        </nav>

    </div>
  )
}

export default Sidebar