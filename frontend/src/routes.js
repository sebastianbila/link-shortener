import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import LinksPage from "./views/LinksPage";
import DetailPage from "./views/DetailPage";
import CreatePage from "./views/CreatePage";
import LoginPage from "./views/auth/LoginPage";
import RegistrationPage from "./views/auth/RegistrationPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/" exact>
                    <CreatePage/>
                </Route>
                <Route path="/links" exact>
                    <LinksPage/>
                </Route>
                <Route path="/detail/:id">
                    <DetailPage/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <CreatePage/>
            </Route>
            <Route path="/login" exact>
                <LoginPage/>
            </Route>
            <Route path="/registration" exact>
                <RegistrationPage/>
            </Route>
            <Route path="/detail/:id">
                <DetailPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}
