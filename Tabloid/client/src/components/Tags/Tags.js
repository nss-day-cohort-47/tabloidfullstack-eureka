import React from "react";
import { useHistory } from "react-router";
import { Button, Card, CardBody } from "reactstrap";
import { deleteTagById, getAllTags } from "../../modules/tagManager";


const Tags = ({ Tag, handleDeleteTag }) => {
    const history = useHistory();

    return (
        <Card >
            <CardBody>
                <div>
                    <strong>{Tag.name}</strong>
                </div>
                <Button className="buttonRemoveCategory" onClick={() => handleDeleteTag(Tag.id)}>Delete</Button>
            </CardBody>

        </Card>

    )
}

export default Tags