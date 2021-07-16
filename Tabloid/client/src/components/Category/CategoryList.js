import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Category from "./Category";
import { getAllCategories, deleteCategory } from "../../modules/categoryManager";


const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const history = useHistory();

    const getCategories = () => {
        getAllCategories().then(categories => setCategories(categories));
    };

    const handleDeleteCategory = (id) => {
        window.confirm(`Are you sure you want to delete this category?`);
        deleteCategory(id)
            .then(() => getCategories())
        history.push("/categories")
    }


    useEffect(() => {
        getCategories();
    }, []);


    return (

        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div>
                        <h4>Categories</h4>
                        {categories.map(cat =>
                            <Category category={cat} key={cat.id} handleDeleteCategory={handleDeleteCategory} />

                        )}
                    </div>
                </div>
            </div>
            <Link to="/addcategory" >
                <button>Add Category</button>
            </Link>
        </>
    )
}

export default CategoryList