import React from "react";
import { useHistory } from "react-router";
import { Card, CardBody } from "reactstrap";

const Comment = ({ comment }) => {
    const history = useHistory()
    return (
        <Card>
            <CardBody>
                <div>
                    <h3>{comment.subject}</h3>
                    <p>{comment.content}</p>
                    <p>{comment.createDateTime}</p>
                </div>
            </CardBody>
        </Card>
    );
};

export default Comment;