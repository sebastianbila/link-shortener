import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AppContext} from "../context/Context";
import Loader from "../components/Loader";
import {Button, Card, Container, Icon} from "semantic-ui-react";
import {useHistory} from "react-router";
import {toaster} from "evergreen-ui";

const DetailPage = () => {
    const {token} = useContext(AppContext)
    const {request, loading} = useHttp()
    const [link, setLink] = useState(null)
    const [clicks, setClicks] = useState(0)
    const linkID = useParams().id
    const history = useHistory()

    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkID}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLink(fetched)
            setClicks(fetched.clicks)
        } catch (e) {
        }
    }, [token, linkID, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    const removeLink = async () => {
        const response = await request(`/api/link/${linkID}`, 'DELETE', null, {
            Authorization: `Bearer ${token}`
        })
        history.push('/links')
        toaster.success(response.message)
    }

    if (loading) return <Loader/>

    return (
        <Card centered className='default-card-style'>
            <Card.Content>
                <Card.Header>Link Details</Card.Header>
            </Card.Content>
            {!loading && link &&
            <>
                <Card.Content>
                    <Card.Description>
                        <p style={{overflow: 'hidden', width: '98%'}}>Your links:&nbsp;
                            <a href={link.to}
                               style={{whiteSpace: "nowrap"}}
                               target='_blank'
                               rel='noopener noreferrer'>{link.to}</a>
                        </p>
                        <p style={{overflow: 'hidden', width: '98%'}}>Source:&nbsp;
                            <a href={link.from} target='_blank' rel='noopener noreferrer'>{link.from}</a>
                        </p>
                        <p>Created date:&nbsp;<strong>{new Date(link.date).toLocaleDateString()}</strong></p>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Container>
                        <Button
                            onClick={removeLink}
                            color='red' target='_blank'>Delete</Button>
                        <Button
                            floated='right'
                            onClick={() => setClicks(clicks + 1)}
                            basic color='green' href={link.to} target='_blank'>Open</Button>
                        <Button disabled floated='right'>
                            <Icon name='mouse pointer'/>
                            Clicks on link: {clicks}
                        </Button>
                    </Container>
                </Card.Content>
            </>
            }
        </Card>
    );
};

export default DetailPage;
