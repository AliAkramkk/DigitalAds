// BlogsPage.jsx
import React from 'react';
import Blogs from '../../components/User/Blogs';

const BlogsPage = () => {
  return (
    <div className='p-5'>
      <h2 className='text-2xl font-bold mb-4'>All Blogs</h2>
      <Blogs limit={100} /> {/* Fetch all */}
    </div>
  );
};

export default BlogsPage;
