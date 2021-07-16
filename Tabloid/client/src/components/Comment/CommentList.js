import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Comment from "./Comment";
import { getCommentsByPostId } from "../../modules/commentsManger";

export const CommentList = () => {
    const [comments, setComments] = useState([]);
    const history = useHistory();

    const getComments = () => {
        getCommentsByPostId().then(comments => setComments(comments));
    };

    useEffect(() => {
        getComments();
    }, []);

    return (

        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div>
                        <h4>Comments</h4>
                        {comments.map(c =>
                            <Comment comment={c} key={c.id} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}