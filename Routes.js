import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Landing from './Components/Landing/Landing.jsx'
import Dashboard from './Wrapper/Dashboard'

const Routes = (props) => {
   return (
      <Router {...props}>
         <Scene key="root">
            <Scene key="home" component={Landing} title="Home" initial={true} hideNavBar={true} />
            <Scene key="dashboard" component={Dashboard} title="Dashboard" hideNavBar={true} />
         </Scene>
      </Router>
   )
}

export default Routes