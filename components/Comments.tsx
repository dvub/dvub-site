import useSWR from "swr";
import { CommentType } from "../types/comment";
import Loading from "./Loading";
import { Card } from "react-bootstrap";

export const Comments = (args: { fileName: string }) => {
  const fetcher = (args: string) => fetch(args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/comments/get`, fetcher);

  if (isLoading) return <Loading />;
  if (error) {
    console.log(error);
    return <p>
      There was an error... :/
      <em>~the website wizard</em>
    </p>

  }

  // todo: fix this
  const comments = data
    .filter((comment: CommentType) => comment.postName === args.fileName)
    .map((comment: CommentType) => {
      return (
        <Card className="border" key={`${args.fileName}-${comment.username.slice(0,5)}-${comment.content.slice(0,5)}`}>
          <Card.Body>{comment.content}</Card.Body>
          <Card.Footer
            style={{
              backgroundColor: "transparent",
              border: "transparent",
              fontSize: "15px",
            }}
          >
            ~@{comment.username}
          </Card.Footer>
        </Card>
      );
    });

  return <>
  <h2>
    What are people saying?
  </h2>
  {comments}
  </>;
};
