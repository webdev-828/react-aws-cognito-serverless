import React, {Component} from 'react';
import {Auth} from 'aws-amplify';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      password: '',
      signedIn: false
   };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signIn = this.signIn.bind(this);
    this.confirmSignIn = this.confirmSignIn.bind(this);
 }

  componentDidMount() {
    Auth.currentAuthenticatedUser().then(user => {
      console.log(user);
      window.location.assign("/");
   });
 }

  async signIn() {
    try {
      const {username, password} = this.state;
      const user = await Auth.signIn({
        username: username,
        password: password
     });
      console.log(user);
      window.location.assign("/");
   } catch (error) {
      console.log(error);
   }
 }

  confirmSignIn() {
    const {username} = this.state;
    Auth.confirmSignIn(username)
      .then(() => console.log('successfully confirmed signed in'))
      .catch(err => console.log(`Error confirming sign up - ${err}`));
 }

  handleSubmit(e) {
    e.preventDefault();

    this.signIn();
    this.confirmSignIn();
    this.setState({
      username: '',
      password: '',
      signedIn: true
   });
    e.target.reset();
 }

  handleChange(e) {
    if (e.target.id === 'username') {
      this.setState({
        username: e.target.value
     });
   } else if (e.target.id === 'password') {
      this.setState({
        password: e.target.value
     });
   }
 }

  render() {
    const {signedIn} = this.state;
    if (signedIn) {
      return (
        <div>
          <h1>You have signed in!</h1>
        </div>
      );
   } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Username</label>
            <input id='username' type='text' onChange={this.handleChange} />
            <label>Password</label>
            <input id='password' type='password' onChange={this.handleChange} />
            <button>Login</button>
          </form>
        </div>
      );
   }
 }
}

export default Login;
