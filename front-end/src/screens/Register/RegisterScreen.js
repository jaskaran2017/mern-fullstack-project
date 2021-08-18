import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../actions/Actions";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loading/Loading";
import Mainscreen from "../../components/Mainscreen";

const RegisterScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const dispatch = useDispatch();
  // const history = useHistory();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  //   https://api.cloudinary.com/v1_1/jasjitcodee/image/upload
  // condition no 2 is to check if the user has selected any image for profile

  const postPicDetails = (pics) => {
    if (!pics) {
      //if no pic selected
      setPicMessage("Please select an image.");
    }
    setPicMessage(null);

    if (
      pics.type === "image/png" ||
      pics.type === "image/jpeg" ||
      pics.type === "image/jpg"
    ) {
      //specifing the image types
      const data = new FormData(); //form data will store all the pic data received
      data.append("file", pics); //Cloudinary is used to save all the images data
      data.append("upload_preset", "Notes_APP");
      data.append("cloud_name", "jasjitcodee");
      fetch("https://api.cloudinary.com/v1_1/jasjitcodee/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please select an image type png/jpeg/jpg");
    }
  };
  ////////////////////
  useEffect(() => {
    if (userInfo) {
      history.push("/mynotes");
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(email);
    // before the form get submitted, we wil check some condition
    if (password !== confirmPassword) {
      setMessage("Passwords Do not match");
    } else {
      //if the passswords are matched then we call the POST API
      dispatch(register(name, email, password, pic));
    }
  }

    ///////////////////
    return (
      <Mainscreen title="REGISTER">
      <div className="loginContainer">
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text className="text-muted">
              Password must be 8 or more characters long.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          {picMessage && ( // if any error occurs during image upload the this snippet will rendred
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.File
              onChange={(e) => postPicDetails(e.target.files[0])}
              id="custom-file"
              type="image/png"
              label="Upload Profile Picture"
              custom
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Row className="py-3">
            <Col>
              Already Have an Account ?{" "}
              <Link to="/login"> Login Here..</Link>
            </Col>
          </Row>
        </Form>
      </div>
    </Mainscreen>
  );
}

export default RegisterScreen;
