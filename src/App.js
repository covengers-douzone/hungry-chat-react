import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"

import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import LockScreen from "./Pages/LockScreen"
import ResetPassword from "./Pages/ResetPassword"
import PhoneCode from "./Pages/PhoneCode"
import Layout from "./App/Layout"
import UserInfoSearch from "./Pages/UserInfoSearch"
import UserId from "./Pages/UserId"
import Error500 from "./Pages/Error500"
import Activation from "./Pages/Activation"


function App() {
    return (
        <Router>
                <Route path="/error/500" component={Error500}/>
            <Switch>

                {/*<Route path="/sign-in" component={SignIn}/>*/}
                <Route exact path="/chat" component={Layout}/>
                <Route exact path="/sign-up" component={SignUp}/>
                <Route exact path="/lock-screen" component={LockScreen}/>
                <Route exact path="/reset-password" component={ResetPassword}/>
                <Route exact path="/phone-code" component={PhoneCode}/>
                <Route exact path="/userinfo" component={UserInfoSearch}/>
                <Route exact path="/userId" component={UserId}/>
                <Route exact path="/activation" component={Activation}/>
                <Route path="/" component={SignIn}/>
            </Switch>
        </Router>
    )
}

export default App
