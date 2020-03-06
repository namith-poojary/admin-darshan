/**
 * login module
 * @module login
 * 
 * 
 */


import React from "react";
import loginImg from "./login.svg";
import axios from "axios"
import  "./App.scss";


/**
 * Class to create Login object
 * 
 */
 export default class Login extends React.Component {
  

  state ={
    /**
     * @property {String} email persons email
     * 
     */
    email:'',

    /**
     * @property {String} password persons password
     * 
     */
    password:'',
    
  }
  componentDidMount() {
    const email = localStorage.getItem('password') ;
    // const password =  localStorage.getItem('email') ;
    // this.setState({ email, password });
    console.log(email)
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  /**
   * @property {Function} handleSubmit runs when user clicks submit button
   */
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
  //   const { email, password } = this.state;
  // localStorage.setItem('password', password);
  // localStorage.setItem('email', email);
    const user = {   
      email: this.state.email,
      password: this.state.password
    };
    
    console.log(user)
    /**
     * @property {Function} post sends data for authorization purpose
     */
    axios.post('https://employee-referals.herokuapp.com/auth',user)
      .then(res => {
         localStorage.setItem('token',res.data.token);
         localStorage.setItem('type',res.data.usertype);
        console.log(res)
        const sam =localStorage.getItem('token');
        const sam1 =localStorage.getItem('type');
        console.log(sam)
        console.log(sam1)
         this.props.history.push("dashboard");
       
       
      }).catch(err => {
      alert("Invalid Email or Password")
      this.props.history.push("login");
       
      })
      
  }

    render() {
    return (
      <div className="base-container" ref={this.props.containerRef} >
        <div className="header">Login</div>
        <div className="content" >
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form" >
            <div className="form-group">
              <label htmlFor="email">email</label>
              <input type="text" id="email"  name="email" placeholder="email" onChange={this.handleChange} required/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="password" onChange={this.handleChange} required/>
            </div>
          </div>
        </div>
        <div className="footer" >
          <button type="button" className="btn" onClick={this.handleSubmit}>
            Login
          </button >
        </div>
        <div className="footer">
          {/* <a href="">forgot password</a> */}
        </div>
      </div>
    );
  }
}
