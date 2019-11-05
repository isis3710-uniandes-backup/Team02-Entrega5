import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import App from "./App";
import history from "./history";
import Login from "./components/login";
import BookList from "./components/bookList";
import SignIn from "./components/signin";
import Board from "./components/Board";
import Home from "./components/Home";
import DailyDashboard from "./components/DailyDashboard";

export const makeRoutes = () => {
  return (    
      <Router history={history}>
        <Switch>
          <>
            <Route path="/" render={props => <App {...props} />} />
            <Route path="/home" render ={props => <Home {...props} />} />
            <Route path="/board" render ={props => <Board {...props} />} />
            <Route path="/login" render={props => <Login {...props} />} />
            <Route path="/getBooks" render={props => <BookList {...props} />} />
            <Route path="/signin" render={props => <SignIn {...props} />} />
            <Route path="/daily" render={props=> <DailyDashboard {...props}/>}/>
          </>
        </Switch>
      </Router>    
  );
};