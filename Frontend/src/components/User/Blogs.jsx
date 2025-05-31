import React, { useEffect, useState } from 'react';

const categories = ['All', 'Sports', 'Career', 'Personal Development', 'Ads'];

const Blogs = ({ limit = 3, showMore = false }) => {
  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Replace this with your API call
    const fetchBlogs = async () => {
      const fakeData = [
        { id: 1, title: 'How to Grow Career', category: 'Career' },
        { id: 2, title: 'Ad Strategy Tips', category: 'Ads' },
        { id: 3, title: 'Stay Fit with Sports', category: 'Sports' },
        { id: 4, title: 'Time Management', category: 'Personal Development' },
      ];
      setBlogs(fakeData);
      setFiltered(fakeData);
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFiltered(blogs);
    } else {
      setFiltered(blogs.filter(blog => blog.category === selectedCategory));
    }
  }, [selectedCategory, blogs]);

  return (
    <div className='flex flex-row md:flex-row p-4 gap-5'>
      <div className='w-2/5 md:w-1/5 bg-amber-50 p-5'>
        <h3 className='font-bold mb-2 text-xs md:text-lg'>Categories</h3>
        {categories.map((cat) => (
          <div 
            key={cat} 
            onClick={() => setSelectedCategory(cat)} 
            className={`h-58 space-y-2 md:space-y-2 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible cursor-pointer mb-2 ${selectedCategory === cat ? 'text-blue-600 font-bold' : ''}`}
          >
            {cat}
          </div>
        ))}
      </div>
      <div className='w-full md:w-4/5 bg-slate-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {filtered.slice(0, limit).map((blog) => (
          <div key={blog.id} className='bg-slate-200 p-4 h-58'>
            <h4 className='font-semibold'>{blog.title}</h4>
            <p className='text-sm text-gray-600'>{blog.category}</p>
          </div>
        ))}
      
      </div>
    </div>
  );
};

export default Blogs;
