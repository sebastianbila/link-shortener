import {useCallback, useEffect, useState} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userID, setUserID] = useState(null)
    const [ready, setReady] = useState(false)
    const [username, setUsername] = useState('')

    const login = useCallback((jwtToken, id, username) => {
        setToken(jwtToken)
        setUserID(id)
        setUsername(username)
        localStorage.setItem(storageName, JSON.stringify({
            userID: id, token: jwtToken, username
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserID(null)
        setUsername('')
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            login(data.token, data.userID, data.username)
        }
        setReady(true)
    }, [login])

    return {login, logout, token, userID, username, ready}
}
