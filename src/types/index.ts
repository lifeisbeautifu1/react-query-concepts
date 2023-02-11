export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type User = {
  id: number;
  name: string;
  company: string;
};

export type Comment = {
  id: number;
  postId: number;
  userId: number;
  body: string;
};
