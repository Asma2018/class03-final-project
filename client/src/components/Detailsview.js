
import React, { Component } from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import listviewform from './ListView';
import Listview from './ListView';
import Contentform from './Contentform';




export default class Detailsview extends Component {
    constructor(props){
      super(props)
      this.state={
        detailslist : null,
        categories : 'javacript',
        difficulty : 'basic',
        type : 'video',
        link : '',
        title : '',
        description: '',
      }
      this.categoriesFunc =this.categoriesFunc.bind(this)
      this.difficultyFunc =this.difficultyFunc.bind(this)
      this.linkFunc=this.linkFunc.bind(this)
      this.submitFunc=this.submitFunc.bind(this)
      this.titleFunc=this.titleFunc.bind(this)
      this.descriptionFunc=this.descriptionFunc.bind(this)
      this.typeFunc=this.typeFunc.bind(this)
    }
  
    categoriesFunc(event){
      this.setState({
        categories : event.target.value
      })
      console.log('categories: ',this.state.categories)
    }
    difficultyFunc(event){
      this.setState({
        difficulty : event.target.value
      })
      console.log('difficulty: ',this.state.difficulty)
    }
    typeFunc(event){
      this.setState({
        type : event.target.value
      })
      console.log('difficulty: ',this.state.type)
    }
    linkFunc(event){
      this.setState({
        link: event.target.value
      })
    }
    titleFunc(event){
      this.setState({
        title : event.target.value
      })
    }
    descriptionFunc(event){
      this.setState({
        description : event.target.value
      }, ()=>{console.log(this.state.description)})
    }
    submitFunc(event){
      console.log('state: ', this.state)
      fetch('/content', {
        method : "POST",
        body : JSON.stringify(this.state),
        headers: new Headers({
              'Content-Type': 'application/json'
            })
      })
      event.preventDefault();
    }
    componentDidMount(){
      this.fetchData()
    }
    fetchData(){
      const self =this;
      fetch("/detailsview", {
      method : 'Get'
      })
      .then(function(response){
        return response.json()
      })
      .then(function(data){
        self.setState({
          detailslist : data
        },()=>{console.log(self.state.detailslist)})
      })
      .catch(console.log)
    }
  
    render() {
      console.log('hello');
      return (
        <div>
          <div>

            
            <Contentform
                submitHandler={this.submitFunc}
                categoriesHandler={this.categoriesFunc}
                difficultyHandler={this.difficultyFunc}
                linkHandler={this.linkFunc}
                titleHandler={this.titleFunc}
                descriptionHandler={this.descriptionFunc}
                typeHandler={this.typeFunc}
            />
          </div>
          
        </div>
      );
    }
  }
