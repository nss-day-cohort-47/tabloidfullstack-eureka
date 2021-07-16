import { getToken } from "./authManager";

const baseUrl = `/api/comment?id=${id}`;

export const getCommentsByPostId = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/posts/${id}/comments`, {
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