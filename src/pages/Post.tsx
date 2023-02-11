import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getPost, getPostComments } from "../services/post.service";
import { getUser } from "../services/user.service";

const Post = () => {
  const { id } = useParams();

  const [loadComments, setLoadComments] = useState(false);

  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id!),
  });

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
    isSuccess,
  } = useQuery({
    queryKey: ["post", id, data?.userId],
    enabled: !!data?.userId,
    queryFn: () => getUser(data?.userId!),
  });

  const {
    data: comments,
    isLoading: commentsIsLoading,
    isError: commentsIsError,
  } = useQuery({
    queryKey: ["comments", id],
    enabled: loadComments,
    queryFn: () => getPostComments(data?.id!),
  });

  if (isLoading) return <div>loading...</div>;

  if (isError) return <div>error occured</div>;

  return (
    <div>
      {isFetching && <p>revalidating data...</p>}

      <h2>{data?.title}</h2>

      {isSuccess && (
        <h3>
          by {user.name} from {user.company}
        </h3>
      )}

      <p>{data?.body}</p>

      {!loadComments && (
        <button onClick={() => setLoadComments(true)}>Load comments</button>
      )}
      {comments && (
        <ul>
          {comments.map((comment) => (
            <li>{comment.body}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Post;
