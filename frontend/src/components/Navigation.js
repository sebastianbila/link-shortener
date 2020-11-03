import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom'
import {AppContext} from "../context/Context";
import {Menu, Segment} from "semantic-ui-react";

const Navigation = () => {
    const history = useHistory()
    const context = useContext(AppContext)
    const [activeItem, setActiveItem] = useState(history.location.pathname)

    const logoutHandler = e => {
        e.preventDefault()
        context.logout()

        setActiveItem('/login')
        history.push('/login')
    }

    const changePage = (e) => {
        e.preventDefault()

        const path = e.target.dataset.to
        setActiveItem(path)
        history.push(path)
    }

    return (
        <Segment>
            <Menu size='small'>
                <Menu.Item header link data-to='/' name='create' onClick={changePage}>Link Shortener</Menu.Item>
                <Menu.Item
                    content='Create new link'
                    data-to='/create'
                    active={activeItem === '/create'}
                    onClick={changePage}
                />

                {context.isAuthenticated
                    ? <>
                        <Menu.Item
                            content='Your links'
                            active={activeItem === '/links'}
                            data-to='/links'
                            onClick={changePage}
                        />
                        {/*<Menu.Item*/}
                        {/*    name='About us'*/}
                        {/*    active={activeItem === 'aboutUs'}*/}
                        {/*    data-to='/about-us'*/}
                        {/*    onClick={changePage}*/}
                        {/*/>*/}
                        <Menu.Menu position='right'>
                            <Menu.Item>Signed in as:&nbsp;<strong>{context.username}</strong></Menu.Item>
                            <Menu.Item content='Sign out' onClick={logoutHandler}/>
                        </Menu.Menu>
                    </>
                    : <Menu.Menu position='right'>
                        <Menu.Item
                            content='Login'
                            active={activeItem === '/login'}
                            data-to='/login'
                            onClick={changePage}
                        />
                        <Menu.Item
                            content='Registration'
                            active={activeItem === '/registration'}
                            data-to='/registration'
                            onClick={changePage}
                        />
                    </Menu.Menu>
                }
            </Menu>
        </Segment>

    );
};

export default Navigation;
