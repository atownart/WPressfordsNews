import React, { Component } from "react";
import { connect } from 'react-redux';
import { addArticleAsync } from '../actions';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ArticleForm.css'

function mapStateToProps(state){
  return {
    addingArticle: state.addingArticle,
    addingArticleSuccess: state.addingArticleSuccess,
    addingArticleFailure: state.addingArticleFailure
  }
}
 const initialState = {title: '', body:'', author: ''};
class AddArticle extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      likes:[]
    }
    this.props.addArticleAsync(newArticle);
    this.setState(initialState);
  }

  render() {
    return (
      <div className="Article-container">
      <ToastContainer autoClose={3000} hideProgressBar={true} />
      {this.props.addingArticle ? <Loader /> : null}
        <h2>Add News Article</h2>
 
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
          <button className="submit-button" onClick={this.handleSubmit}>Add Article</button>
          <div>
            {this.renderAddMessage()}
          </div>
          </div>
      </div>
    );
  }

  renderAddMessage() {
    if(this.props.addingArticleSuccess){
      toast.success("Article added successfully")
    } else if(this.props.addingArticleFailure){
      toast.error("Failed to add Article")
    }
    return null;
  }
}

export default connect(mapStateToProps, { addArticleAsync })(AddArticle);