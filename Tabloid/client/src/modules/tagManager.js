import { getToken } from "./authManager";


const _apiUrl = "/api/tags";


export const getAllTags = () => {
    return getToken().then((token) => {
        return fetch(_apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An Uknown Error Occured While Trying To Get Tags")
            }
        });
    });
};

export const addTag = (tag) => {
    return getToken().then((token) => {
        return fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
        }).then(resp => {
            if (resp.ok) {
                return resp.json();

            }
            else if (resp.status === 401) {
                throw new Error("Unauthorized");
            }
            else {
                throw new Error("An Uknown Error Occured While Trying To Get Tags")
            }
        });
    });
};