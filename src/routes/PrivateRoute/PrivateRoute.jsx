import React from 'react';
import { useAuth } from '../../hooks/UseAuth/UseAuth';
import { useLocation } from 'react-router';
import Loading from '../../components/Loading/Loading';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading){
        return Loading;
    }

    if(!user){
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children
};

export default PrivateRoute;