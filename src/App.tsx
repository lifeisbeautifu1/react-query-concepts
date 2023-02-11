import { Routes, Route } from "react-router-dom";
import { Posts, Post } from "./pages";

function App() {
  return (
    <Routes>
      <Route index path="/posts" element={<Posts />} />
      <Route path="/posts/:id" element={<Post />} />
    </Routes>
  );
}

export default App;
