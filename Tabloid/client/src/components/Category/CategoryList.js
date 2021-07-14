import React, {useEffect, useState} from "react";
import Category from "./Category";
import getAllCategories from "../../modules/categoryManager";

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
                {categories.map(cat =>
                    <Category category ={cat} key ={cat.id} />
                )}
            </div>
        </div>
        </>
    )
}

export default CategoryList