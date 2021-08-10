import React, { useState, useEffect } from "react";
import Mainscreen from "../../components/Mainscreen";
import { Link } from "react-router-dom";
import { Accordion, Badge, Button, Card } from "react-bootstrap";

import axios from "axios";

//////////////////////
function MyNotes() {
  const [notes, setNotes] = useState([]);

  const deletehandler = (id) => {
    if (window.confirm("Are you sure")) {
    }
  };
  // fetching notes from backend
  const fetchNotes = async () => {
    const { data } = await axios.get("/api/notes");
    console.log(data);
    setNotes(data);
  };

  useEffect(() => {
    // we cant call api directly inside the useEffect, so first we define a function and then call that function inside here.
    fetchNotes();
  }, []);

  //////////////////
  return (
    <Mainscreen title="Welcome Jasjit...">
      <Link to="/createNote">
        <Button variant="primary" size="lg">
          Create New Note
        </Button>
      </Link>
      {notes.map((note) => (
        //Accordian function is used from bootstrap to make a component hide and show on clicking
        <Accordion key={note._id}>
          <Card style={{ margin: "10px" }}>
            <Card.Header
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                curser: "pointer",
              }}
            >
              <span
                style={{
                  flex: "1",
                  fontSize: "20px",
                  textDecoration: "none",
                  alignSelf: "right",
                  curser: "pointer",
                  // border: "2px solid",
                }}
              >
                {/* Accordian.Toggle is for telling the react that we will click on this  */}
                <Accordion.Toggle
                  as={Card.Text}
                  eventKey="0"
                  // style={{ curser: "pointer" }}
                >
                  {note.title}
                </Accordion.Toggle>
              </span>

              <div>
                <Button
                  href={`note/${note._id}`}
                  size="sm"
                  variant="primary"
                  style={{ textAlign: "center", width: "60px" }}
                >
                  <p
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "15px",
                    }}
                  >
                    Edit
                  </p>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="mx-2"
                  onClick={() => deletehandler(note._id)}
                  style={{ textAlign: "center", width: "60px" }}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            {/* Accordian.Collapes will be functional when it recieves the click event already specifies some where above which has the same event key */}
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <h4>
                  <Badge variant="success">Catagory - {note.catagory}</Badge>
                </h4>
                <blockquote className="blockquote mb-0">
                  <p>{note.content}</p>
                  <footer className="blockquote-footer">
                    Created on - date
                  </footer>
                </blockquote>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))}
    </Mainscreen>
  );
}

export default MyNotes;
