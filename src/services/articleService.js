import http from "./http";

export function getArticles() {
  return http.get("/articles").then((res) => res.data);
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
