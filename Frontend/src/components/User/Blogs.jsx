import React, { useEffect, useState } from 'react';
import axiosInstance from "../../api/axiosInstance";

const categories = ['All', 'Sports', 'Career', 'Personal Development', ];

const Blogs = ({ limit = 3, showMore = false, audience = "user" }) => {
  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCategories, setShowCategories] = useState(false);


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get(`/user/blogs?audience=${audience}`);
        console.log("Blogs fetched:", res.data);
        setBlogs(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
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
   <div className='flex flex-col md:flex-row p-4 gap-5'>

      <div className='w-full md:w-1/5 bg-amber-50 p-5 rounded-lg'>
      <div className='sticky top-20 p-5 bg-amber-100 rounded-lg shadow-md'>
        <h3 className='font-bold mb-2 text-xs md:text-lg'>Categories</h3>
        <button 
  className="md:hidden mb-3 bg-amber-200 px-3 py-2 rounded-md font-semibold"
  onClick={() => setShowCategories(!showCategories)}
>
  {showCategories ? "Hide Categories" : "Show Categories"}
</button>

{showCategories && (
  <div className='bg-amber-50 p-4 rounded-lg shadow-md md:block'>
       {categories.map((cat) => (
  <div
    key={cat}
    onClick={() => setSelectedCategory(cat)}
    className={`cursor-pointer mb-2 p-2 rounded-md text-sm md:text-base transition-all
      ${selectedCategory === cat 
        ? 'bg-blue-200 text-blue-800 font-semibold' 
        : 'hover:bg-blue-100 text-gray-700'}`}
  >
    {cat}
  </div>
))}
  </div>
)}
 {categories.map((cat) => (
  <div
    key={cat}
    onClick={() => setSelectedCategory(cat)}
    className={`hidden md:block cursor-pointer mb-2 p-2 rounded-md text-sm md:text-base transition-all
      ${selectedCategory === cat 
        ? 'bg-blue-200 text-blue-800 font-semibold' 
        : 'hover:bg-blue-100 text-gray-700'}`}
  >
    {cat}
  </div>
))}
        </div>
      </div>
      <div className='w-full md:w-4/5  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {filtered.slice(0, limit).map((blog) => (
          <div key={blog._id} className='bg-slate-200 p-4 rounded-lg '>
            {blog.image && (
              <img 
                src={blog.image}
                alt={blog.title}
                className='w-full h-40 object-cover mb-2 rounded'
              />
            )}
            <h4 className='font-semibold'>{blog.title}</h4>
            <p className='text-sm text-gray-600'>{blog.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
