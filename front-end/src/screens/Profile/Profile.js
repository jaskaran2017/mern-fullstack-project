import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateProfile } from "../../actions/Actions";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loading/Loading";
import Mainscreen from "../../components/Mainscreen";
import "./Profile.css";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [picMessage, setPicMessage] = useState("");

  const dispatch = useDispatch(); // this will fire the functions

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin; // userInfo will provide all the user data required

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate; // this will show the updated data info.

  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
    // dispatch(updateProfile());
  }, [dispatch, history, userInfo]);
  ///////////////////////
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

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email, pic, password }));
    if (updateProfile) {
      history.push("/mynotes");
    }
  };

  return (
    <Mainscreen title="Edit Profile">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Profile updated successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
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
                Update
              </Button>
            </Form>
          </Col>
          <Col className="picture">
            {" "}
            Profile Picture <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </Mainscreen>
  );
}

export default Profile;
