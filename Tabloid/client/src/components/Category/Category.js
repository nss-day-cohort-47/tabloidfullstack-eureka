import React from "react";
import { Card, CardBody } from "reactstrap";

const Category = ({category}) => {
    return (
        <Card>
            <CardBody>
                <div>
                
                    <p>{category.id}: {category.name}</p>
                </div>
            </CardBody>
        </Card>
    );
};

export default Category;