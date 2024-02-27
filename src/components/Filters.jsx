import React, { useState, useEffect } from "react";
import { debounce } from "lodash";

export default function Filters({ onFilterChange, filterConfig }) {
  const [filters, setFilters] = useState({});

  const debouncedFilterChange = debounce(onFilterChange, 500);

  useEffect(() => {
    debouncedFilterChange(filters);
    return () => {
      debouncedFilterChange.cancel();
    };
  }, [filters]);

  const clearSelections = () => {
    setFilters({});
  };

  const handleInputChange = (filterKey, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }));
  };

  return (
    <div className="flex justify-center space-x-4">
      {filterConfig.map(({ type, key, placeholder, options }) => {
        switch (type) {
          case "number":
          case "text":
          case "date":
            return (
              <input
                key={key}
                type={type}
                value={filters[key] || ""}
                onChange={(e) => handleInputChange(key, e.target.value)}
                placeholder={placeholder}
                className="border rounded px-2 py-1"
              />
            );
          case "select":
            return (
              <select
                key={key}
                value={filters[key] || ""}
                onChange={(e) => handleInputChange(key, e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="">ALL</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            );
          default:
            return null;
        }
      })}
      <button onClick={clearSelections} className="bg-gray-500 rounded px-2 py-1">
        Clear
      </button>
    </div>
  );
}
