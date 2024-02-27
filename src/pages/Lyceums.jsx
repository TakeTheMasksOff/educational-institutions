import React, { useCallback, useEffect, useState } from "react";
import useModalManagement from "../hooks/useModalManagement";
import Filters from "../components/Filters";
import Modal from "../components/Modal";
import { formatDate } from "../utils/formatters";

export default function Lyceum() {
  const [lyceums, setLyceums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("10");
  const [filters, setFilters] = useState({});

  const {
    isVisible: showDeleteModal,
    openModal: selectLyceumToDelete,
    closeModal: handleDeleteModalClose,
    selectedInst,
  } = useModalManagement();

  const handleDeleteLyceum = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "lyceums/" + selectedInst.id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete Lyceum");
      }

      fetchData();
      handleDeleteModalClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedInst]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const url = new URL(import.meta.env.VITE_API_URL + "lyceums");
      Object.entries({ ...filters, page, limit }).forEach(([key, value]) => url.searchParams.append(key, value));
      const response = await fetch(url);
      if (!response.ok) {
        setLyceums([]);
        throw new Error("Failed to fetch Lyceums");
      }
      const data = await response.json();
      setLyceums(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters, page, limit]);

  return (
    <div className="p-4">
      <Filters
        onFilterChange={handleFilterChange}
        filterConfig={[
          { type: "number", key: "studentsCount", placeholder: "Students Count" },
          { type: "select", key: "location", options: ["Cronastad", "Fort Nels", "Kannapolis", "Roweside"] },
          { type: "number", key: "popularity", placeholder: "Popularity" },
          { type: "select", key: "language", options: ["azeri", "russian", "turkish", "english"] },
        ]}
      />
      <div className="flex items-center justify-center space-x-4 mt-3 mb-7">
        <button className="bg-orange-500 p-1" onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <div>page: {page}</div>
        <button className="bg-blue-500 p-1" onClick={() => setPage(page + 1)}>
          Next
        </button>
        <select className="self-stretch border rounded" value={limit} onChange={(e) => setLimit(e.target.value)}>
          <option value="10">10</option>
          <option value="50">50</option>
        </select>
      </div>

      <div>
        {isLoading && lyceums.length == 0 && <p className="text-center">Loading...</p>}

        {lyceums.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Students</th>
                <th>Language</th>
                <th>Popularity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lyceums.map((school) => (
                <tr key={school.id}>
                  <td>{school.id}</td>
                  <td>{school.name}</td>
                  <td>{school.studentsCount}</td>
                  <td>{school.language}</td>
                  <td>{school.popularity}</td>
                  <td>
                    <button
                      className="bg-red-500 p-1"
                      disabled={isLoading}
                      onClick={() => selectLyceumToDelete(school.id, school.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !isLoading && <p className="text-center mt-10">No institution is found</p>
        )}
      </div>
      <Modal isOpen={showDeleteModal} onClose={handleDeleteModalClose}>
        <p className="mt-3">Are you sure you want to delete {selectedInst?.name} lyceum? </p>
        <p>Please confirm or close this window</p>
        <div className="text-center mt-3">
          <button onClick={handleDeleteLyceum}>Confirm</button>
        </div>
      </Modal>
    </div>
  );
}
