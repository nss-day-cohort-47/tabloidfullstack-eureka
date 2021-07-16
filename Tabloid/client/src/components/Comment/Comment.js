import React from "react";
import { useHistory } from "react-router";
import { Card, CardBody } from "reactstrap";

const Comment = ({ comment }) => {
    const history = useHistory()
    if (comment.isDeleted === false) {
        return (
            <Card>
                <CardBody>
                    <div>
                        <h3>{comment.Subject}</h3>
                        <p>{comment.Content}</p>
                        <p>{comment.CreateDateTime}</p>
                    </div>
                </CardBody>
            </Card>
        );
    } else {
        return <> </>
    }
};

export default Comment;