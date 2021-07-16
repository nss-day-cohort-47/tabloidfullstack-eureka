import React from "react";
import { Card, CardBody } from "reactstrap";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getPostById } from "../../modules/postManager";
import { Link } from "react-router-dom";

export const PostDetail = () => {
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
                    <strong>{postDetails.title}</strong>
                </p>
                <p>{postDetails.content}</p>
            </CardBody >
        </Card >
    )
}

export default PostDetail