import React from "react";
import { Card, CardBody } from "reactstrap";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getPostById } from "../../modules/postManager";
import { Link } from "react-router-dom";

export const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});

    const getPostDeltails = () => {
        { console.log(id) }
        getPostById(id)
            .then(setPost)
    }

    useEffect(() => {
        getPostDeltails();
    }, []);

    { console.log(post.ImageLocation) }



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
            </CardBody >
        </Card >
    )
}

export default PostDetail