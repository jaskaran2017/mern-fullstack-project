import React from "react";
import { Button, Container, Row } from "react-bootstrap";
// import {Link, history} from 'react-router-dom'
import "./LandingPage.css";

function LandingPage() {

// const history = useHistory()
//   useEffect(() => {
//   const userInfo = localStorage.getItem("userInfo")
//   if(userInfo){
//     history.push("/mynotes")
//   }
// }, [history])

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro">
         
                <h1>WELCOME TO MY NOTES</h1>
                <p>One safe place for all your notes.</p>
            
            </div>
            <div className="btn-container ">
            <div>

              <a href="/login">
                <Button size="lg" className="btn" variant="primary">
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button size="lg" className="btn" variant="outline-primary">
                  Signup
                </Button>
              </a>
            </div>
            </div>
     
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;
