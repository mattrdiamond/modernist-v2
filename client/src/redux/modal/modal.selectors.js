import { createSelector } from "reselect";

export const selectModal = (state) => state.modal;

export const selectModalType = createSelector(
  [selectModal],
  (modal) => modal.currentModal
);

export const selectModalProps = createSelector(
  [selectModal],
  (modal) => modal.modalProps
);
