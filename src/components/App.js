import React from "react";
import "./App.css";

import StudentManagement from "./StudentManagemant";
import studentList from "./StudentList";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={StudentManagement} />
        <Route exact path="/:id" component={StudentManagement} />
        <Route path="/student/list" component={studentList} />
      </Switch>
    </div>
  );
}

export default App;
