import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { Card, CardBody } from "reactstrap";

const Category = ({category}) => {
    const history = useHistory();
    return (
        <Card>
            <CardBody>
                <div>
                
                    <p>{category.id}: {category.name}</p>
                   <button onClick={() => history.push(`/category/edit/${category.id}`)}> Edit</button>
                </div>
            </CardBody>
        </Card>
    );
};

export default Category;