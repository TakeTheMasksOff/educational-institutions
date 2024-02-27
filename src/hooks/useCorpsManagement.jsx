import { useState, useCallback } from "react";
import useModalManagement from "./useModalManagement";

const useCorpsManagement = () => {
  const [corps, setCorps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isVisible, openModal, closeModal, selectedInst } = useModalManagement();

  const fetchCorps = useCallback(async (universityId, universityName) => {
    setIsLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "universities/" + universityId + "/corps");

      if (!response.ok) {
        if (response.status == 404) {
          setCorps([]);
          openModal(universityId, universityName);
        }
        throw new Error("Failed to fetch corps");
      }

      const data = await response.json();
      setCorps(data);
      openModal(universityId, universityName);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { corps, isLoading, fetchCorps, isVisible, closeModal, selectedInst };
};

export default useCorpsManagement;
