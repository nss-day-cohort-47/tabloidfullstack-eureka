import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router";
import Comment from "./Comment";
import { getCommentsByPostId } from "../../modules/commentsManager";

export const CommentList = () => {
    const [comments, setComments] = useState([]);
    const history = useHistory();
    const { id } = useParams();

    const getComments = () => {
        getCommentsByPostId(id).then(setComments);
    };

    console.log(comments);

    useEffect(() => {
        getComments();
    }, []);

    return (

        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div>
                        <Link to="/addcomment">
                            <button>Add Comment</button>
                        </Link>
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