import { useState } from "react";

const instDefault = { id: null, name: "" };

const useModalManagement = (initialIsVisible = false, initialInst = instDefault) => {
  const [isVisible, setIsVisible] = useState(initialIsVisible);
  const [selectedInst, setSelectedInst] = useState(initialInst);

  const openModal = (id, name) => {
    setSelectedInst({ id: id, name: name });
    setIsVisible(true);
  };

  const closeModal = () => {
    setSelectedInst(instDefault);
    setIsVisible(false);
  };

  return { isVisible, openModal, closeModal, selectedInst };
};

export default useModalManagement;
