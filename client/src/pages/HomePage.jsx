import CreatePost from "../components/CreatePost";
import Post from "../components/Post";

function HomePage() {
  return (
    <div>
      <CreatePost />
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default HomePage;
