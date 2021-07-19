import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { addComment } from "../../modules/commentsManager";

export const CommentForm = () => {
    const [comment, setComment] = useState({
        subject: "",
        content: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const handleFieldChange = (event) => {
        const newComment = { ...comment }
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newComment[event.target.id] = selectedVal
        setComment(newComment)
    }

    const handleClickSaveComment = (event) => {
        event.preventDefault()

        addComment(comment)
            .then(() => setComment({
                subject: "",
                content: ""
            })).then((p) => {
                history.push("/comment/:id");
            })
    }

    return (
        <form className="commentForm">
            <h2 className="commentForm_title">Add Comment</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="subject">Subject: </label>
                    <input
                        type="text"
                        id="subject"
                        onChange={handleFieldChange}
                        required autoFocus
                        className="form-control"
                        placeholder="Comment Subject"
                        value={comment.subject}
                    />
                </div>
                <div>
                    <label htmlFor="content">Content: </label>
                    <input
                        type="text"
                        id="content"
                        onChange={handleFieldChange}
                        required autoFocus
                        className="form-control"
                        placeholder="Comment Content"
                        value={comment.content}
                    />
                </div>
            </fieldset>
            <button className="btn btn-primary"
                onClick={handleClickSaveComment}>
                Save Comment
            </button>
        </form>
    )
}