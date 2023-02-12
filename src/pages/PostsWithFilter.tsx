import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { createPost, getPosts } from "../services/post.service";

const PostsWithFilter = () => {
  const [filter, setFilter] = useState("");

  const queryClient = useQueryClient();

  //   const initialData = queryClient.getQueryData(["posts"]) as any;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", filter],
    queryFn: ({ pageParam }) => getPosts(pageParam, filter),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage;
    },
    keepPreviousData: true,
    // initialData,
    // initialData: queryClient.getQueryData(["posts"]),
    initialData: queryClient.getQueryData(["posts"]) as any,
  });

  if (isLoading) return <div>loading...</div>;

  if (isError) return <div>error occured</div>;

  return (
    <ul>
      <div>
        <Link to="/">to front page</Link>
      </div>
      <div>
        <Link to="/posts">to posts page</Link>
      </div>
      <div>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <>
        {data.pages.map((group, i) => (
          <Fragment key={i}>
            {group.data.map((post) => (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
                <p>{post.body}</p>
              </li>
            ))}
          </Fragment>
        ))}
      </>
      <div>
        <button
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => {
            fetchNextPage();
          }}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
    </ul>
  );
};

export default PostsWithFilter;
