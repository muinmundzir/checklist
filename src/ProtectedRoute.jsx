import React, { useEffect, useState } from 'react'
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('jwt')
        console.log(token)
        token ?? setIsAuthenticated(true)
    }, [])

    let location = useLocation();

    if(!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 
   return children

};

export default ProtectedRoute;
