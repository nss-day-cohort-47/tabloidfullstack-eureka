import { getToken } from "./authManager";

const baseUrl = '/api/category';

export const getAllCategories = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get categories");
            }
        });
    });
};

export const addCategory = (category) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category),
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
export const getCategoryById = (id) => {
    return getToken().then((token) => {
        return fetch (`${baseUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(resp => {
            if(resp.ok){
                return resp.json();
            } else {
                throw new Error("An unknown error occured while trying to get category by given id");
            }
        });
    });
}
export const editCategory = (category) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${category.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        }).then(resp => {
            if (resp.ok) {
                return;
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to save a new category. ");
            }
        })
    })
}

