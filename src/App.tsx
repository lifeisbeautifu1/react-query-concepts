import { Routes, Route } from "react-router-dom";
import { Posts, Post, AnotherPosts } from "./pages";

function App() {
  return (
    <Routes>
      <Route index path="/posts" element={<Posts />} />
      <Route index path="/" element={<AnotherPosts />} />
      <Route path="/posts/:id" element={<Post />} />
    </Routes>
  );
}

export default App;
