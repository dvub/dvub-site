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

      const maxNameLength = 20;
      const maxCommentLength = 500;
      if (commentState.name.length <= 1 || commentState.name.length >= maxNameLength) {
        return;
      }

      if (commentState.comment.length <= 1 || commentState.comment.length >= maxCommentLength) {
        return;
      }

  
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
          setCommentState({
            name: '',
            comment: ''
          })
        })
        .catch((reason: any) => {
          console.log(reason);
        });
    };
  
    // this is the component itself, built with react-boostrap comps
    return (
      <Form onSubmit={onFormSubmit} className='border'>
        <p>
          {/* i think HTML escapes for special characters are stupid so you get this: */}
          <b>Note:</b> Comments are <b>actively moderated</b>{";"} Please be nice (and don{'\''}t spam thx)
        </p>
        <InputGroup className="mb-3">
          <InputGroup.Text>@</InputGroup.Text>
          <Form.Control
            placeholder="Username (1-20 characters)"
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
            placeholder="Comment (500 characters max)"
            required
            onChange={onFormUpdate}
            value={commentState.comment}
          />
        </InputGroup>
        <input type="checkbox" name="contact_me_by_fax_only" value="1" style={{display: 'none'}} tabIndex={-1} autoComplete="off"></input>
        <Button variant="primary" type="submit" style={{margin: '1rem'}}>
          Post Comment
        </Button>
        <p>
          Another note: Features such as replies and likes are (obviously) not implemented <i>yet.</i> 
          If you would like to reply to someone, you can try using @&lt;username&gt;, or quote some of their comment in yours.
        </p>
      </Form>

    );
  };
  