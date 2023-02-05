import React, { createContext, useState } from 'react'
export const Session = createContext();

const SessionProvider = ({ children }) => {

    const [userSession, setUserSession] = useState(localStorage.getItem('token'));
    const [list, setRenderList] = useState(false);
    const [priorities, setPriorities] = useState(JSON.parse(localStorage.getItem('priorities')) || []);

    const setToken = (token) =>
    {   
        localStorage.setItem('token', token);
        setUserSession(token);
    }

    const renderList = (status) =>
    {
        setRenderList(status)
    }

    const setPrioritiesInStorage = (priorityList) =>
    {   
        setPriorities(priorityList);
        localStorage.setItem('priorities',JSON.stringify(priorityList))
    }

    return (
        <Session.Provider value={{userSession, setToken, list, renderList, priorities, setPrioritiesInStorage}}> {children} </Session.Provider>
    )
}

export default SessionProvider;