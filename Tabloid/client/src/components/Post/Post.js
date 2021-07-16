import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
    console.log(post.userProfile.displayName)
    return (
        <Card >
            < CardBody >
                <p>
                    <strong>{post.title}</strong>
                </p>
                <p>Posted by :{post.userProfile.displayName}</p>
                <p>{post.content}</p>
                <p>Category: {post.category.name}</p>
                <button>
                    <Link to={`/posts/details/${post.id}`}>view details</Link>
                </button>
            </CardBody >
        </Card >
    );
};

export default Post;