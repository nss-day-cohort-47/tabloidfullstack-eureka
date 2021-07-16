import React from "react";
import { Card, CardBody } from "react-strap";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getPostById } from "../../modules/postManager";
import { Link } from "react-router-dom";
import { Button } from "reactstrap"

const PostDetails = () => {
    const [postDetails, setPostDetails] = useState([]);
    const { id } = useParams;

    const getPostDetails = () => {
        getPostById(id)
            .then(setPostDetails)
    }

    useEffect(() => {
        getPostDetails();
    }, []);

    return (
        <Card >
            < CardBody >
                <p>
                    <strong>{post.title}</strong>
                </p>
                <p>Posted by :{post.userProfile.displayName}</p>
                <p>{post.content}</p>
                <p>Category: {post.category.name}</p>
            </CardBody >
        </Card >
    )
}