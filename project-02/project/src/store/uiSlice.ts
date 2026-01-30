import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  toast: {
    message: string | null;
    type: "success" | "error" | "info" | null;
    duration?: number;
  };
  modal: {
    isOpen: boolean;
    type: string | null;
    data: any | null;
  };
}

const initialState: UiState = {
  toast: {
    message: null,
    type: null,
  },
  modal: {
    isOpen: false,
    type: null,
    data: null,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{
        message: string;
        type: "success" | "error" | "info";
        duration?: number;
      }>
    ) => {
      state.toast = action.payload;
    },
    clearToast: (state) => {
      state.toast = { message: null, type: null };
    },
    openModal: (
      state,
      action: PayloadAction<{ type: string; data?: any }>
    ) => {
      state.modal = { isOpen: true, ...action.payload };
    },
    closeModal: (state) => {
      state.modal = { isOpen: false, type: null, data: null };
    },
  },
});

export const { showToast, clearToast, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
