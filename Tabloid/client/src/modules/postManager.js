import { getToken } from "./authManager";
const baseUrl = '/api/post';

export const getAllPosts = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};

<<<<<<< HEAD
export const getPostById = (id) => {
    return fetch(`${baseUrl}/${id}`)
        .then((res) => res.json())
};
=======
export const createPost = (post) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post),
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to save a new category. ");
            }
        });
    });
}
>>>>>>> fdf41040b4ce578c56a9c10a6e7e7932db9a4794
