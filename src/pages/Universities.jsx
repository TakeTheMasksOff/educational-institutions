import React, { useCallback, useEffect, useState } from "react";
import Filters from "../components/Filters";
import Modal from "../components/Modal";
import { formatDate } from "../utils/formatters";
import useModalManagement from "../hooks/useModalManagement";
import useCorpsManagement from "../hooks/useCorpsManagement";

export default function Universities() {
  const [universities, setUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("10");
  const [filters, setFilters] = useState({});

  const {
    isVisible: showDeleteModal,
    openModal: selectUniToDelete,
    closeModal: handleDeleteModalClose,
    selectedInst: selectedUni,
  } = useModalManagement();

  const {
    corps,
    isLoading: isCorpsLoading,
    fetchCorps,
    isVisible: isCorpsModalVisisble,
    closeModal: closeCorpsModal,
    selectedInst: corpsUni,
  } = useCorpsManagement();

  const handleDeleteUniversity = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "universities/" + selectedUni.id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete university");
      }

      fetchData();
      handleDeleteModalClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedUni]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const url = new URL(import.meta.env.VITE_API_URL + "universities");
      Object.entries({ ...filters, page, limit }).forEach(([key, value]) => url.searchParams.append(key, value));
      const response = await fetch(url);
      if (!response.ok) {
        setUniversities([]);
        throw new Error("Failed to fetch universities");
      }
      const data = await response.json();
      setUniversities(data);
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
      <Filters onFilterChange={handleFilterChange} />
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
        {isLoading && universities.length == 0 && <p className="text-center">Loading...</p>}

        {universities.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Students</th>
                <th>Location</th>
                <th>Founded</th>
                <th>Corps</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {universities.map((university) => (
                <tr key={university.id}>
                  <td>{university.id}</td>
                  <td>{university.name}</td>
                  <td>{university.studentsCount}</td>
                  <td>{university.location}</td>
                  <td>{formatDate(university.foundingDate)}</td>
                  <td>
                    <button
                      className="bg-lime-500 p-1"
                      disabled={isCorpsLoading}
                      onClick={() => fetchCorps(university.id, university.name)}
                    >
                      Show Corps
                    </button>
                  </td>
                  <td>
                    <button
                      className="bg-red-500 p-1"
                      disabled={isLoading}
                      onClick={() => selectUniToDelete(university.id, university.name)}
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
        <p className="mt-3">Are you sure you want to delete {selectedUni?.name} university? </p>
        <p>Please confirm or close this window</p>
        <div className="text-center mt-3">
          <button onClick={handleDeleteUniversity}>Confirm</button>
        </div>
      </Modal>

      <Modal isOpen={isCorpsModalVisisble} onClose={closeCorpsModal}>
        <h3 className="mt-3 mb-2">{corpsUni?.name} university corps </h3>
        {corps.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <p>Loading...</p>}
              {corps.map((corp) => (
                <tr key={corp.id}>
                  <td>{corp.name}</td>
                  <td>{corp.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center mt-5">This university has no corps</p>
        )}
      </Modal>
    </div>
  );
}
