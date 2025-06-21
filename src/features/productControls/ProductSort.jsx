const ProductSort = ({ sortOption, onSortChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600 font-medium">Sort by:</label>
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
      >
        <option value="az">Alphabet A - Z</option>
        <option value="za">Alphabet Z - A</option>
        <option value="low-high">Lowest Price</option>
        <option value="high-low">Highest Price</option>
      </select>
    </div>
  );
};

export default ProductSort;
