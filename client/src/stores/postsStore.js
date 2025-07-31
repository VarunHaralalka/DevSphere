import { create } from "zustand"
import axios from "axios"

export const userPostsStore = create((set) => ({
  userPosts: [],
  setUserPosts: (userPosts) => set({ userPosts }),
}))

export const allPostsStore = create((set, get) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),

  getPosts: async () => {
    const response = await axios.get("http://localhost:5000/api/posts")
    set({ posts: response.data })
  },

  addPost: async (post) => set({ posts: [post, ...get().posts] }),

  updatePost: (updatedPost) => {
    const posts = get().posts
    const updatedPosts = posts.map((post) => (post.post_id === updatedPost.post_id ? updatedPost : post))
    set({ posts: updatedPosts })
  },

  deletePost: (postId) => {
    const posts = get().posts
    const filteredPosts = posts.filter((post) => post.post_id !== postId)
    set({ posts: filteredPosts })
  },
}))
