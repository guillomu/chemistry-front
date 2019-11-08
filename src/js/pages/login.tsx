import * as React from "react";
import { Route, Redirect } from "react-router-dom";

//Typescript
interface Props {
  title: string;
}

//Typescript
interface State {
  username: string;
  password: string;
  grant_type: string;
  access_token: string;
  user: object;
  userIsDefined: boolean;
}

class Login extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      username: "pierre",
      password: "123*",
      grant_type: "password",
      access_token: "",
      user: {},
      userIsDefined: false
    };

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // window.localStorage.clear;
  }

  handleChangeUsername(username) {
    this.setState({ username: username });
  }

  handleChangePassword(password) {
    this.setState({ password: password });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { username, password, grant_type } = this.state;

    //Si username ou password est vide on arrete l'executin de la fonction
    if (!username || !password || !grant_type) {
      return;
    }
    console.log(this.state);

    fetch("http://localhost:9090/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:
        "username=" +
        username +
        "&password=" +
        password +
        "&grant_type=" +
        grant_type +
        "",
      mode: "cors",
      credentials: "include"
    }).then(data => {
      data.json().then(results => {
        if (results.access_token) {
          this.setState({
            access_token: results.access_token,
            userIsDefined: true
          });

          localStorage.setItem("access_token", this.state.access_token);
          console.log("access_token", localStorage.getItem("access_token"));
        }
      });
    });

    // fetch("https://jsonplaceholder.typicode.com/users", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // }).then(data => {
    //   data.json().then(results => {
    //     this.setState({
    //       user: results[0]
    //     });
    //     window.localStorage.setItem("User", results[0]);
    //   });
    // });
  }

  render() {
    if (this.state.userIsDefined) {
      return (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      );
    }

    return (
      <React.Fragment>
        <h1>{this.props.title}</h1>
        <form onSubmit={this.handleSubmit}>
          <label>email :</label>
          <input
            type="text"
            name="username"
            onChange={e => this.handleChangeUsername(e.target.value)}
          />
          <label>Password :</label>
          <input
            type="password"
            name="password"
            onChange={e => this.handleChangePassword(e.target.value)}
          />
          <button>Se connecter</button>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
