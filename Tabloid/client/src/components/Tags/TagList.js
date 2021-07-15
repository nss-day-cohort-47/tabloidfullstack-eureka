import React, { useEffect, useState } from "react";
import Tag from "./Tags"
import { getAllTags } from "../../modules/tagManager";
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
    return (<div>
        {tags.map(t => {
            return < Tag key={t.id} Tag={t} />
        })
        }
        <button onClick={handleCreateTag}>Create Tag</button>
    </div>)
}