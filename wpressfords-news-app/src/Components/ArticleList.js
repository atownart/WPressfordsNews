import React, { Component } from "react";
import ArticleItem from "./ArticleItem";
import PropTypes from 'prop-types';

class ArticleList extends Component {

  static propTypes = {
    articles: PropTypes.array.isRequired,
    currentUser: PropTypes.object.isRequired
  };

  render() {  
      const orderedArticles = this.props.articles.sort((a,b) => {
        a = new Date(a.publishedDateTime);
        b = new Date(b.publishedDateTime);
        return a>b ? -1 : a<b ? 1 : 0;
      });
      const articleList = orderedArticles.map((article) => {
          return (
            <div key={article.id}>
              <ArticleItem key={article.id} article={article} currentUser={this.props.currentUser} />
            </div>
          );
      });
    return (
      <div>
        {articleList}
        {this.props.articles.length === 0 && <p>There is currently no news articles</p>}
      </div>
    );
  }
}

export default ArticleList;