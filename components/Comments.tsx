import useSWR from "swr";
import { CommentType } from "../types/comment";
import Loading from "./Loading";


export const Comments = (args: { fileName: string }) => {
    const fetcher = (args: string) => fetch(args).then((res) => res.json());
    const { data, error, isLoading } = useSWR(`/api/comments/get`, fetcher);
  
    if (isLoading) return <Loading />;
    if (error) console.log(error);
  
    // todo: fix this
    const comments = data
      .filter((comment: CommentType) => comment.postName === args.fileName)
      .map((comment: CommentType) => {
        return (
          <div className='border'>
            <p>{comment.content}</p>
            <h2>-{comment.username}</h2>
            
          </div>
        );
      });
  
    return <>{comments}</>;
  };