import { useState } from "react";

type UseModalReturnType = {
  modalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
};

export const useModal = (): UseModalReturnType => {
  const [modalOpen, setModalOpen] = useState(false);

  const onOpenModal = () => setModalOpen(true);
  const onCloseModal = () => setModalOpen(false);

  return {
    modalOpen,
    onOpenModal,
    onCloseModal,
  };
};
