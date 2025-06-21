import { Filter } from "lucide-react";
import { formatCategory } from "../../utils/formatCategory";

const ProductFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Filter className="w-5 h-5 text-gray-500" />
      <button
        onClick={() => onCategoryChange("all")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === "all"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        All Categories
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {formatCategory(category)}
        </button>
      ))}
    </div>
  );
};

export default ProductFilter;
