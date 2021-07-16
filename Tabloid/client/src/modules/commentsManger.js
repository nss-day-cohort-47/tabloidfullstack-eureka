import { getToken } from "./authManager";

const baseUrl = '/api/comment';

export const getCommentsByPostId = (id) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("Failed: no comments by post id were returned");
            }
        });
    });
}