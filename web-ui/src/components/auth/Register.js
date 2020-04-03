import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class Register extends Component {
  state = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    phoneNumber: '',
    email: '',
    userType: '',
    confirmationCode: '',
    verified: false
  };

  signUp = async () => {
    const {
      firstName,
      lastName,
      username,
      password,
      email,
      phoneNumber,
      userType
    } = this.state;

    const params = {
      username,
      password,
      attributes: {
        email: email,
        phone_number: phoneNumber,
        'custom:usertype': userType || 'user',
        'custom:lastName': lastName || '',
        'custom:firstName': firstName || ''
      }
    };

    try {
      await Auth.signUp(params);
      console.log('Successfully signed up');
    } catch (error) {
      console.log(`Error signing up: ${JSON.stringify(error)}`);
    }
  };

  confirmSignUp = () => {
    const { username, confirmationCode } = this.state;
    Auth.confirmSignUp(username, confirmationCode)
      .then(() => {
        console.log('Successfully confirmed signed up');
        // this.props.handleSignup();
      })
      .catch(err => console.log(`Error confirming sign up - ${err}`));
  };

  handleSubmit = e => {
    const { verified } = this.state;

    e.preventDefault();

    if (verified) {
      this.confirmSignUp();
      this.setState({
        confirmationCode: '',
        username: ''
      });
    } else {
      this.signUp();
      this.setState({
        password: '',
        email: '',
        phoneNumber: '',
        verified: true
      });
    }
    e.target.reset();
  };

  handleChange = ({ target }) => {
    this.setState({ ...this.state, [target.name]: target.value });
  };
  render() {
    const { verified } = this.state;

    if (verified) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Confirmation Code</label>
            <input
              name='confirmationCode'
              id='confirmationCode'
              type='text'
              onChange={this.handleChange}
            />
            <button>Confirm Sign up</button>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Firstname</label>
            <input
              name='firstName'
              id='firstName'
              type='text'
              onChange={this.handleChange}
            />
            <br />
            <label>Lastnafdfme</label>
            <input
              name='lastName'
              id='lastName'
              type='text'
              onChange={this.handleChange}
            />
            <br />
            <label>Username</label>
            <input
              name='username'
              id='username'
              type='text'
              onChange={this.handleChange}
            />
            <br />
            <label>Password</label>
            <input
              name='password'
              id='password'
              type='password'
              onChange={this.handleChange}
            />
            <br />
            <label>Phone Number</label>
            <input
              name='phoneNumber'
              id='phoneNumber'
              type='text'
              onChange={this.handleChange}
            />
            <br />
            <label>Email</label>
            <input
              name='email'
              id='email'
              type='text'
              onChange={this.handleChange}
            />
            <br />
            <label>User Type</label>
            <select name='userType' id='userType' onChange={this.handleChange}>
              <option value=''>--Select--</option>
              <option value='admin'>Admin</option>
              <option value='student'>Student</option>
              <option value='parent'>Parent</option>
              <option value='lead_coach'>Lead Coach</option>
              <option value='head_coach'>Head Coach</option>
            </select>
            <br />

            <button>Register</button>
          </form>
        </div>
      );
    }
  }
}

export default Register;
