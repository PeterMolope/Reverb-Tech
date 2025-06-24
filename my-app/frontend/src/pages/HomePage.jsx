import CategoryItem from "../components/CategoryItem";

const categories = [
  { href: "/cpus", name: "CPUs", imageUrl: "/cpu6.jpg" },
  {
    href: "/motherboards",
    name: "Motherboards",
    imageUrl: "/motherboard5.jpg",
  },
  { href: "/gpus", name: "GPUs", imageUrl: "/gpu8.jpg" },
  { href: "/ram", name: "RAM", imageUrl: "/ram1.jpg" },
  { href: "/storage", name: "Storage", imageUrl: "/ssd3.jpg" },
  { href: "/psus", name: "PSUs", imageUrl: "/psu1.jpg" },
];
const HomePage = () => {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-blue-400 mb-4">
          Shop by Category
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Experience Next-Level Gaming Performance with Components
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>

        {/* {!isLoading && products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )} */}
      </div>
    </div>
  );
};

export default HomePage;
