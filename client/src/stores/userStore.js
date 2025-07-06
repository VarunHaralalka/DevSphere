import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  setUser: (currentUser) => set({ user: currentUser }),
  logout: () => {
    set({ user: null });
  },
}));
