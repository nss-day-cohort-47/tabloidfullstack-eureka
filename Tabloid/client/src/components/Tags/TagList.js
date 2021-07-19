
import React, { useEffect, useState } from "react";
import Tag from "./Tags"
import { getAllTags, deleteTagById } from "../../modules/tagManager";
import { useHistory } from "react-router";
export const TagList = () => {
    const history = useHistory();
    const [tags, setTags] = useState([]);
    useEffect(() => {
        getAllTags().then(setTags);
    }, []);
    const handleCreateTag = (evt) => {
        evt.preventDefault()
        history.push("/Tags/Create")
    }
    const handleDeleteTag = (id) => {

        window.confirm(`Are you sure you want to delete this tag?`);
        deleteTagById(id).then(() => getAllTags().then(tag => setTags(tag)))
            .then(history.push("/Tags"))

    }
    return (<div className="container">
        <div className="column justify-content-center">

            {tags.map(t => {
                return < Tag key={t.id} Tag={t} handleDeleteTag={handleDeleteTag} />
            })
            }
            <button onClick={handleCreateTag}>Create Tag</button>
        </div>
    </div>)
}