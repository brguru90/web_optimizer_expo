import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Landing from './Components/Landing/Landing.js'
const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "home" component = {Landing} title = "Home" initial = {true} />
         {/* <Scene key = "about" component = {About} title = "About" /> */}
      </Scene>
   </Router>
)
export default Routes