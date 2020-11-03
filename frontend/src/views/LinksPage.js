import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AppContext} from "../context/Context";
import Loader from "../components/Loader";
import {Button, Card, Container, Header} from "semantic-ui-react";
import {Table} from "evergreen-ui";
import {useHistory} from "react-router-dom";

const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {request, loading} = useHttp()
    const {token} = useContext(AppContext)
    const history = useHistory()

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading) return <Loader/>

    const changePage = (e) => {
        e.preventDefault()
        history.push(e.target.dataset.to)
    }

    if (!links.length) {
        return <Card centered fluid style={{marginTop: '3%', padding: '30px'}}>
            <Container textAlign='center'> <Header as='h3'>There are nothing yet</Header></Container>
        </Card>
    }

    return (
        <Card fluid>
            <Table>
                <Table.Head>
                    <Table.TextHeaderCell flexBasis='5%' flexShrink={0} flexGrow={0}>#</Table.TextHeaderCell>
                    <Table.TextHeaderCell flexBasis='50%' flexShrink={0} flexGrow={1}>Source</Table.TextHeaderCell>
                    <Table.TextHeaderCell flexBasis='35%' flexShrink={0} flexGrow={1}>Link</Table.TextHeaderCell>
                    <Table.TextHeaderCell
                        textAlign='center'
                        flexBasis='10%'
                        flexShrink={0}
                        flexGrow={1}>
                        Details
                    </Table.TextHeaderCell>
                </Table.Head>
                <Table.Body>
                    {
                        links.map((link, index) => {
                            return (
                                <Table.Row key={index}>
                                    <Table.TextCell
                                        flexBasis='5%'
                                        flexShrink={0}
                                        flexGrow={0}
                                    >
                                        {index + 1}
                                    </Table.TextCell>
                                    <Table.TextCell
                                        flexBasis='50%'
                                        flexShrink={0}
                                        flexGrow={1}
                                    >
                                        <a href={link.from}
                                           rel='noopener noreferrer'
                                           target='_blank'>{link.from}</a>
                                    </Table.TextCell>
                                    <Table.TextCell
                                        flexBasis='35%'
                                        flexShrink={0}
                                        flexGrow={1}
                                    >
                                        <a href={link.to} rel='noopener noreferrer' target='_blank'>{link.to}</a>
                                    </Table.TextCell>
                                    <Table.TextCell
                                        flexBasis='10%'
                                        flexShrink={0}
                                        flexGrow={0}
                                    >
                                        <Button
                                            onClick={changePage}
                                            data-to={`/detail/${link._id}`}>Details</Button>
                                    </Table.TextCell>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
            </Table>
        </Card>
        // <Table celled>
        //     <Table.Header>
        //         <Table.Row>
        //             <Table.HeaderCell>#</Table.HeaderCell>
        //             <Table.HeaderCell>Source</Table.HeaderCell>
        //             <Table.HeaderCell>Link</Table.HeaderCell>
        //             <Table.HeaderCell>Open</Table.HeaderCell>
        //         </Table.Row>
        //     </Table.Header>
        //
        //     <Table.Body>
        //         {
        //             links.map((link, index) => {
        //                 return (
        //                     <Table.Row key={index}>
        //                         <Table.Cell>{index + 1}</Table.Cell>
        //                         <Table.Cell
        //                             warning
        //                             style={{
        //                                 overflow: "hidden",
        //                                 width: '300px',
        //                                 whiteSpace: "nowrap"
        //                             }}>{link.from}</Table.Cell>
        //                         <Table.Cell>{link.to}</Table.Cell>
        //                         <Table.Cell><Button>Details</Button></Table.Cell>
        //                     </Table.Row>
        //                 )
        //             })
        //         }
        //     </Table.Body>
        // </Table>
        // <div className="page">
        //     <div className="page-inner" style={{width: "100%"}}>
        //         <div className="simple-card">
        //             {!loading &&
        //             <>
        //                 <Row>
        //                     <Col lg={1}>#</Col>
        //                     <Col lg={4}>Original</Col>
        //                     <Col lg={4}>Shorted</Col>
        //                     <Col lg={2}>Open</Col>
        //                 </Row>
        //                 {
        //                     links.map((link, index) => {
        //                         return (
        //                             <Row key={index}>
        //                                 <Col lg={1}>{index + 1}</Col>
        //                                 <Col lg={4} style={{overflow: "hidden", whiteSpace: "nowrap"}}>{link.from}</Col>
        //                                 <Col lg={4}>{link.to}</Col>
        //                                 <Col lg={2}> <Link to={`/detail/${link._id}`}>Open</Link></Col>
        //                             </Row>
        //                         )
        //                     })
        //                 }
        //             </>
        //
        //             }
        //         </div>
        //     </div>
        // </div>
    );
};

export default LinksPage;
