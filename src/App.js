import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Content from "./components/Content";
import TopicSideBar from "./components/TopicSideBar";

class App extends Component {
  state = {
    topics: [],
    user: null
  };
  render() {
    return (
      <div className="App">
        <Header />
        <NavBar />
        <Content />
        <TopicSideBar />
        <Footer />
      </div>
    );
  }
}

export default App;
