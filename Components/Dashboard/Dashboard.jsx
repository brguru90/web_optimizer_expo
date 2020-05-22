import React from 'react';
import { StyleSheet, Text, View, StatusBar, Fragment } from 'react-native';
import default_style from "./style.js"
import logics from "../commonLogic.js"
import Sidebar from "../Sidebar/Sidebar.jsx";
import menu from "../Menu/Menu.jsx";
import axios from 'axios'
import fetchStream from 'fetch-readablestream';
import HookWrapper from "../HookWrapper";
// import RNFetchBlob from 'rn-fetch-blob'


// var RNFetchBlob = require('rn-fetch-blob');

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
      count: 0,
      load_balance_status: false,
      loaded: [],
      cus_hook: null
   }


   count = 0
   total = 10
   interval = null
   interval2 = null
   interval3 = null
   interval4 = null
   timeout = null
   server = "http://weboptimizer.terralogic.com"
   server2 = "http://199.21.200.85"
   server = this.server2
   test_mode = 1
   loaded_apis = []

   componentDidMount() {

      // this.interval2 = setInterval(() => {
      //    if (this.count > this.total) {
      //       setTimeout(() => {
      //          ctx.forceUpdate()
      //       }, 1000);
      //       console.log("Scan complete")
      //       clearInterval(ctx.interval2)
      //    }
      //    console.log(this.count)

      // }, 1000)

      if (this.props.redux_data && this.props.redux_data.loaded_apis_json) {
         let urls= Object.keys(this.props.redux_data.loaded_apis_json)
         console.log("level=4, ",this.list_json_keys(this.props.redux_data,4))

         console.log("From redux store", Object.keys(this.props.redux_data), urls)
         console.log(urls)
         this.setState(this.props.redux_data.loaded_apis_json[urls[0]])
         this.setState({ loaded: Object.keys(this.props.redux_data.loaded_apis_json[urls[0]]) })
      }
      else {
         console.log("From apis", this.props.redux_data)
         this.load_data()
      }



      let temp_interval = setInterval(() => {
         this.loaded_apis = []
         for (let key in this.state) {
            if (key.match(/^api_/) && this.state[key] && this.state[key] != null) {
               this.loaded_apis.push(key)
               // console.log(key)
            }
         }
         this.setState({ loaded: this.loaded_apis })
         if (this.loaded_apis.length > 10) {
            clearInterval(temp_interval)
            this.set_data_to_store()
         }

      }, 500);

   }


   set_data_to_store = () => {
      let url = this.props.url

      let loaded_apis_json = []
      for (let key in this.state) {
         if (key.match(/^api_/) && this.state[key] && this.state[key] != null) {
            loaded_apis_json[key] = this.state[key]
            console.log(key, loaded_apis_json.length)
         }
      }
      console.log("-----------------------", Object.keys(loaded_apis_json))
      let temp={}
      temp[url]=loaded_apis_json

      let hook = <HookWrapper data={{ loaded_apis_json: temp }} hooks_call={this.props.set_data} />
      this.setState({ cus_hook: hook })

   }


   list_json_keys = (data, max_level = 5, cur_level = 1, cur_key = "") => {
      if (typeof (data) != "object")
          return `${cur_key}==>${data}\n`
      let keys = Object.keys(data)
      if (cur_level < max_level && keys.length) {
          if (cur_key != "")
              return keys.map(key => `${this.list_json_keys(data[key],max_level,cur_level+1,`${cur_key}=>${key}`)}`).join("")
          else
              return keys.map(key => `${this.list_json_keys(data[key],max_level,cur_level+1,key)}`).join("\n")
  
  
      } else
          return `${cur_key}==>${keys.join(",")}\n`
  }




   load_data = () => {
      let url = this.props.url
      let test_mode = this.test_mode
      let ctx = this


      this.get_data(this.server + "/api/traceroute/", { url: url, test_mode: test_mode }).then(data => this.setState({ api_trace_route: data }))
      this.get_data(this.server + "/api/data_caching/", { url: url, test_mode: test_mode }).then(data => this.setState({ api_data_caching: data }))
      this.get_data(this.server + "/api/ver_ssl/", { url: url, test_mode: test_mode }).then(data => this.setState({ api_ssl_validation: data }))
      this.get_data(this.server2 + "/api/check_port/", { url: url, test_mode: test_mode }, null).then(data => {
         this.setState({ api_os_port: data })
         let open_ports = []
         if (data != null)
            open_ports = jsonQuery('[*state=open].port', {
               data: data.port
            }).value
         if (open_ports.length) {
            let ports = open_ports.join(",")
            this.interval3 = setInterval(() => {
               console.log("1 waiting interval3", ctx.state.load_balance_status)
               if (ctx.state.load_balance_status) {
                  this.get_data(this.server2 + "/api/http_check/", { url: url, ports: ports, test_mode: test_mode }).then(data => this.setState({ api_http_vuln: data }))
                  ctx.get_data(this.server2 + "/api/vul_check/", { url: url, ports: ports, test_mode: test_mode }, null).then(data => ctx.setState({ api_well_known_vul_1: data }))
                  clearInterval(ctx.interval3)
               }
            }, 500);
            this.get_data(this.server + "/api/vul_check2/", { url: url, ports: ports, test_mode: test_mode }, 120).then(data => this.setState({ api_well_known_vul_2: data }))
            this.get_data(this.server + "/api/vul_check3/", { url: url, ports: ports, test_mode: test_mode }, 120).then(data => this.setState({ api_well_known_vul_3: data }))
         }
         else {
            this.interval3 = setInterval(() => {
               console.log("2 waiting interval3", ctx.state.load_balance_status)
               if (ctx.state.load_balance_status) {
                  this.get_data(this.server2 + "/api/http_check/", { url: url, test_mode: test_mode }).then(data => this.setState({ api_http_vuln: data }))
                  ctx.get_data(this.server2 + "/api/vul_check/", { url: url, test_mode: test_mode }, null).then(data => ctx.setState({ api_well_known_vul_1: data }))
                  clearInterval(ctx.interval3)
               }
            }, 500);
            this.get_data(this.server + "/api/vul_check2/", { url: url, test_mode: test_mode }, 120).then(data => this.setState({ api_well_known_vul_2: data }))
            this.get_data(this.server + "/api/vul_check3/", { url: url, test_mode: test_mode }, 120).then(data => this.setState({ api_well_known_vul_3: data }))
         }

      })




      axios({
         method: 'post',
         url: this.server + '/api/load_data/',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
         },
         data: querystring.stringify({
            url: url,
            test_mode: test_mode
         }),
      }).then(() => {
         this.get_data(this.server + "/api/analyse/", { url: url, test_mode: test_mode }).then(data => this.setState({ api_page_performance: data }))
         this.get_data(this.server + "/api/data_compression/", { url: url, test_mode: test_mode }).then(data => this.setState({ api_nw_data_performance_metrics: data }))
      })






      this.interval = setInterval(async () => {
         if (this.count >= 8) {
            clearInterval(ctx.interval)
            let data = []
            // Alert.alert(
            //    'start load balancing '+ctx.server2
            // )
            console.log("I got all other data,this is the Time to check server load")

            //   const response= await fetch(ctx.server2 + '/api/load_balancing/', {
            // method: 'POST',
            // headers: {
            //    "User-Agent"   : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36",
            //    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            //    'Transfer-Encoding' : 'Chunked'
            // },
            // body: querystring.stringify({ url: url, test_mode: test_mode })
            //    })
            //       .then((resp) => {
            //          console.log("@@@@@@@@@@@@ ------- ", resp.status, resp.statusText,  Object.keys(resp),Object.keys(resp._bodyBlob))
            //          console.log(JSON.stringify(resp))
            //       })
            // .catch(function (error) {
            //    console.log(error);
            //    ctx.count++
            //    Alert.alert(
            //       "got error "
            //    )
            // })
            // .then(async (response) => {
            //    console.log("@@@@@@@@@@@@ ------- ", resp.status, resp.statusText,  Object.keys(resp),Object.keys(resp._bodyBlob))
            //       console.log(JSON.stringify(resp))

            //    Alert.alert(
            //       `got response ${ctx.server2 } ${test_mode}`
            //    )

            //    // console.log("response.........",response)

            //    console.log("response.body", response.body)



            //    const reader = response.body.getReader();
            //    while (true) {
            //       const { done, value } = await reader.read();
            //       if (done) {
            //          console.log("done", url, data)
            //          ctx.count++
            //          //to make sure the server is up
            // ctx.interval4 = setInterval(() => {
            //    axios({
            //       method: 'post',
            //       url: ctx.server + '/api/url_check/',
            //       headers: {
            //          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            //       },
            //       data: querystring.stringify({
            //          url: url,
            //          test_mode: test_mode
            //       }),
            //    })
            //       .then(function (response) {
            //          console.log("response", response.data);
            //          if (response.data.valid == "valid") {
            //             ctx.setSyncState({ load_balance_status: true })
            //             clearInterval(ctx.interval4)
            //          }
            //          else
            //             console.log("waiting for server to up")

            //       })
            // }, 500);

            //          break;
            //       }
            //       let temp_arr = []
            //       let temp_data = new TextDecoder("utf-8").decode(value).split("\n").map(data => data.replace("data:", ""))
            //       for (let i in temp_data)
            //          try {
            //             temp_arr.push(JSON.parse(temp_data[i]))
            //          } catch (error) {

            //          }
            //       data = data.concat(temp_arr)
            //       console.log("data", data)
            //       this.setState({ api_server_load_info: data })

            //    }
            // })




            let input = {
               method: 'POST',
               url: ctx.server2 + '/api/load_balancing/',
               headers: {
                  "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36",
                  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
               },
               body: { url: url, test_mode: test_mode }
            }


            this.Stream(input, (cur_data) => {
               let temp_arr = []
               let temp_data = cur_data.split("\n").map(data => data.replace("data:", ""))
               for (let i in temp_data)
                  try {
                     temp_arr.push(JSON.parse(temp_data[i]))
                  } catch (error) {

                  }
               data = data.concat(temp_arr)
               // console.log("data", data)
               this.setState({ api_server_load_info: data })
            },
               (cur_data) => {
                  console.log("------------done", url, data.length)
                  ctx.count++
                  ctx.interval4 = setInterval(() => {
                     axios({
                        method: 'post',
                        url: ctx.server + '/api/url_check/',
                        headers: {
                           'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                        },
                        data: querystring.stringify({
                           url: url,
                           test_mode: test_mode
                        }),
                     })
                        .then(function (response) {
                           console.log("response", response.data);
                           if (response.data.valid == "valid") {
                              ctx.setState({ load_balance_status: true })
                              clearInterval(ctx.interval4)
                           }
                           else
                              console.log("waiting for server to up")

                        })
                  }, 500);
               }
            )

         }

      }, 1000)


   }


   Stream = (input, updateCallback, done) => {
      //last response length
      var last_response_len = 0;
      var xhttp = new XMLHttpRequest();
      xhttp.onprogress = function () {
         //Get new part of response
         var responseText = xhttp.response.substr(last_response_len);
         //Set new response position
         last_response_len = xhttp.response.length;
         updateCallback(responseText)
      }

      xhttp.onreadystatechange = function (aEvt) {
         if (xhttp.readyState == 4 && xhttp.status == 200) {
            done(xhttp.responseText)
         }
      }

      //Initialize request
      xhttp.open(input.method, input.url, true);
      if (input.headers) {
         for (let key in input.headers)
            xhttp.setRequestHeader(key, input.headers[key]);
      }
      if (input.body) {
         xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
         let params = []
         for (let key in input.body)
            params.push(`${key}=${input.body[key]}`)
         xhttp.send(params.join("&"));
      }
      else
         xhttp.send();
   }

   componentWillUnmount() {
      clearInterval(this.interval)
      clearInterval(this.interval2)
      clearInterval(this.interval3)
      clearInterval(this.interval4)
   }


   get_data = async (url, data, timeout = 300) => {
      let ctx = this;
      if (timeout != null) {
         return await axios({
            method: 'post',
            url: url,
            timeout: 1000 * timeout,
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data: querystring.stringify(data),
         })
            .then(function (response) {
               // console.log(response.data);
               ctx.count++;
               return response.data

            })
            .catch(function (error) {
               console.log(error);
               ctx.count++;
               return null
            });
      }
      else {
         return await axios({
            method: 'post',
            url: url,
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data: querystring.stringify(data),
         })
            .then(function (response) {
               // console.log(response.data);
               ctx.count++;
               return response.data

            })
            .catch(function (error) {
               console.log(error);
               ctx.count++;
               return null
            });
      }
   }



   render() {
      const styles = logics.updateStyle(default_style, this.state.styles)

      return (
         <Sidebar menu={menu}>
            <StatusBar barStyle="dark-content" hidden={false} translucent={false} backgroundColor="red" />
            <View style={styles.container}>
               <Text>Open up App.js to start working on your app!</Text>
               <Text>{JSON.stringify(this.state.styles)}</Text>
               <Text>{this.props.url}</Text>
               <Text>{this.count}</Text>
               <Text>{this.state.loaded.join("\n,")}</Text>
               {!(this.props.redux_data && this.props.redux_data.loaded_apis_json) ? this.state.cus_hook : <View></View>}

            </View>
         </Sidebar>

      );
   }

}
