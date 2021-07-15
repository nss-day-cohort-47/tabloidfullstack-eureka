import React, { useState } from "react"
import { useHistory } from "react-router"
import { addTag } from "../../modules/tagManager"
// import { Form } from "reactstrap"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


const CreateTag = () => {
    const history = useHistory();
    const [tagName, setAddTag] = useState();
    const submitForm = (evt) => {
        evt.preventDefault()
        addTag({ name: tagName })
            .then(() => history.push("/Tags"))
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    }

    return (<div>
        <Form onSubmit={submitForm}>
            <FormGroup>
                <Label for="tagName">Tag</Label>
                <Input id="tagName" type="text" onChange={e => setAddTag(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Button>Save</Button>
            </FormGroup>
        </Form>
    </div>)



}

export default CreateTag