import React from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
||||||| 530213b
=======
import { useHistory } from "react-router-dom";
>>>>>>> main
import { Card, CardBody } from "reactstrap";

<<<<<<< HEAD
const Category = ({category}) => {
    const history = useHistory();
||||||| 530213b
const Category = ({category}) => {
=======

const Category = ({ category, handleDeleteCategory }) => {
    const history = useHistory()
  
>>>>>>> main
    return (
        <Card>
            <CardBody>
                <div>
<<<<<<< HEAD
                
                    <p>{category.id}: {category.name}</p>
                   <button onClick={() => history.push(`/category/edit/${category.id}`)}> Edit</button>
||||||| 530213b
                
                    <p>{category.id}: {category.name}</p>
=======

                    <p>{category.name}</p>
                    <button className="buttonRemoveCategory" type="button" onClick={() => handleDeleteCategory(category.id)}>Delete Category</button>
>>>>>>> main
                </div>
            </CardBody>
        </Card>
    );
};

export default Category;