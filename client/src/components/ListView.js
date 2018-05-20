import React, { Component } from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Contentform from './Contentform';


class Listview extends Component {
  constructor(props){
    super(props)
    this.state={
      initValue:null,
      newValue:null
    }
    
 
   
    this.categoriesFilter=this.categoriesFilter.bind(this)
    this.difficultyFilter=this.difficultyFilter.bind(this)
    this.typeFilter=this.typeFilter.bind(this)
    this.upvote = this.upvote.bind(this)
    
    
}

componentDidMount(){
  this.fetchData()
}
fetchData(){
  const me =this;
  fetch("/contents", {
  method : 'Get'
  })
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    me.setState({
    
      initValue :data,
      newValue:data
    },()=>{console.log(me.state.initValue)})
  })
  .catch(console.log)
}


categoriesFilter(event){
  const {newValue, initValue}=this.state;
  const filtering = initValue.filter(a=>{ return a.categories === event.target.value})
  console.log(event.target.value)

  event.target.value==="all categories"? this.setState({newValue : this.state.initValue}) :

  this.setState({newValue : filtering})
}
difficultyFilter(event){
  const {newValue, initValue}=this.state;
  const filtering = initValue.filter(a=>{ return a.difficulty === event.target.value})
  console.log(event.target.value)

  event.target.value==="all levels"? this.setState({newValue : this.state.initValue}) :

  this.setState({newValue : filtering})
}
typeFilter(event){
  const {newValue, initValue}=this.state;
  const filtering = initValue.filter(a=>{ return a.type === event.target.value})
  console.log(event.target.value)

  event.target.value==="all types"? this.setState({newValue : this.state.initValue}) :

  this.setState({newValue : filtering})
}
upvote(id,upvotes){
   
  fetch('/upvote', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      upvotes: upvotes,
     
    })
  })
    .catch((err) => {
      alert('Error occured while trying to upvote');
    });
    this.fetchData();
}
downvote(id,downvotes){
   
  fetch('/upvote', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      downvotes: downvotes,
     
    })
  })
    .catch((err) => {
      alert('Error occured while trying to Downvote');
    });
    this.fetchData();
}
 render() {
  const {newValue, initValue} = this.state;
   return (
     <div className="listview">
     <h2>Listview</h2>
     
     <Router>
    <div>
      <ul>
        
        <li>
          <Link to="/contentform"><input type="button" value="Add Content" /></Link>
        </li>
       
       
      </ul>

    

      <Route exact path="/contentform" component={Contentform} />
     

   
    </div>
  </Router>

 <hr />
 <form >
 <label>Categories: </label>  <br />
   <select name="categories"   onChange={this.categoriesFilter}>
   <option value="allcategories">All Categories</option>
     <option value="javascript">Javacript</option>
     <option value="css">CSS</option>
     <option value="mysql">MYSQL</option>
     <option value="others">Others</option>
    </select>
    <br />
               
    <label>Difficulty: </label>  <br />
    <select name="difficulty"   onChange={this.difficultyFilter}>
    <option value="alllevels">ALL Levels</option>
    <option value="Basic">Basic</option>
    <option value="Intermediate">Intermediate</option>
   <option value="High">High</option>
              
    </select>
               
   <br />
   <label>Type: </label>  <br />
   <select name="type"   onChange={this.typeFilter}>
   <option value="allltypes">ALL Types</option>
   <option value="Video">Video</option>
    <option value="Audio">Audio</option>
    </select>
   <br />
<input type="submit" value="Search" />
<hr />
   </form>
   
   {
      initValue &&
        <div className='list'>
              {
                newValue.map(a=>{
                  const index = newValue.indexOf(a);
               
                  return (
                  <div key={index} className='listItems'>
                  <table className="table table-hover" border="1">
                    <tr><td>                   
                       <Link to={`/detailsview/${index}`}>
                      <h3 className='link'><b>{a.title}</b></h3>
                      <p className='link'>{a.link}</p>
                    
                      <button value="Upvote" key={a.id} onClick={
                        ()=>{
                          this.upvote(a.id,a.upvote)
                        }
                       } >Upvote ({a.upvote})</button>
                      
                      <button value="downvote" key={a.id} onClick={
                        ()=>{
                          this.downvote(a.id,a.downvote)
                        }
                       } >Downvote ({a.downvote})</button>
                      
                     
                    </Link>
       
                 
                  </td>   
                  </tr>
                    </table>
                  </div>
                 )
                })
              }
        </div>
      }
    </div>
    

   );
 }
}
export default Listview;