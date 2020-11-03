import React, {useContext, useEffect} from 'react';
import {useHttp} from "../../hooks/http.hook";
import {AppContext} from "../../context/Context";
import {useForm, useInput} from "react-sw-inputs-validation";
import {Button, Card, Form, Label} from "semantic-ui-react";
import {toaster} from "evergreen-ui";
import {useHistory} from "react-router";

function RegistrationPage() {
    const {error, request, clearError} = useHttp()
    const history = useHistory()
    const context = useContext(AppContext)
    const dispatch = context.dispatch

    useEffect(() => {
        if (error !== null) toaster.warning(error + '')
        clearError()
    }, [error, clearError, dispatch])

    const nameInput = useInput({
        name: 'name',
        placeholder: 'name',
        validation: [{type: 'required', msg: 'Name is required'}]
    })
    const emailInput = useInput({
        type: 'email',
        name: 'email',
        placeholder: 'email',
        validation: [
            {type: 'required', msg: 'Email is required'}, 'isEmail'
        ]
    })
    const passwordInput = useInput({
        type: 'password',
        name: 'password',
        placeholder: 'password',
        validation: [
            {type: 'required', msg: 'Password is required'},
            {type: 'minLength', min: 6, msg: 'The minimum length of password is 6'}
        ]
    })

    const form = useForm([nameInput, emailInput, passwordInput])

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form.fields})
            history.push('/login')
            toaster.success(data.message)
        } catch (e) {
            toaster.danger(e.message || 'Something went wrong. Try again later')
        }
    }

    return (
        <Card centered className='default-card-style'>
            <Card.Content>
                <Card.Header>Registration</Card.Header>
            </Card.Content>
            <Card.Content>
                <Form>
                    <Form.Field error={!nameInput.validation.isValid}>
                        <label htmlFor={nameInput.id}>Name:</label>
                        <input type='text' {...nameInput.bind}/>
                        {!nameInput.validation.isValid &&
                        <Label basic pointing color='red'>{nameInput.validation.msg}</Label>}
                    </Form.Field>
                    <Form.Field error={!emailInput.validation.isValid}>
                        <label htmlFor={emailInput.id}>Email address:</label>
                        <input type='text' {...emailInput.bind}/>
                        {!emailInput.validation.isValid &&
                        <Label basic pointing color='red'>{emailInput.validation.msg}</Label>}
                    </Form.Field>
                    <Form.Field error={!passwordInput.validation.isValid}>
                        <label htmlFor={passwordInput.id}>Password:</label>
                        <input type='password' {...passwordInput.bind}/>
                        {!passwordInput.validation.isValid &&
                        <Label basic pointing color='red'>{passwordInput.validation.msg}</Label>}
                    </Form.Field>
                    <Button secondary
                            disabled={!form.isFormValid}
                            onClick={registerHandler}>
                        Sign Up
                    </Button>
                </Form>
            </Card.Content>
        </Card>
    );
}

export default RegistrationPage;
