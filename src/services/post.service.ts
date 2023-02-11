import axios from "axios";
import { Post } from "../types";

axios.defaults.baseURL = "http://localhost:3000";

export const getPosts = async () => {
  const { data } = await axios.get<Array<Post>>("/posts");
  return data;
};

export const getPost = async (id: number | string) => {
  const { data } = await axios.get<Post>(`/posts/${id}`);
  return data;
};

export const createPost = async (post: Post) => {
  const { data } = await axios.post<Post>("/posts", post);
  return data;
};

export const getPostComments = async (id: number | string) => {
  const { data } = await axios.get<Array<Comment>>(`/comments`, {
    params: {
      postId: id,
    },
  });
  return data;
};
