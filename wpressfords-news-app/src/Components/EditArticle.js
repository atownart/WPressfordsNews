import React, { Component } from "react";
import { connect } from 'react-redux';
import { editArticleAsync } from '../actions';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function mapStateToProps(state){
  return {
    articles: state.articles,
    editingArticle: state.editingArticle,
    editingArticleSuccess: state.editingArticleSuccess,
    editingArticleFailure: state.editingArticleFailure
  }
}

class EditArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {title: '', body:''};

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const articleId = this.props.match.params.id;
    if(this.props.articles && this.props.articles.length > 0){
      let stateArticle = this.props.articles.filter((article) => {
        return article.id === articleId;
      })[0];
    
    this.setState({
        id: articleId,
        title: stateArticle.title,
        body: stateArticle.body,
        author: stateArticle.author,
        likes: stateArticle.likes,
        publishedDateTime: stateArticle.publishedDateTime
      });
    }
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleBodyChange(event) {
    this.setState({body: event.target.value});
  }

  handleAuthorChange(event) {
    this.setState({author: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const newArticle = {
      id: this.state.id,
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      likes: this.state.likes,
      publishedDateTime: this.state.publishedDateTime
    }
    this.props.editArticleAsync(newArticle);
  }

  render() {
    return (
      <div className="Article-container">
      <ToastContainer autoClose={3000} hideProgressBar={true} />
      {this.props.editingArticle ? <Loader /> : null}
        <h2>Edit News Article</h2>
 
        <div className="Article-form">
          <div className="form-group">
            <label>Title:</label>
            <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
          </div>
          <div className="form-group">
            <label>Body:</label>
            <textarea type="text" value={this.state.body} onChange={this.handleBodyChange} />
          </div>
          <div className="form-group">
            <label>Author:</label>
            <input type="text" value={this.state.author} onChange={this.handleAuthorChange} />
          </div>
          <button className="submit-button" onClick={this.handleSubmit}>Edit Article</button>
          <div>
            {this.props.addingArticle ? <Loader /> : null}
          
          {this.renderSuccessMessage()}
          </div>
          </div>
      </div>
    );
  }

  renderSuccessMessage() {
    if(this.props.editingArticleSuccess){
      toast.success("Article updated successfully")
    }else if(this.props.editingArticleFailure){
      toast.error("Failed to update Article");
    }
    return null;
  }
}

export default connect(mapStateToProps, { editArticleAsync })(EditArticle);