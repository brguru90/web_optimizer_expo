import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Animated, Dimensions, Easing, PanResponder } from 'react-native';
import default_style from "./style.js"
import Sidebar from "../Sidebar/Sidebar.jsx";
import menu from "../Menu/Menu.jsx";
import axios from 'axios'
var querystring = require('querystring');
var jsonQuery = require('json-query')




export default class Dashboard extends React.Component {

   state = {
      styles: JSON.parse(JSON.stringify(default_style)),
      api_nw_data_performance_metrics: null,
      api_data_caching: null,
      api_page_performance: null,
      api_server_load_info: null,
      api_os_port: null,
      api_trace_route: null,
      api_well_known_vul_1: null,
      api_well_known_vul_2: null,
      api_well_known_vul_3: null,
      api_http_vuln: null,
      api_ssl_validation: null,
      url: this.props.url,
      count: 0,
      target_url: "",
      load_balance_status: false,
   }


   componentDidMount(){
      
   }



   render() {
      return (
         <Sidebar menu={menu}>
            <StatusBar barStyle="dark-content" hidden={false} translucent={false} backgroundColor="red" />
            <Text>Open up App.js to start working on your app!</Text>
            <Text>{JSON.stringify(this.state.styles)}</Text>
            <Text>{this.props.url}</Text>
         </Sidebar>

      );
   }

}
