import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import Signin from './auth/Signin'
import PrivateRoute from './auth/PrivateRoute'
import Signup from './user/Signup';
import Menu from './core/Menu';


const MainRouter = () => {
    return(
        <>
        <Menu />
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/users" component={Users}></Route>
                <Route exact path="/signup" component={Signup}></Route>
                <Route exact path="/signin" component={Signin}></Route>
                <PrivateRoute path='/user/edit/:userId' component={EditProfile}/>
                <Route exact path="/user/:userId" component={Profile}></Route>
            </Switch>
        </>
    )
}

export default MainRouter