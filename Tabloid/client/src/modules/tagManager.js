import { getToken } from "./authManager";


const _apiUrl = "/api/tags";

const _doesUserExist = (firebaseUserId) => {
    return getToken().then((token) =>
        fetch(`${_apiUrl}/${firebaseUserId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.ok));
};

const _saveUser = (userProfile) => {
    return getToken().then((token) =>
        fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userProfile)
        }).then(resp => resp.json()));
};





// export const login = (email, pw) => {
//     return firebase.auth().signInWithEmailAndPassword(email, pw)
//         .then((signInResponse) => _doesUserExist(signInResponse.user.uid))
//         .then((doesUserExist) => {
//             if (!doesUserExist) {

//                 // If we couldn't find the user in our app's database, we should logout of firebase
//                 logout();

//                 throw new Error("Something's wrong. The user exists in firebase, but not in the application database.");
//             }
//         }).catch(err => {
//             console.error(err);
//             throw err;
//         });
// };



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


