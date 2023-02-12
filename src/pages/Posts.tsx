import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { Fragment } from "react";
import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { createPost, getPosts } from "../services/post.service";

const Posts = () => {
  const [page, setPage] = useState(1);

  // const [searchParams] = useSearchParams();

  // const page = searchParams.get("_page") || 1;

  // const navigate = useNavigate();

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["posts", page],
  //   queryFn: () => getPosts(page),
  //   keepPreviousData: true,
  // });

  const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => getPosts(pageParam),
    getNextPageParam: (lastPage, pages) => {
      return page;
    },
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
      {data?.pages?.map((group, i) => (
        <Fragment key={i}>
          {group.map((post) => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
              <p>{post.body}</p>
            </li>
          ))}
        </Fragment>
      ))}
      <div>
        <button
          onClick={() => {
            setPage((prev) => Math.min(prev + 1, 3));
            fetchNextPage({
              pageParam: Math.min(page + 1, 3),
            });
          }}
        >
          load more
        </button>
      </div>
      {/* <div>
        <button
          onClick={() => navigate(`/posts?_page=${Math.max(1, +page - 1)}`)}
        >
          prev
        </button>
        <span>current page {page}</span>
        <button
          onClick={() => navigate(`/posts?_page=${Math.min(3, +page + 1)}`)}
        >
          next
        </button>
      </div> */}
    </ul>
  );
};

export default Posts;
