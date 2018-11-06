import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import './App.css';

/* Menu Items */
import News from "./Components/News";
import About from "./Components/About";
import Contact from "./Components/Contact";
import AddArticle from "./Components/AddArticle";
import EditArticle from "./Components/EditArticle";
import UserLogin from "./Components/UserLogin";
import ArticleCharts from "./Components/ArticleCharts";
import { connect } from 'react-redux';
import { getArticlesAsync } from './actions';


import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
library.add(faThumbsUp);

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

class App extends Component {
  
  componentDidMount(){
    this.props.getArticlesAsync();
  }

  render() {
    const isPublisher = this.props.currentUser && this.props.currentUser.isPublisher;
    return (
      <UserLogin>
        <HashRouter>
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Welcome to W. Pressfords News</h1>
              <div className="App-menu">
                <ul>
                  <li><NavLink to="/">News</NavLink></li>
                  <li><NavLink to="/about">About</NavLink></li>
                  <li><NavLink to="/contact">Contact</NavLink></li>
                  {isPublisher && <li><NavLink to="/addarticle">Add News Article</NavLink></li>}
                  {isPublisher && <li><NavLink to="/articlecharts">News Analytics</NavLink></li>}
                </ul>
              </div>
            </header>
            <div className="App-content">
              <Route exact path="/" component={News}/>
              <Route path="/about" component={About}/>
              <Route path="/contact" component={Contact}/>
              <Route path="/addarticle" component={AddArticle}/>
              <Route path="/articlecharts" component={ArticleCharts}/>
              <Route path="/editarticle/:id" component={EditArticle}/>
            </div>
          </div>
        </HashRouter>
      </UserLogin>
    );
  }
}

export default connect(mapStateToProps, { getArticlesAsync } )(App);
