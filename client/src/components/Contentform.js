import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// create new class by name contentform
class Contentform extends Component { 
  constructor(props) {  // using  a constructor and super method to pass props down
    super(props)
    this.state = {   //Set the state to an empty string
      categories: '',
      difficulty: '',
           link : '',
           title: '',
           type: '',
           description:'',
           msg: ''
             
    }
// Use the this keyword to handle the submit and logchange, and bind it to (this).
    this.handleSubmit = this.handleSubmit.bind(this)
    this.logChange=this.logChange.bind(this)
  
}
//Create a function that changes the value of the target input.
handleSubmit(event) {
    event.preventDefault()
    var data = {
        categories: this.state.categories,
        difficulty: this.state.difficulty,
        link: this.state.link,
        title: this.state.title,
        type: this.state.type,
        description:this.state.description
    }
    //post data to database
    console.log(data)
    fetch('/content', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
    }
        return response.json();
    }).then(function(data) {
        console.log(data)    
        if(data === "success"){
           this.setState({msg: "Thanks for sharing"});  
           
        }
    }).catch(function(err) {
        console.log(err)
    });
}

onChange(event) {
  console.log(event.target.value);
}

logChange(e) {//resetting the state of the input to new target input.
  this.setState({[e.target.name]: e.target.value});   
}
//render method, and return the page with the input fields
  render() {
    return (
    <div className="w3-container">
    <h2>Share Informatiom</h2>
    <form action="" onSubmit={this.handleSubmit} method="POST">
    <label>Categories: </label>  <br />
    <select name="categories" onChange={this.logChange} >
        <option value="javascript">Javascript</option>
        <option value="css">CSS</option>
        <option value="mysql">MYSQL</option>
        <option value="php">PHP</option>
        <option value="github">GITHUB</option>
        <option value="others">Others</option>
        </select><br />
    <label>Difficulty: </label>  <br />
    <select name="difficulty" onChange={this.logChange}>
        <option value="Basic">Basic</option>
        <option value="Intermediate">Intermediate</option>
        <option value="High">High</option>
    </select><br />
    <label>Link:</label><br />
    <input type="text" name="link" onChange={this.logChange}  placeholder="Enter URL" /><br />
    <label>Title: </label>  <br />
    <input type="text" name="title" onChange={this.logChange} placeholder="Enter a Title" /><br />
    <label>Type: </label>  <br />
    <select name="type" onChange={this.logChange}>
        <option value="Video">Video</option>
        <option value="Audio">Audio</option>
        <option value="Article">Article</option>
        <option value="Others">Others</option>
    </select><br />
    <label>Description: </label>  <br />
    <textarea name="description" onChange={this.logChange} rows="10" cols="40"  placeholder="Descriptions.."></textarea>
    <br />
    <input type="submit" value="Submit" />
    <Link to='/'> 
    <input type="submit" value='Cancel'/>
    </Link><hr />
    </form>
    </div>
      
    ); 
    
  }
}

export default Contentform;