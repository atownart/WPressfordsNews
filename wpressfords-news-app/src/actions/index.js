import { GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILURE,
  GET_ARTICLES_IN_PROGRESS,
  ARTICLE_ADD_SUCCESS, 
  ARTICLE_ADD_IN_PROGRESS, 
  ARTICLE_ADD_FAILURE,
  ARTICLE_ADD_RESET,
  LOGIN_USER,
  ARTICLE_EDIT_SUCCESS,
  ARTICLE_EDIT_RESET, 
  ARTICLE_EDIT_IN_PROGRESS, 
  ARTICLE_EDIT_FAILURE,
  ARTICLE_REMOVE_IN_PROGRESS
 } from '../constants'
import { ARTICLES_API_ENDPOINT } from '../config';

function handleApiErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const getArticlesAsync =() => {
  return function (dispatch) {
    dispatch(getArticlesInProgress());
    fetch(ARTICLES_API_ENDPOINT)
    .then(handleApiErrors)
    .then( response => response.json())
    .then( data => {
      dispatch(getArticlesSuccess(data));  
    }).catch(() => {
      dispatch(getArticlesFailure());  
    });
  }
}

export const getArticlesInProgress = () => {
  return {
    type: GET_ARTICLES_IN_PROGRESS
  }
}

export const getArticlesFailure = () => {
  return {
    type: GET_ARTICLES_FAILURE
  }
}

export const getArticlesSuccess = (articles) => {
  return {
    type: GET_ARTICLES_SUCCESS,
    articles:  articles
  }
}

export const addArticleAsync = (article) => {
  return function (dispatch) {
    dispatch(addArticleInProgress());
    fetch(ARTICLES_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article)
    })
    .then(handleApiErrors)
    .then( data => {
      data.json().then(json => {
        dispatch(addArticleSuccess(json));
        dispatch(addArticleReset());
      })
    }).catch(() => {
      dispatch(addArticleFailure());
      dispatch(addArticleReset());
    });
  }
}

export const addArticleSuccess = (newArticle) => {
  return {
    type: ARTICLE_ADD_SUCCESS,
    newArticle: newArticle
  }
}

export const addArticleInProgress = () => {
  return {
    type: ARTICLE_ADD_IN_PROGRESS
  }
}

export const addArticleFailure = () => {
  return {
    type: ARTICLE_ADD_FAILURE
  }
}

export const addArticleReset = () => {
  return {
    type: ARTICLE_ADD_RESET
  }
}

export const loginUserIn = (user) => {
  return {
    type: LOGIN_USER,
    user: user
  }
}

export const editArticleAsync = (article) => {
  const newArticle ={
    title: article.title,
    body: article.body,
    likes: article.likes,
    author: article.author,
    publishedDateTime: article.publishedDateTime
  }
  return function (dispatch) {
    dispatch(editArticleInProgress());
    fetch(ARTICLES_API_ENDPOINT +'/' + article.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newArticle)
    })
    .then(handleApiErrors)
    .then( data => {
      data.json().then(json => {
        dispatch(editArticleSuccess(json));
        dispatch(editArticleReset());
      })
    }).catch(() => {
      dispatch(editArticleFailure());
      dispatch(editArticleReset()); 
    });
  }
}

export const editArticleReset = () => {
  return {
    type: ARTICLE_EDIT_RESET
  }
}

export const editArticleInProgress = () => {
  return {
    type: ARTICLE_EDIT_IN_PROGRESS
  }
}

export const editArticleFailure = () => {
  return {
    type: ARTICLE_EDIT_FAILURE
  }
}

export const editArticleSuccess = (article) => {
  return {
    type: ARTICLE_EDIT_SUCCESS,
    editedArticle: article
  }
}

export const removeArticleAsync = (article) => {
  return function (dispatch) {    
    dispatch(removeArticleInProgress(article));
    fetch(ARTICLES_API_ENDPOINT +'/' + article.id, {
      method: 'DELETE'
    });
  }
}

export const removeArticleInProgress = (article) => {
  return {
    type: ARTICLE_REMOVE_IN_PROGRESS,
    articleToRemoveId: article.id
  }
}