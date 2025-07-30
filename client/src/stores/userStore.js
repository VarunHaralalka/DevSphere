import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      setUser: (userData) => {
        set({
          user: userData,
          isAuthenticated: true,
        });
      },

      clearUser: () => {
        localStorage.removeItem("accessToken");
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateUser: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } });
        }
      },

      // Simplified auth initialization
      initializeAuth: async () => {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
          // Try to verify token with backend
          try {
            const response = await axios.get(
              "http://localhost:5000/api/auth/me",
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            if (response.status === 200) {
              const data = response.data;
              set({
                user: data.user,
                isAuthenticated: true,
              });
              return;
            }
          } catch (error) {
            console.log("Token verification failed");
          }
        }

        // Try refresh token
        try {
          const response = await axios.post(
            "http://localhost:5000/api/auth/refresh",
            {},
            {
              withCredentials: true,
            }
          );

          if (response.status === 200) {
            const data = response.data;
            localStorage.setItem("accessToken", data.accessToken);
            set({
              user: data.user,
              isAuthenticated: true,
            });
          }
        } catch (error) {
          console.log("No valid refresh token");
        }
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
