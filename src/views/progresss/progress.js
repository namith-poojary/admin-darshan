/**
 * Progress module to view and update progress
 * @module progress
 */

import React, { Component } from 'react';
import axios from 'axios';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './progress.css'
/**
 * class progress
 */
class progress extends Component {
  constructor(props) {
    super(props)
    this.state = {
        isReferred: false,
        isAccepted: false,
        isInterviewed: false,
        isHired:false,
        notHired:false,
      
        immutablePosts: [ ],
        posts:[],
    
    };
    this.onCheckChange=this.onCheckChange.bind(this)
     this.handleSubmit = this.handleSubmit.bind(this);
  
  }

  componentDidMount() {

    
   
    this.getPosts()
    console.log(this.state.immutablePosts)
  }
  
/**
 * @property {Function} getPosts displays the progress details
 */
  getPosts() {  
    const sam =localStorage.getItem('token');
    
        
    const headers= {
     
      "Content-Type": "application/json",
       "Accept":"*/*",
       "Authorization":sam
   }
    axios.get('https://employee-referals.herokuapp.com/api/referee/show_referals',{headers})
  .then(res => {
  
    console.log(sam);
      this.setState({
        isReferred: res.data[0].status.isReferred,
        isAccepted: res.data[0].status.isAccepted,
        isInterviewed: res.data[0].status.isInterviewed,
        isHired:res.data[0].status.isHired,
        notHired:res.data[0].status.notHired,
          immutablePosts: res.data,
         
      }, () => {
          this.setState({
              posts: this.state.immutablePosts
          })
          console.log(this.state.posts)
      })
      
  })
  }

/**
 * Updates on click if conditions are applicable
 */
  onCheckChange(e,index) {
  //   console.log(index);
  //  console.log(e.target.value)
  //  console.log(e.target.id)
   
   const value=true
   const [x] =[e.target.id]
    if(e.target.id==='isAccepted')
    {
      if(!this.state.immutablePosts[index].status.isReferred)
      {
        alert("Please Refer Before going to this step")
      }
      else
      {
        this.setState(prevState => {
          const imPosts = [...prevState.immutablePosts];
          imPosts[index].status = { ...imPosts[index].status, [x]: value };
         
         return { imPosts };
       
       })
      }
    }
    else if(e.target.id==='isInterviewed')
    {
      if(!this.state.immutablePosts[index].status.isAccepted)
      {
        alert("Please Accept Before going to this step")
      }
      else
      {
        this.setState(prevState => {
          const imPosts = [...prevState.immutablePosts];
          imPosts[index].status = { ...imPosts[index].status, [x]: value };
         
         return { imPosts };
       
       })
      }
    }
    else if(e.target.id==='isHired' || e.target.id==='notHired')
    {
      
      if(!this.state.immutablePosts[index].status.isInterviewed)
      {
        alert("Please Interview Before going to this step")
      }
      else if(e.target.id==='isHired')
      {
        
        if(this.state.immutablePosts[index].status.notHired)
        {
          alert("Not Hired Already")
        }
        else
        {
          this.setState(prevState => {
            const imPosts = [...prevState.immutablePosts];
            imPosts[index].status = { ...imPosts[index].status, [x]: value };
           
           return { imPosts };
         
         }) 
        }
      }
      else if(e.target.id==='notHired')
      {
        
        if(this.state.immutablePosts[index].status.isHired)
        {
          alert("Hired Already")
        }
        else
        {
          this.setState(prevState => {
            const imPosts = [...prevState.immutablePosts];
            imPosts[index].status = { ...imPosts[index].status, [x]: value };
           
           return { imPosts };
         
         }) 
        }
      }
     
    }


    
     
  // console.log(this.state.immutablePosts)
   // console.log(imPosts);
   
  }

/**
 * @property {Function} handleSubmit updates the details on submit
 */
  handleSubmit = (e,post,index) => {
    e.preventDefault();
    // console.log(e)
    // //console.log(post)
    // console.log(index)
    
   
    const body=this.state.immutablePosts[index]
    //console.log(body)  
    const data={
        _id :this.state.immutablePosts[index]._id,
        status:this.state.immutablePosts[index].status
    }
    const samm =localStorage.getItem('token');
        
  //   const headers= {
     
  //     "Content-Type": "application/json",
  //      "Accept":"*/*",
  //      "Authorization":samm
  //  }
   const options={
    url:'https://employee-referals.herokuapp.com/api/referee/update/',
    method:'POST',
    headers:{
     'Content-Type': 'application/json',
      'Authorization':samm
    },
    data:{
      _id :this.state.immutablePosts[index]._id,
        status:this.state.immutablePosts[index].status
    }
  }
   
  
     axios(options)
          .then(res => console.log(res));
        alert("Updated for "+body.name)
        }
  render() {
    var posts=this.state.posts;
    
   return (
      
 posts.map((post,index)=>{

   
   return(
<Card className="ram" style={{ width:'100%'}}>
     <Card.Body>
       <div className="sam">
       <h1>{(post.name).slice(0,10)}</h1>
   <h2>{post.qualification}</h2>
    
   
   </div>

  <form onSubmit={(e)=>{this.handleSubmit(e,post,index)}}>
    <p>
      <label>
  <input  type="checkbox" name="isReferred" id="isReferred"
  checked={post.status.isReferred} onChange={(e)=>{this.onCheckChange(e,index)}}/><span>Referred</span></label>
  <label><input type="checkbox" name="isAccepted" id="isAccepted"

  checked={post.status.isAccepted} onChange={(e)=>{this.onCheckChange(e,index)}}/><span>Accepted</span></label>
  <label><input  type="checkbox" name="isInterviewed" id="isInterviewed"
  checked={post.status.isInterviewed} onChange={(e)=>{this.onCheckChange(e,index)}}/><span>Interviewing</span></label>
  <label><input  type="checkbox" name="isHired" id="isHired"
  checked={post.status.isHired} onChange={(e)=>{this.onCheckChange(e,index)}}/><span>Hired</span></label>
  <label><input  type="checkbox" name="notHired" id="notHired"
  checked={post.status.notHired} onChange={(e)=>{this.onCheckChange(e,index)}}/><span>Not Hired</span></label>
<br></br>
<p className="ok">
  <Button  variant="primary" size="lg" className='offset-md-4'  type="submit" className="btn btn-danger">
            Submit
          </Button>
          </p>
    </p>
  </form>
  
</Card.Body>
</Card>
   )
 })
 

   
     
   );
 }
}

export default progress;
