import React from "react";
import { Card, CardBody } from "reactstrap";

const Post = ({ post }) => {
    return (
        <Card >
            < CardBody >
                <p>
                    <strong>{post.title}</strong>
                </p>
                <p className="text-left px-2">Posted by: {post.userProfile}</p>
                <p>{post.content}</p>
            </CardBody >
        </Card >
    );
};

export default Post;