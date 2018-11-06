import React, { Component } from "react";
import ArticleList from "./ArticleList";
import Loader from "./Loader";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    articles: state.articles,
    gettingArticles: state.gettingArticles,
    gettingArticlesFailure: state.gettingArticlesFailure
  }
}

class News extends Component {
  
  static propTypes = {
    articles: PropTypes.array.isRequired
  };

  render() {
    return (
      <div>
        <h2>Latest News</h2>
          {this.props.gettingArticlesFailure ? <p>Unable to get articles</p> : null}
          {this.props.gettingArticles && !this.props.gettingArticlesFailure ? <Loader/> : 
            <ArticleList articles={this.props.articles} currentUser={this.props.currentUser}/> }
      </div>
    );
  }
}
export default connect(mapStateToProps)(News);