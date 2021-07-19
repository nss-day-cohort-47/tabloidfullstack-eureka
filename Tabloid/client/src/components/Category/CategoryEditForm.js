import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { editCategory, getCategoryById } from "../../modules/categoryManager";
import { Form, FormGroup, Button, Container } from "reactstrap";

export const EditCategory = () => {
    const [category, setCategory] = useState({})
    const { id } = useParams();
    const history = useHistory();

    const handleInputChange = (event) => {
        const newCategory = { ...category }
        let selectedVal = event.target.value
        newCategory[event.target.id] = selectedVal
        setCategory(newCategory)
    }

    const handleSaveEvent = (event) => {
        event.preventDefault()
        if (category.name === "") {
            window.alert("Please fill in all fields")

        } else {
            editCategory(category)
                .then(() => history.push('/categories'))
        }
    }
    const handleCancelSave = (event) => {
        event.preventDefault()
        history.push('/categories')
    }
    useEffect(() => {
        getCategoryById(id).then(setCategory)
    }, [id])

    return (
        <Container className="justified-content-center">
            <Form>
                <FormGroup>
                    <label> Category Name: </label>
                    <input type="text"
                        id="name"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        defaultValue={category.name}
                    />
                </FormGroup>
                <Button className="article-btn"
                    onClick={handleSaveEvent}>
                    Save Category
                </Button>
                <Button className="article-btn"
                    onClick={handleCancelSave}>
                    Cancel
                </Button>
            </Form>
        </Container>
    )
}