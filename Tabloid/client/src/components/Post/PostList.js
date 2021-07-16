import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../modules/postManager";
import Post from "./Post"

const PostList = () => {
    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        getAllPosts().then(posts => setPosts(posts));
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div>
            {posts.map((post) => {
                console.log(post)
                return (
                    <Post post={post} key={post.id} />)
            })}

        </div>
    );
}

export default PostList;
