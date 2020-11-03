import React, {useContext, useEffect} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AppContext} from "../context/Context";
import {useHistory} from 'react-router-dom'
import {Button, Card, Form, Label} from "semantic-ui-react";
import {useInput} from 'react-sw-inputs-validation'
import {toaster} from "evergreen-ui";

const CreatePage = () => {
    const history = useHistory()
    const context = useContext(AppContext)
    const {error, request, clearError} = useHttp()

    const input = useInput({
        name: 'create',
        placeholder: 'Paste your link here',
        validation: ['isUrl']
    })

    useEffect(() => {
        if (error !== null) toaster.warning(error + '')
        clearError()
    }, [clearError, error])

    const generateHandler = async () => {
        try {
            const token = context.token
            const data = await request('/api/link/generate', 'POST', {from: input.value}, {
                Authorization: `Bearer ${token}`
            })
            history.push(`/detail/${data.link._id}`)
        } catch (e) {
            toaster.danger(e.message || 'Something went wrong. Try again later')
        }
    }

    return (
        <Card centered className='default-card-style'>
            <Card.Content>
                <Card.Header>Short Your Link</Card.Header>
            </Card.Content>
            <Card.Content>
                <Form>
                    <Form.Field error={!input.validation.isValid}>
                        <label htmlFor={input.id}>Link:</label>
                        <input type='text' {...input.bind}/>
                        {!input.validation.isValid && <Label basic pointing color='red'>{input.validation.msg}</Label>}
                    </Form.Field>
                    <Button
                        secondary
                        onClick={generateHandler}
                        disabled={!(input.status.isValid && input.status.isTouched)}>Generate</Button>
                </Form>
            </Card.Content>
        </Card>
    );
};

export default CreatePage;
