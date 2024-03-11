import http from "./http";

export function getArticles() {
    return http.get("/articles").then((res) => res.data);
  }

  