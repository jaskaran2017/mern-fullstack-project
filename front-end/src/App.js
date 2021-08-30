import React from "react";
import "./App.css";
import "./bootstrap.min.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginScreen from "./screens/Login/LoginScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import CreateNote from "./screens/createNote/CreateNote";
import ProfileScreen from "./screens/Profile/Profile";
/////////
const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/createnote" component={CreateNote} />
        <Route path="/mynotes" component={() => <MyNotes />} />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
