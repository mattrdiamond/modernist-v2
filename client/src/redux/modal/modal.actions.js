import ModalActionTypes from "./modal.types";

export const openModal = (currentModal, modalProps) => ({
  type: ModalActionTypes.MODAL_OPEN,
  payload: { currentModal, modalProps },
});

export const closeModal = () => ({
  type: ModalActionTypes.MODAL_CLOSE,
});
