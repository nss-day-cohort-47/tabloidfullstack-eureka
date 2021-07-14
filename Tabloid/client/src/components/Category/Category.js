import React from "react";
import { Card, CardBody } from "reactstrap";

const Category = ({category}) => {
    return (
        <Card>
            <CardBody>
                <div>
                    <h3>Categories</h3>
                    <p>{category.name}</p>
                </div>
            </CardBody>
        </Card>
    );
};

export default Category;