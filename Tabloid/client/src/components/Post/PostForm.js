import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import { createPost } from "../../modules/postManager";
import { getAllCategories } from "../../modules/categoryManager";

export const PostForm = () => {
    const [post, setPost] = useState({
        title: "",
        content: "",
        imageLocation: "",
        categoryId: 0
    })
    const [category, setCategories] = useState([]);
    const history = useHistory();

    const handleInputChange = (event) => {
        const newPost = {...post}
        let selectedVal = event.target.value
        if(event.target.id.includes("Id"))
        {
            selectedVal = parseInt(selectedVal)
        }
        newPost[event.target.id] = selectedVal
        setPost(newPost)
    }
    const getCategories = () => {
        getAllCategories().then(categories => setCategories(categories));
    };
    useEffect(() =>{
        getCategories();
    }, [])

    const handleClickSavePost = (event) => {
        event.preventDefault()

       createPost(post)
       .then(() =>setPost ({
        title: "",
        content: "",
        imageLocation: "",
        categoryId: 0
       })).then((p) => {
           history.push("/posts");
       })
    }
    const handleCancelSave = (event) => {
        event.preventDefault()
        history.push('/posts')
    }

    return (
        <form className = "postForm">
            <h2 className = "postForm_title">New Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input 
                    type = "text"
                    id = "title"
                    onChange = {handleInputChange}
                    required autoFocus
                    className = "form-control"
                    placeholder = "Post Title"
                    value = {post.title}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Content: </label>
                    <input 
                    type = "text"
                    id = "content"
                    onChange = {handleInputChange}
                    required autoFocus
                    className = "form-control"
                    placeholder = "Post Content"
                    value = {post.content}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                {/* <label htmlFor="imageUrl">Header Image Url: </label> */}
                <label htmlfor="title">Header Image URL</label>
                <input type="text"
                 name="imageLocation"
                  id="imageLocation"
                  className = "form-control"
                   placeholder="Header Image Url"
                    value={post.imageLocation}
                    onChange={handleInputChange} />
                    {/* <input 
                    type = "text"
                    id = "imageUrl"
                    onChange = {handleInputChange}
                    required autoFocus
                    className = "form-control"
                    placeholder = "Header Image Url"
                    value = {post.imageLocation}
                    /> */}
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category">Category: </label>
                  <select 
                  value={post.categoryId}
                  name = "categoryId"
                  id = "categoryId"
                  onChange={handleInputChange}
                  className = "form-control"
                  >
                <option value ="0"> Select a Category</option>
                {category.map(cat => (
                    <option key ={cat.id} value={cat.id}>{cat.name}</option>
                ))}
                  </select>
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={handleClickSavePost}>Submit Post</button>
            <button className="btn btn-primary" onClick={handleCancelSave}>Cancel</button>
        </form>
    )
}