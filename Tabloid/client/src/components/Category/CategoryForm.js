
import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import { addCategory } from "../../modules/categoryManager";

export const CategoryForm = () => {
    const [category, setCategory] = useState({
        name:""
    });
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const handleFieldChange = (event) => {
        const newCategory = {...category}
        let selectedVal = event.target.value
        if(event.target.id.includes("Id"))
        {
            selectedVal=parseInt(selectedVal)
        }
        newCategory[event.target.id] = selectedVal
        setCategory(newCategory)
    }

    const handleClickSaveCategory = (event) => {
        event.preventDefault()

        addCategory(category)
        .then(() => setCategory ({
            name:""
        })).then((p) => {
            history.push("/categories");
        })
    }

    return (
        <form className = "categoryForm">
            <h2 className = "categoryForm_title">New Category</h2>
            <fieldset>
                <div className ="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                    type="text"
                    id="name"
                    onChange={handleFieldChange}
                    required autoFocus
                    className ="form-control"
                    placeholder = "Category Name"
                    value = {category.name}
                    />
                </div>
            </fieldset>
            <button className="btn btn-primary"
                onClick={handleClickSaveCategory}>
                    Save Article
                </button>
        </form>
    )
}