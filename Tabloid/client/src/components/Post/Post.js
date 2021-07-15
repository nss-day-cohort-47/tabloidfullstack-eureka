import React from "react";
import { Card, CardBody } from "reactstrap";

const Post = ({ post }) => {
    console.log(post.userProfile.displayName)
    return (
        <Card >
            < CardBody >
                <p>
                    <strong>{post.title}</strong>
                </p>
                <p> Posted by:{post.userProfile.displayName}</p>
                <p>{post.content}</p>
                <p>{post.category.name}</p>
            </CardBody >
        </Card >
    );
};

export default Post;