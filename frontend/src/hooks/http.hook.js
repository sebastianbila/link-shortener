import {useCallback, useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {AppContext} from "../context/Context";

function checkData(response, data) {
    if (!response.ok) throw new Error(data.message || 'Something went wrong')
}

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const history = useHistory()
    const context = useContext(AppContext)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers})
            if (response.status === 401) {
                context.logout()
                history.push('/login')
                throw new Error('Session expired. Please, login in again.')
            }
            if (response.status === 500) throw new Error('Server didn\'t response')
            const data = await response.json()

            checkData(response, data)

            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(error || e.message)
            throw e
        }
    }, [context, error, history])

    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError}
}
