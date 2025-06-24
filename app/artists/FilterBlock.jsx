export default function ArtistFilters({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-wrap gap-4 mb-6">
      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 text-sm"
      >
        <option value="">All Categories</option>
        <option value="Singer">Singer</option>
        <option value="Dancer">Dancer</option>
        <option value="DJ">DJ</option>
        <option value="Speaker">Speaker</option>
      </select>

      <select
        name="location"
        value={filters.location}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 text-sm"
      >
        <option value="">All Locations</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Delhi">Delhi</option>
        <option value="Pune">Pune</option>
        <option value="Chennai">Chennai</option>
        <option value="Ahmedabad">Ahmedabad</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Noida">Noida</option>
        <option value="Bangalore">Bangalore</option>
      </select>

      <select
        name="feeRange"
        value={filters.feeRange}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 text-sm"
      >
        <option value="">All Fees</option>
        <option value="low">Below ₹20,000</option>
        <option value="mid">₹20,000 - ₹40,000</option>
        <option value="high">Above ₹40,000</option>
      </select>
    </div>
  );
}
