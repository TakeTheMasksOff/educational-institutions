import React, { useState, useEffect } from "react";
import { debounce } from "lodash";

function Filters({ onFilterChange }) {
  const [studentsCount, setStudentsCount] = useState("");
  const [foundingDate, setFoundingDate] = useState("");
  const [location, setLocation] = useState("");

  const debouncedFilterChange = debounce(onFilterChange, 500);

  useEffect(() => {
    debouncedFilterChange({ studentsCount, foundingDate, location });
    return () => {
      debouncedFilterChange.cancel();
    };
  }, [studentsCount, foundingDate, location]);

  const clearSelections = () => {
    setStudentsCount("");
    setFoundingDate("");
    setLocation("");
  };

  return (
    <div className="flex justify-center space-x-4">
      <input
        type="number"
        value={studentsCount}
        onChange={(e) => setStudentsCount(e.target.value)}
        placeholder="Students Count"
        className="border rounded px-2 py-1"
      />
      <input
        type="date"
        value={foundingDate}
        onChange={(e) => setFoundingDate(e.target.value)}
        placeholder="Founding Date"
        className="border rounded px-2 py-1"
      />
      <select value={location} onChange={(e) => setLocation(e.target.value)} className="border rounded px-2 py-1">
        <option value="">ALL</option>
        <option value="Cronastad">Cronastad</option>
        <option value="Fort Nels">Fort Nels</option>
        <option value="Kannapolis">Kannapolis</option>
        <option value="Roweside">Roweside</option>
      </select>
      <button onClick={clearSelections} className="bg-gray-500 rounded px-2 py-1">
        Clear
      </button>
    </div>
  );
}

export default Filters;
