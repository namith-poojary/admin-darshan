import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router'

import { Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import {  AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import './header.css'
import axios from 'axios' 

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal:false,
    name:' ',
    salary:{value: 0},
    email:' ',
    password:' ',
    // uid:' ',
    usertype:' ',
    phone:{value: 0},
    department:' ',
    role:' '

  }

    this.toggle = this.toggle.bind(this);
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
  logoutHandler =(e) => {
    localStorage.clear();
    this.props.history.push('/login')
}
  handleSubmit = (e) => {
    const one = {
      name:this.state.name,
      email:this.state.email,
      password:this.state.password,
      // uid:this.state.uid,
      usertype:this.state.usertype,
      phone:this.state.phone,
      department:this.state.department,
      role:this.state.role,
      salary:this.state.salary
     }
     console.log(one)
    axios.post('https://employee-referals.herokuapp.com/api/users', one)
      .then((response) => {
          if(response){
            console.log(response)
       }
     })
     .catch((error) => {
    console.log(error);
    })
 
    
 
  }
 
  render() {
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
           <NavItem className="px-3">
            <NavLink to="/Add" className="nav-link" >ADD</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/resume" className="nav-link">RESUMES</Link>
          </NavItem>
          {/* <NavItem className="px-3">
            <Link to="/manage" className="nav-link">ManageJob</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/progress" className="nav-link">ManageReferral</Link>
          </NavItem>  */}
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
          
{/* <button className="cui-people icons font-2xl d-block mt-4"  onClick={this.toggle}>{this.props.buttonLabel}</button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Add User/Admin</ModalHeader>
              <ModalBody>
               <div className="base-container">
        
            <div className="content" >
        <div className="form">
                 <div className="form-group">
                  <label>Name       .</label>
<p><input type="text" id="name" name="name" placeholder="name"   onChange={this.handleChange}/></p>
                </div>
                  <div className="form-group">
                  <label>Email-Id         .</label>
                  <p><input type="text" id="email" name="email" placeholder="email"  onChange={this.handleChange}  /></p>
                </div>
                <div className="form-group">
                  <label>Password        .</label>
                  <p> <input type="Password" id="password" name="password" placeholder="password"   onChange={this.handleChange} /></p>
                </div>
                {/* <div className="form-group">
                  <label >UserId.</label>
                  <input type="text" id="uid" name="uid" placeholder="uid" onChange={this.handleChange} />
                </div> 
                <div className="form-group">
                  <label >Phone      .</label>
                  <p> <input type="number" id="phone" name="phone" placeholder="phone"  onChange={this.handleChange} /></p>
                </div>
                <div className="form-group">
                  <label>Department       .</label>
                  <p>  <input type="text" id="department" name="department" placeholder="department"  onChange={this.handleChange}/></p>
                </div>
                <div className="form-group">
                  <label>Role           .</label>
                  <p>  <input type="text" id="role" name="role" placeholder="role"  onChange={this.handleChange}/></p>
                </div>
                <div className="form-group">
                  <label>Usertype.</label>
                  <p>  <input type="text" id="usertype" name="usertype" placeholder="usertype"  onChange={this.handleChange}/></p>
                </div>
                <div className="form-group">
                  <label >Salary        .</label>
                  <p> <input type="number" id="salary" name="salary" placeholder="salary"  onChange={this.handleChange} /></p>
                </div>
              </div>
             </div>
            </div>
            </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
                <Button color="secondary"onClick={this.toggle} >Cancel</Button>
              </ModalFooter>
            </Modal>
            
           
 */}



          </NavItem>
       <NavItem className="d-md-down-none1">
       <a href="#" onClick={e=>this.logoutHandler(e)}>Logout</a>          </NavItem> 
          {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem> */}
          {/* <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default withRouter(DefaultHeader);
