/**
 * Adds Admin or Employee
 * @module Add
 */


import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'

// import './progress.css'
/**
 * Class to add admin or employee
 */
class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: ' ',
      salary: { value: 0 },
      email: ' ',
      password: ' ',
      usertype: ' ',
      phone: { value: 0 },
      department: ' ',
      role: ' ',
      selectValue: ""

    }

    this.toggle = this.toggle.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
  }
  /**
   * @property {Function} handleSubmit runs on submit
   */
  
  handleSubmit = (e) => {
    const one = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      usertype: this.state.selectValue,
      phone: this.state.phone,
      department: this.state.department,
      role: this.state.role,
      salary: this.state.salary
    }
   
    const sam =localStorage.getItem('token');
    console.log(sam);
        


   const options={
     url:'https://employee-referals.herokuapp.com/api/users',
     method:'POST',
     headers:{
      'Content-Type': 'application/json',
       'Authorization':sam
     },
     data:{
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      // usertype: this.state.usertype,
      usertype: this.state.selectValue,
      phone: parseInt(this.state.phone),
      // department: this.state.department,
      role: this.state.role,
      salary: parseInt(this.state.salary)

     }
   }
   console.log(options)
 
    // console.log(one)
    axios(options)
      .then((response) => {
        if (response) {
          console.log(response)
          alert("added")
        }
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        
      })



  }
  render() {

    return (
      <div>
<h3>Add Admin/Employee</h3>
        <div className="base-container">

          <div className="content" >
            <div className="form">
              <div className="form-group">
                <label>Name       </label>
                <p><input type="text" id="name" name="name" placeholder="name" onChange={this.handleChange} /></p>
              </div>
              <div className="form-group">
                <label>Email-Id         </label>
                <p><input type="text" id="email" name="email" placeholder="email" onChange={this.handleChange} /></p>
              </div>
              <div className="form-group">
                <label>Password        </label>
                <p> <input type="Password" id="password" name="password" placeholder="password" onChange={this.handleChange} /></p>
              </div>

              <div className="form-group">
                <label >Phone      </label>
                <p> <input type="number" id="phone" name="phone" placeholder="phone" onChange={this.handleChange} /></p>
              </div>
              {/* <div className="form-group">
                <label>Department       </label>
                <p>  <input type="text" id="department" name="department" placeholder="department" onChange={this.handleChange} /></p>
              </div> */}
              <div className="form-group">
                <label>Role           </label>
                <p>  <input type="text" id="role" name="role" placeholder="role" onChange={this.handleChange} /></p>
              </div>
              <div className="form-group">
                <label>Usertype</label>
                <p>  
                <select id = "dropdown" onChange={this.handleDropdownChange}>
    <option value="admin">Admin</option>
    <option value="employee">Employee</option>
    
 </select> 
                  {/* <input type="text" id="usertype" name="usertype" placeholder="usertype" onChange={this.handleChange} /> */}
                  </p>
                  <br></br>
              </div>
              <div className="form-group">
                <label >Salary        </label>
                <p> <input type="number" id="salary" name="salary" placeholder="salary" onChange={this.handleChange} /></p>
              </div>
            </div>
          </div>
        </div>

        <Button  color="primary" onClick={this.handleSubmit}>Submit</Button>


      </div>



    )
  }
}

export default Add;
