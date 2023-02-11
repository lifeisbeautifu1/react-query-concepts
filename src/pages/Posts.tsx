import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPost, getPosts } from "../services/post.service";

const Posts = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const queryClient = useQueryClient();

  const {
    mutate,
    isLoading: isAddPostLoading,
    isError: isAddPostError,
  } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (isLoading) return <div>loading...</div>;

  if (isError) return <div>error occured</div>;

  return (
    <ul>
      <button
        onClick={() =>
          mutate({
            id: 11,
            title: "post 11",
            body: "hello there 11",
            userId: 1,
          })
        }
      >
        add post
      </button>
      {isAddPostLoading && <div>adding post...</div>}
      {isAddPostError && <div>error occured while adding post</div>}
      {data?.map((post) => (
        <li key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
};

export default Posts;
