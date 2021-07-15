import React, { useEffect, useState } from "react";
import Tag from "./Tags"
import { getAllTags } from "../../modules/tagManager";
export const TagList = () => {
    const [tags, setTags] = useState([]);
    useEffect(() => {
        getAllTags().then(setTags);
    }, []);
    return (<div>
        {tags.map(t => {

            console.log("taco", t)
            return < Tag key={t.id} Tag={t} />
        })
        }
        <button>Create Tag</button>
    </div>)
}