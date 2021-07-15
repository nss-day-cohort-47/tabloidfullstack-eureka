import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";


const Category = ({ category, handleDeleteCategory }) => {
    const history = useHistory()
  
    return (
        <Card>
            <CardBody>
                <div>

                    <p>{category.name}</p>
                    <button className="buttonRemoveCategory" type="button" onClick={() => handleDeleteCategory(category.id)}>Delete Category</button>
                </div>
            </CardBody>
        </Card>
    );
};

export default Category;