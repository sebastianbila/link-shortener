import React, {useContext, useEffect} from 'react';
import {Button, Card, Form, Label} from "semantic-ui-react";
import {useForm, useInput} from "react-sw-inputs-validation";
import {useHttp} from "../../hooks/http.hook";
import {AppContext} from "../../context/Context";
import {toaster} from "evergreen-ui";

function LoginPage() {
    const {error, request, clearError} = useHttp()

    const context = useContext(AppContext)
    const dispatch = context.dispatch

    useEffect(() => {
        if (error !== null) toaster.warning(error + '')
        clearError()
    }, [error, clearError, dispatch])

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
            {type: 'minLength', msg: 'The minimum length of password is 6', min: 6}
        ]
    })

    const form = useForm([emailInput, passwordInput])

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form.fields})
            context.login(data.token, data.userID, data.username)
        } catch (e) {
            toaster.danger(e.message || 'Something went wrong. Try again later')
        }
    }

    return (
        <Card centered className='default-card-style'>
            <Card.Content>
                <Card.Header>Login</Card.Header>
            </Card.Content>
            <Card.Content>
                <Form>
                    <Form.Field error={!emailInput.validation.isValid}>
                        <label htmlFor={emailInput.id}>Email address:</label>
                        <input  {...emailInput.bind}/>
                        {!emailInput.validation.isValid &&
                        <Label basic pointing color='red'>{emailInput.validation.msg}</Label>}
                    </Form.Field>
                    <Form.Field error={!passwordInput.validation.isValid}>
                        <label htmlFor={passwordInput.id}>Password:</label>
                        <input {...passwordInput.bind}/>
                        {!passwordInput.validation.isValid &&
                        <Label basic pointing color='red'>{passwordInput.validation.msg}</Label>}
                    </Form.Field>
                    <Button secondary
                            disabled={!form.isFormValid}
                            onClick={loginHandler}>
                        Sign In
                    </Button>
                </Form>
            </Card.Content>
        </Card>
    );
}

export default LoginPage;
