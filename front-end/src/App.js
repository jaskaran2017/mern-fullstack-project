import React from "react";
import "./App.css";
import "./bootstrap.min.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";

/////////
const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Route exact path="/" component={LandingPage} />
        <Route path="/mynotes" component={() => <MyNotes />} />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
