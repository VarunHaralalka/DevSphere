import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import { allPostsStore } from "../stores/postsStore";
import { useEffect } from "react";

function HomePage() {
  const { posts, getPosts } = allPostsStore();
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <div>
      <CreatePost />
      {posts.map((post) => (
        <Post key={post.post_id} post={post} />
      ))}
    </div>
  );
}

export default HomePage;
