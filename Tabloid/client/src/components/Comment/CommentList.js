import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router";
import Comment from "./Comment";
import { getCommentsByPostId } from "../../modules/commentsManger";

export const CommentList = () => {
    const [comments, setComments] = useState([]);
    const history = useHistory();
    const { id } = useParams();

    const getComments = () => {
        getCommentsByPostId(id).then(setComments);
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
                        {comments.map((c) => {
                            return <Comment comment={c} key={c.id} />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}