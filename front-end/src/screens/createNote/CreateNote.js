import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Mainscreen from "../../components/Mainscreen";
import ReactMarkdown from "react-markdown";
import Loading from "../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../../actions/NotesActions";

function CreateNote({ history }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error, note } = noteCreate;
  console.log(note);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    dispatch(createNote(title, content, category));
    resetHandler();
    history.push("/mynotes");
  };
  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  return (
    <>
      <Mainscreen title=" Create Note">
        <Card>
          <Card.Header>Create a New Note</Card.Header>
          <Card.Body>
            <Form onSubmit={submitHandler}>
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  placeholder="Enter the title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Textarea1">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter the content"
                  rows={3}
                />
              </Form.Group>
              {content && (
                <Card>
                  <Card.Header>Note Preview</Card.Header>
                  <Card.Body>
                    <ReactMarkdown>{content}</ReactMarkdown>
                  </Card.Body>
                </Card>
              )}
              <Form.Group className="mb-3" controlId="Textarea2">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Enter the category"
                  rows={1}
                />
              </Form.Group>
              {loading && <Loading size={50} />}
              <Button type="submit" variant="success">
                Create
              </Button>{" "}
              <Button className="mx-2" onClick={resetHandler} variant="danger">
                Reset
              </Button>{" "}
            </Form>
          </Card.Body>
          <Card.Footer className="text-muted">
            Creating on - {new Date().toLocaleDateString()}
          </Card.Footer>
        </Card>
      </Mainscreen>
    </>
  );
}

export default CreateNote;
