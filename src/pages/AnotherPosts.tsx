import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../services/post.service";

const AnotherPosts = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => getPosts(pageParam),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage;
    },
  });

  if (isLoading) return <div>loading...</div>;

  if (isError) return <div>error occured</div>;

  return (
    <ul>
      <div>
        <Link to="/posts">to posts page</Link>
      </div>
      <div>
        <Link to="/posts/filter">to filter page</Link>
      </div>
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

export default AnotherPosts;
