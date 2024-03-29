import http from "./http";

export function getArticles(limit, offset = 1) {
  return http
    .get(`/articles?limit=${limit}&offset=${offset}`)
    .then((res) => res.data);
}

export function getSingleArticleBySlug(slug) {
  return http.get(`/articles/${slug}`).then((res) => res.data);
}

export function createArticles({ article }) {
  return http.post("/articles", { article }).then((res) => res.data);
}
export function editArticle({ article, slug }) {
  return http.put(`/articles/${slug}`, { article }).then((res) => res.data);
}
export function deleteArticle(slug) {
  return http.delete(`/articles/${slug}`).then((res) => res.data);
}
