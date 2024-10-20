import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/navbar";
import News from "./components/news";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  pageSize = 5;
  apiKey=process.env.REACT_APP_NEWS_API_KEY
  state = {
    progress: 0,
  };
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <LoadingBar height={4} color="#f11946" progress={this.state.progress} />
          <Routes>
            <Route
              key={"sports"}
              path="/sports"
              element={
                <News
                  setProgress={this.setProgress} apiKey={this.apiKey} 
                  pageSize={this.pageSize}
                  country="us"
                  category="sports"
                />
              }
            >
              {" "}
            </Route>
            <Route
              path="/"
              element={
                <News
                  setProgress={this.setProgress} apiKey={this.apiKey} 
                  pageSize={this.pageSize}
                  country="us"
                  category="general"
                />
              }
            >
              {" "}
            </Route>
            <Route
              key={"business"}
              path="/business"
              element={
                <News
                  setProgress={this.setProgress} apiKey={this.apiKey} 
                  pageSize={this.pageSize}
                  country="us"
                  category="business"
                />
              }
            >
              {" "}
            </Route>
            <Route
              path="/science"
              element={
                <News
                  setProgress={this.setProgress} apiKey={this.apiKey} 
                  pageSize={this.pageSize}
                  country="us"
                  category="science"
                />
              }
            >
              {" "}
            </Route>
            <Route
              path="/technology"
              element={
                <News
                  setProgress={this.setProgress} apiKey={this.apiKey} 
                  pageSize={this.pageSize}
                  country="us"
                  category="technology"
                />
              }
            >
              {" "}
            </Route>
            <Route
              path="/entertainment"
              element={
                <News
                  setProgress={this.setProgress} apiKey={this.apiKey} 
                  pageSize={this.pageSize}
                  country="us"
                  category="entertainment"
                />
              }
            >
              {" "}
            </Route>
            <Route
              path="/health"
              element={
                <News
                  setProgress={this.setProgress} apiKey={this.apiKey} 
                  pageSize={this.pageSize}
                  country="us"
                  category="health"
                />
              }
            >
              {" "}
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
