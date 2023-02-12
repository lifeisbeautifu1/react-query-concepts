import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { Fragment } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { createPost, getPosts } from "../services/post.service";

const Posts = () => {
  // const [searchParams] = useSearchParams();

  // const page = searchParams.get("_page") || 1;

  // const navigate = useNavigate();

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["posts", page],
  //   queryFn: () => getPosts(page),
  //   keepPreviousData: true,
  // });

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
    staleTime: 10 * 1000,
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
      <div>
        <Link to="/">to front page</Link>
      </div>
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
