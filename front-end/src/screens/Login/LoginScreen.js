import React, { useEffect, useState } from "react";
import "./LoginScreen.css";
import { Button, Col, Form, Row } from "react-bootstrap";
import Mainscreen from "../../components/Mainscreen";

import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/Actions";

////////////////////////////

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const dispatch = useDispatch();
  const history = useHistory()
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if(userInfo){
      history.push('/mynotes')
    }
  }, [history, userInfo])

  ////////////////////////
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
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
            <Col>
              New Customer ? <Link to="/register"> Register Here..</Link>
            </Col>
          </Row>
        </Form>
      </div>
    </Mainscreen>
  );
};

export default LoginScreen;
