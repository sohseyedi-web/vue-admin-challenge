import http from "./http";

export function getAllTags(){
    return http.get("/tags").then((res) => res.data)
}