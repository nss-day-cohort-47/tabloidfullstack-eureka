import React from "react";
import { Card, CardBody } from "reactstrap";


const Tags = ({ Tag }) => {
    console.log(Tag, "the tag")
    return (
        <Card >
            <CardBody>
                <strong>{Tag.name}</strong>
            </CardBody>
        </Card>

    )
}

export default Tags