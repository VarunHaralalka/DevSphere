import { create } from "zustand";
import axios from "axios";

export const userPostsStore = create((set) => ({
  userPosts: [],
  setUserPosts: (userPosts) => set({ userPosts }),
}));

export const allPostsStore = create((set, get) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  getPosts: async () => {
    const response = await axios.get("http://localhost:5000/api/posts");
    set({ posts: response.data });
  },
  addPost: async (post) => set({ posts: [post, ...get().posts] }),
}));
