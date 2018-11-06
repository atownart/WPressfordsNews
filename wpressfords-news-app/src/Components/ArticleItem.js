import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editArticleAsync, removeArticleAsync } from '../actions';
import { Redirect } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import './ArticleItem.css';

class ArticleItem extends Component {
  
  static propTypes = {
    article: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleUnLikeClick = this.handleUnLikeClick.bind(this);
  }

  componentWillMount(){
    this.setState({ article: this.props.article });
  }

  handleLikeClick() {
    let article = Object.assign({}, this.props.article);
    article.likes[article.likes.length] = { 
      name: this.props.currentUser.userName, 
      likedDateTime: new Date().toISOString() 
    }
    this.setState({ article: article });
    this.props.editArticleAsync(article);
  }

  handleUnLikeClick() {
    let article = Object.assign({}, this.props.article);
    let likes = Object.assign([], article.likes);
    likes = article.likes.filter((like) => {
      return like.name !== this.props.currentUser.userName;
    });
    article.likes = likes;
    this.setState({ article: article });
    this.props.editArticleAsync(article);
  }

  handleEditClick() {
    this.setState({editArticle: true});
  }
  
  handleRemoveClick() {
    this.props.removeArticleAsync(this.state.article);
  }

  render() {
    const article = this.state.article;
    let alreadyLiked = false;
    if(this.state.article.likes){
      alreadyLiked = this.state.article.likes.some(like => {
        return like.name === this.props.currentUser.userName;
      });
    }
    let thumbsClass = alreadyLiked ? 'like-liked' : 'like-default';
    return (
      <div className="Article-item">
          <h3>{article.title}</h3>
          <p>{article.body}</p>
          <i>{article.author}</i><i className="Article-item-date">{article.publishedDateTime.substring(0,10)}</i>
          <div className="Article-like"><FontAwesomeIcon onClick={() => alreadyLiked ? this.handleUnLikeClick() : this.handleLikeClick()} className={thumbsClass} color={thumbsClass} icon={faThumbsUp} /><i>{article.likes.length}</i></div>
          {this.props.currentUser.isPublisher && this.renderPublisherButtons(article)}         
      </div>
    );
  }

  renderPublisherButtons(article){
    return (
      <div className="Article-item-publisher">
        {this.state.editArticle && <Redirect to={'/editarticle/' + article.id} />}
        <button onClick={this.handleEditClick}>Edit Post</button>
        <button onClick={this.handleRemoveClick}>Remove Post</button>
      </div>
    )
  }
}

export default connect(null, { editArticleAsync, removeArticleAsync })(ArticleItem);