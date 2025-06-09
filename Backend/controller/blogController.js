import Blog from "../models/blogSchema.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content, audience, category } = req.body;

    const image = req.file?.path || "";
    const createdBy = req.user?._id || null; // fallback to null if not available

    // ✅ Important: category is required in your schema
    const blog = await Blog.create({
      title,
      content,
      audience,
      category,
      image,
      createdBy,
    });

    console.log("Blog created successfully:", blog);
    res.status(201).json(blog);
  } catch (err) {
    console.error("Blog creation error:", err); // debug log
    res.status(500).json({ message: err.message });
  }
};


// GET all blogs (admin view)
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single blog (edit)
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(404).json({ message: "Blog not found" });
  }
};

// UPDATE blog
export const updateBlog = async (req, res) => {
  try {
    const { title, content, audience, published } = req.body;
    const updateData = { title, content, audience, published };

    if (req.file?.path) updateData.image = req.file.path;

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE blog
export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};