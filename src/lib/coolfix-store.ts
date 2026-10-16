"use client";

import { create } from "zustand";

type CoolfixBookingState = {
  preselected: string | null;
  preselect: (serviceKey: string) => void;
  clearPreselect: () => void;
};

/* Isolated store so CoolFix preselects never leak into the other demos */
export const useCoolfixBookingStore = create<CoolfixBookingState>((set) => ({
  preselected: null,
  preselect: (serviceKey) => set({ preselected: serviceKey }),
  clearPreselect: () => set({ preselected: null }),
}));
