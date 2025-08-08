const testimonials = [
  {
    name: "Sara Khan",
    role: "Business Owner",
    feedback:
      "Uploading my ads on Ads View helped me reach thousands of new customers! The platform is easy to use and effective.",
  },
  {
    name: "Omar Ali",
    role: "User",
    feedback:
      "I love earning rewards just by watching ads. It's a great way to make use of my free time!",
  },
];

const Testimonials = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold mb-12 text-center font-mono">What Our Users Say</h2>
      <div className="flex flex-col md:flex-row gap-10">
        {testimonials.map(({ name, role, feedback }, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md p-8 rounded-lg flex-1 text-gray-800"
          >
            <p className="mb-6 italic">"{feedback}"</p>
            <h4 className="font-semibold text-lg">{name}</h4>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
