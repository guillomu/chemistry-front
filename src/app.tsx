import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Pages
import Login from "./js/pages/login";
import Home from "./js/pages/home";

//Components
import Header from "./js/components/header";
import Navbar from "./js/components/navbar";

class App extends React.Component {
  componentDidMount() {
    let accessToken = window.localStorage.getItem("access_token");
    console.log("access_token", accessToken);
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Navbar />
          <main className="main-wrapper">
            {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/login">
                <Login title="Login Page" />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

// L'export par défault de notre fichier app.tsx est la class App qui a été extends par React
// Mon app peut être désormais importé dans d'autres fichiers de mon projet
export default App;
