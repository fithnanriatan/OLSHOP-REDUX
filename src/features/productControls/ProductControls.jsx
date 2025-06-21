import { useEffect, useState } from "react";
import ProductSearch from "./ProductSearch";
import ProductFilter from "./ProductFilter";
import ProductSort from "./ProductSort";

const ProductControls = ({ products, onChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("az");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    setCategories(uniqueCategories);
  }, [products]);

  useEffect(() => {
    let filtered = [...products];

    // Filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Search
    if (searchTerm.trim()) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortOption === "az") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "za") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    onChange(filtered);
  }, [searchTerm, selectedCategory, sortOption, products]);

  return (
    <div className="space-y-4 mb-8">
      <ProductSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <ProductFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <ProductSort sortOption={sortOption} onSortChange={setSortOption} />
    </div>
  );
};

export default ProductControls;
