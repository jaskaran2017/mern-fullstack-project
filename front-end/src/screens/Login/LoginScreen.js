import React, { useState } from "react";
import "./LoginScreen.css";
import { Button, Col, Form, Row } from "react-bootstrap";
import Mainscreen from "../../components/Mainscreen";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Link } from "react-router-dom";

////////////////////////////

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  ////////////////////////
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    //now making POST request for login by calling our API
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      // after creating the config now its time to create api call.
      setLoading(true);
      //we will finally receive some data from the backend so we will write the const in destructured way
      const data = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );
      console.log(data);
      // after data has been fetched it will be stored inside the local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      // console.log(err);
      // alert(error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  /////////////////////////////////////////
  return (
    <Mainscreen title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Row className="py-3">
            <Col>New Customer ? <Link to="/register"> Register Here..</Link></Col>
          </Row>
        </Form>
      </div>
    </Mainscreen>
  );
};

export default LoginScreen;
