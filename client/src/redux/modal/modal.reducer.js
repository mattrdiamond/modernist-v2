import ModalActionTypes from "./modal.types.js";

const INITIAL_STATE = {
  currentModal: null,
  modalProps: null,
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ModalActionTypes.MODAL_OPEN:
      const { currentModal, modalProps } = action.payload;
      return {
        currentModal,
        modalProps,
      };
    case ModalActionTypes.MODAL_CLOSE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default modalReducer;
