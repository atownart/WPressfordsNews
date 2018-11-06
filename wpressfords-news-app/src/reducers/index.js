import { GET_ARTICLES_SUCCESS,
  GET_ARTICLES_IN_PROGRESS,
  GET_ARTICLES_FAILURE,
  ARTICLE_ADD_SUCCESS, 
  ARTICLE_ADD_IN_PROGRESS, 
  ARTICLE_ADD_FAILURE,
  ARTICLE_ADD_RESET,
  LOGIN_USER,
  ARTICLE_EDIT_SUCCESS, 
  ARTICLE_EDIT_IN_PROGRESS, 
  ARTICLE_EDIT_FAILURE,
  ARTICLE_EDIT_RESET,
  ARTICLE_REMOVE_IN_PROGRESS } from '../constants';

const defaultState = {
  articles: [],
  gettingArticles: false,
  gettingArticlesFailure: false,
  addingArticle: false,
  addingArticleSuccess: false,
  addingArticleFailure: false,
  editingArticleSuccess: false,
  editingArticleFailure: false,
  editingArticle: false
}

export const articles = (state = defaultState, action) => {
  const newState = Object.assign({}, state);
  switch(action.type){
    case GET_ARTICLES_IN_PROGRESS:
      newState.gettingArticles = true;
      newState.gettingArticlesFailure = false;
      break;
    case GET_ARTICLES_SUCCESS:
      newState.articles = action.articles;
      newState.gettingArticles = false;
      newState.gettingArticlesFailure = false;
      break;
    case GET_ARTICLES_FAILURE:
      newState.gettingArticles = false;
      newState.gettingArticlesFailure = true;
      break;
    case ARTICLE_ADD_IN_PROGRESS:
      newState.addingArticleSuccess = false;
      newState.addingArticleFailure = false;
      newState.addingArticle = true;
      break;
    case ARTICLE_ADD_SUCCESS:
      newState.addingArticleSuccess = true;
      newState.addingArticleFailure = false;
      newState.addingArticle = false;
      newState.articles.push(action.newArticle);
      break;
    case ARTICLE_ADD_FAILURE:
      newState.addingArticleSuccess = false;
      newState.addingArticleFailure = true;
      newState.addingArticle = false;
      break;
    case ARTICLE_ADD_RESET:
      newState.addingArticleSuccess = false;
      newState.addingArticleFailure = false;
      newState.addingArticle = false;
      break;
    case LOGIN_USER:
      newState.currentUser = action.user;
      break;
    case ARTICLE_EDIT_IN_PROGRESS:
      newState.editingArticleSuccess = false;
      newState.editingArticleFailure = false;
      newState.editingArticle = true;
      break;
    case ARTICLE_EDIT_RESET:
      console.log('article edit reset');
      newState.editingArticleSuccess = false;
      newState.editingArticleFailure = false;
      newState.editingArticle = false;
      break;
    case ARTICLE_EDIT_SUCCESS:
      const editedArticles = newState.articles.filter((art) => {
        return art.id !== action.editedArticle.id;
      });
      editedArticles.push(action.editedArticle);
      newState.articles = editedArticles;
      newState.editingArticleSuccess = true;
      newState.editingArticleFailure = false;
      newState.editingArticle = false;
      break;
    case ARTICLE_EDIT_FAILURE:
      newState.editingArticleSuccess = false;
      newState.editingArticleFailure = true;
      newState.editingArticle = false;
      break;
    case ARTICLE_REMOVE_IN_PROGRESS:
      const newArticles = newState.articles.filter((art) => {
        return art.id !== action.articleToRemoveId;
      });
      newState.articles = newArticles;
      break;
    default:
      break;
  }
  return newState;
}

export default articles;