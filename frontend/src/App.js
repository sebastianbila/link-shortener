import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "./routes";
import {AppContext} from "./context/Context";
import {useAuth} from "./hooks/auth.hook";
import Navigation from "./components/Navigation";
import Loader from "./components/Loader";
import {Container} from "semantic-ui-react";

function App() {
    const {token, login, logout, userID, username, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    if (!ready) {
        return <Loader/>
    }

    return (
        <AppContext.Provider value={{
            token, login, logout, userID, username, isAuthenticated
        }}>
            <Router>
                <Container>
                    <Navigation/>
                    {routes}
                </Container>
            </Router>
        </AppContext.Provider>
    );
}

export default App;
