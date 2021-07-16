const baseUrl = '/api/post';

export const getAllPosts = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};

export const getPostById = (id) => {
    return fetch(`${baseUrl}/details/${id}`)
        .then((res) = res.json())
};