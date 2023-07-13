import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

export const CommentForm = (args: { fileName: string }) => {
    // simple state to manage the 2 fields
    const [commentState, setCommentState] = useState({
      name: "",
      comment: "",
    });
  
    const onFormUpdate = (e: any) => {
      setCommentState({
        ...commentState,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    };
  
    // when the comment is posted
    const onFormSubmit = (event: any) => {
      event.preventDefault();
  
      // validate
  
      const res = fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: commentState.name,
          content: commentState.comment,
          fileName: args.fileName,
        }),
      })
        .then((res) => {
          console.log(res);
        })
        .catch((reason: any) => {
          console.log(reason);
        });
    };
  
    // this is the component itself, built with react-boostrap comps
    return (
      <Form onSubmit={onFormSubmit} className='border'>
        <p>
          Write your own... <br /> NOTE: Comments are actively moderated.
        </p>
        <InputGroup className="mb-3">
          <InputGroup.Text>@</InputGroup.Text>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            required
            id="name"
            name="name"
            onChange={onFormUpdate}
            value={commentState.name}
          />
        </InputGroup>
        <InputGroup>
          <Form.Control
            as="textarea"
            name="comment"
            id="comment"
            aria-label="Comment"
            placeholder="Comment"
            required
            onChange={onFormUpdate}
            value={commentState.comment}
          />
        </InputGroup>
        <br />
        <Button variant="primary" type="submit">
          Post Comment
        </Button>
      </Form>

    );
  };
  