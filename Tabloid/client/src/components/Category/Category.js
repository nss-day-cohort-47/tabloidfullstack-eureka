import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";


const Category = ({ category, handleDeleteCategory }) => {
    const history = useHistory()
    console.log(category)
     if (category.isDeleted === false) {
    return (

          
        <Card>
            <CardBody>
                <div>

                    <p>{category.name}</p>
                   <button onClick={() => history.push(`/category/edit/${category.id}`)}> Edit</button>
                    <button className="buttonRemoveCategory" type="button" onClick={() => handleDeleteCategory(category.id)}>Delete Category</button>
                </div>
            </CardBody>
        </Card> 
   
    );
     }
     else {
         return <> </>
     }
};

export default Category;