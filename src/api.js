import axios from "axios";

const BASE_URL = "https://david-nc-knews.herokuapp.com/api/";

export const getArticles = async (topic, query, p) => {
  const URL = topic
    ? `${BASE_URL}topics/${topic}/articles`
    : `${BASE_URL}articles`;
  const page = p ? `p=${p}` : "";
  let queryArray = query || p ? [query, page] : [];
  const queryStr =
    queryArray.length === 0
      ? ""
      : queryArray.reduce((acc, query) => {
          if (query) {
            return (acc += `${query}&`);
          }
          return acc;
        }, "");

  const { data } = await axios.get(URL + "?" + queryStr);
  return data.articles;
};
export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}topics`);
  return data.topics;
};

export const getArticle = async (article_id) => {
  const { data } = await axios.get(`${BASE_URL}articles/${article_id}`);

  return data.article;
};

export const updateArticleVote = async (article_id, voteType) => {
  const voteObj = {
    inc_votes: voteType
  };
  const { data } = await axios.patch(
    `${BASE_URL}articles/${article_id}`,
    voteObj
  );

  return data.article;
};
export const updateCommentVote = async (article_id, voteType, comment_id) => {
  const voteObj = { inc_votes: voteType };
  const { data } = await axios.patch(
    `${BASE_URL}articles/${article_id}/comments/${comment_id}`,
    voteObj
  );

  return data.comment;
};

export const checkUsername = async (username) => {
  const { data } = await axios.get(`${BASE_URL}users/${username}`);

  if (data.user) return data.user;
  return data.msg;
};

export const getComments = async (id, query) => {
  const urlQuery = `?${query}` || "";
  const { data } = await axios.get(
    `${BASE_URL}articles/${id}/comments${urlQuery}`
  );
  return data.comments;
};

export const postNewArticle = async (topic, title, body, user_id) => {
  const articleObj = { title: title, body: body, user_id: user_id };
  const { data } = await axios.post(
    `${BASE_URL}topics/${topic}/articles`,
    articleObj
  );
  return data.article;
};
export const postComment = async (article_id, body, user_id) => {
  const commentObj = { user_id: user_id, body: body };
  const { data } = await axios.post(
    `${BASE_URL}articles/${article_id}/comments`,
    commentObj
  );
};
export const deleteData = async (article_id, comment_id) => {
  if (comment_id) {
    const { data } = await axios.delete(
      `${BASE_URL}articles/${article_id}/comments/${comment_id}`
    );
    return data.article;
  } else {
    const { data } = await axios.delete(`${BASE_URL}articles/${article_id}`);

    return data.article;
  }
};

export const postTopic = async (slug, description) => {
  const topicObj = { slug: slug, description: description };
  const { data } = await axios.post(`${BASE_URL}topics`, topicObj);

  return data.topic;
};
export const postFirstArticle = async (slug, user) => {
  const articleObj = {
    title: `Welcome to ${slug}`,
    body: `So you've created your first topic eh? Well done you! Why not kick start the conversation by adding a new article.`,
    user_id: user
  };
  const { data } = await axios.post(
    `${BASE_URL}topics/${slug}/articles`,
    articleObj
  );
  return data.article;
};
