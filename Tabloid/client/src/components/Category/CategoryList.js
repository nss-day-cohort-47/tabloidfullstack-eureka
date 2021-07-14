import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Category from "./Category";
import {getAllCategories} from "../../modules/categoryManager";


const CategoryList = () =>{
    const [categories, setCategories]= useState([]);

    const getCategories = () => {
        getAllCategories().then(categories =>setCategories(categories));
    };

    useEffect(()=>{
        getCategories();
    }, []);


    return (
        
        <>
        <div className="container">
            <div className="row justify-content-center">
                <div>
                <h4>Categories</h4>
                {categories.map(cat =>
                    <Category category ={cat} key ={cat.id} />
                    
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