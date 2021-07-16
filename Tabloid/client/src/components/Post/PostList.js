import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../modules/postManager";
import Post from "./Post"
import {useHistory} from "react-router-dom";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const history = useHistory();

    const getPosts = () => {
        getAllPosts().then(posts => setPosts(posts));
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            <button className="btn btn-primary" onClick={() => history.push("/posts/add")}>Create Post</button>
        <div>
            {posts.map((post) => (
                <Post post={post} key={post.id} />))}
        </div>
        </>
    );
}

export default PostList;
