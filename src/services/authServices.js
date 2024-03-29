import http from "./http";

export function registerUser({ user }) {
  return http.post("/users", { user }).then((res) => res.data);
}
export function loginUser({ user }) {
  return http.post("/users/login", { user }).then((res) => res.data);
}
export function getCurrentUser() {
  return http.get("/user").then((res) => res.data);
}
