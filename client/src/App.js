import "./App.css";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Activity from "./components/Activity";
import Favourites from "./components/Favourites";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route path="/home/:id" component={Detail} />
        <Route exact path="/home" component={Home} />
        <Route path="/activity" component={Activity} />
        <Route path="/favorites" component={Favourites} />
      </div>
    </BrowserRouter>
  );
}

export default App;
