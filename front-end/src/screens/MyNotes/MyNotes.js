import React, { useEffect } from "react";
import Mainscreen from "../../components/Mainscreen";
import { Link } from "react-router-dom";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listNotes } from "../../actions/NotesActions";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import ReactMarkdown from "react-markdown";

//////////////////////
function MyNotes({ history }) {
  // const [notes, setNotes] = useState([]); used for making front end

  // now we will fetch the data with the help of redux here using useDispatch and useSelector hooks
  // const history = useHistory();
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;
  // console.log(notes);
  //for pushing the user to home page on logout
  const userLogin = useSelector((state) => state.userLogin);
  //from userlogin we extract user info
  const { userInfo } = userLogin; // we will use this userinfo inside useEffect that if nothing inside the userInfo then push the user to home page

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const deletehandler = (id) => {
    if (window.confirm("Are you sure")) {
    }
  };
  // fetching notes from backend
  // const fetchNotes = async () => {
  //   const { data } = await axios.get("/api/notes");
  //   console.log(data);
  //   setNotes(data);
  // };

  useEffect(() => {
    // we cant call api directly inside the useEffect, so first we define a function and then call that function inside here.
    // fetchNotes();

    // now api will be called with the help of useDispach
    dispatch(listNotes());

    if (!userInfo) {
      alert("You are not logged in.");
      history.push("/");
    }
  }, [dispatch, userInfo, history, successCreate]);

  //////////////////
  return (
    <Mainscreen title={`Welcome back ${userInfo?.data.name}...`}>
      <Link to="/createnote">
        <Button variant="primary" size="lg">
          Create New Note
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {/* if notes coming from backend only then they will be mapped here and displayed */}
      {notes &&
        notes.reverse().map((note) => (
          //Accordian function is used from bootstrap to make a component hide and show on clicking
          <Accordion>
            <Card style={{ margin: "10px" }} key={note._id}>
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
                    variant="link"
                    // style={{ curser: "pointer" }}
                  >
                    {note.title}
                  </Accordion.Toggle>
                </span>

                <div>
                  <Button
                    href={`/note/${note._id}`}
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
                    <ReactMarkdown>{note.content}</ReactMarkdown>
                    <footer className="blockquote-footer">
                      Created on{" "}
                      <cite title=" Source Title">
                        {/* {note.createdAt.substring(0, 10)} */}
                      </cite>
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
