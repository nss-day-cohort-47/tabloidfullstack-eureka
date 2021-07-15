import React from "react"
import { useHistory } from "react-router"
import { Form } from "reactstrap"


const CreateTag = () => {
    const history = useHistory()
    const handleSubmitTag = (evt) => {
        evt.preventDefault()
        history.push("/Tags")
    }

    return (<div>
        <form>
            <h2>Tag Name</h2>
            <input type="text"></input>
            <input type="Submit" onClick={handleSubmitTag}></input>
        </form>
    </div>)



}

export default CreateTag