"use client";

import { create } from "zustand";

type BookingState = {
  preselected: string | null;
  preselect: (treatmentKey: string) => void;
  clearPreselect: () => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  preselected: null,
  preselect: (treatmentKey) => set({ preselected: treatmentKey }),
  clearPreselect: () => set({ preselected: null }),
}));
