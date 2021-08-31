import axios from 'axios';
import * as config from "../../config/config";


const token = localStorage.getItem("Authorization");
const userNo = localStorage.getItem("userNo");
const username = localStorage.getItem("username");
const URL = "http://localhost:9999"

const header =  {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Access-Control-Allow-Headers":"Content-Type",
        "Access-Control-Allow-Origin":`${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
        "Access-Control-Allow-Methods":"OPTIONS,POST,GET",
        Authorization: token
    }


export const getNickname = async (data) => {
        console.log(data.get("Authorization"));
       await axios.post(
        `${URL}/api/getNickname/`,
        data,
        {
            headers: header,
            mode: 'no-cors',
            withCredentials: true
        }).then(response => {
        console.log(response);
        // return response;
    }).catch(err => {
        // console.log(`${err.status} : ${err.message}`);
           console.log(err.response);
    })
}

