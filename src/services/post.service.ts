import axios from "axios";
import { Post } from "../types";

axios.defaults.baseURL = "http://localhost:3000";

export const getPosts = async (page: number = 1) => {
  const res = await axios.get<Array<Post>>("/posts", {
    params: {
      _page: page,
    },
  });
  const hasNext = page * 10 < parseInt(res.headers["x-total-count"] as string);
  return {
    nextPage: hasNext ? page + 1 : undefined,
    previousPage: page > 1 ? page - 1 : undefined,
    data: res.data,
  };
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
