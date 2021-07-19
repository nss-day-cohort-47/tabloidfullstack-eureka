import React from "react";
import { Card, CardBody } from "reactstrap";
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { getPostById, deletePost } from "../../modules/postManager";
import { Link } from "react-router-dom";

export const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const history = useHistory();

    const getPostDeltails = () => {
        { console.log(id) }
        getPostById(id)
            .then(setPost)
    }

    useEffect(() => {
        getPostDeltails();
    }, []);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            deletePost(post.id).then(() => {
                history.push(`/posts/`);
            });
        }
    };

    return (
        <Card >
            < CardBody >
                <p>
                    <strong>Title: {post.title}</strong>
                </p>
                <p><strong>Author :</strong>{post.userProfile?.displayName}</p>
                <p><b>Image:</b><img src={post.imageLocation} alt="display image" />
                </p>
                <p><b>Content:</b> {post.content}</p>

                <Link to={`comment/${id}`}>
                    <button>View Comments</button>
                </Link>

                <button onClick={handleDelete}>Delete</button>

            </CardBody >
        </Card >
    )
}

export default PostDetail