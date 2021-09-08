import axios from 'axios';
import * as config from "../../config/config";


const URL = "http://localhost:9999"

// export const getNickname = async (data) => {
//
//     const option = {
//         url:`${URL}/api/getNickname/`,
//         method:"post",
//         data: qs.stringify(data),
//         headers :{
//             'Content-Type': "multipart/form-data",
//             'Accept': 'application/json',
//             "Access-Control-Allow-Headers":"Content-Type",
//             "Access-Control-Allow-Origin":`${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
//             "Access-Control-Allow-Methods":"OPTIONS,POST,GET",
//             Authorization: token
//         }
//     }
//        await axios(option)
//            .then(response => {
//            // return response;
//        }).catch(err => {
//            // console.log(`${err.status} : ${err.message}`);
//            console.log(err.response);
//        })
// }

export const getNickname = async (formdata) => {
    console.log(localStorage.getItem("Authorization"))
    console.log(localStorage.getItem("userNo"));
    console.log(localStorage.getItem("username"));
    console.log(formdata);

    // const option = {
    //     method:"POST",
    //     body: {
    //         "file": file,
    //         "nickname":nickname,
    //         "userNo":localStorage.getItem("userNo"),
    //         "password": password != null ? password : null
    //          },
    //     headers :{
    //         'Content-Type': "multipart/form-data",
    //         'Accept': 'application/json',
    //         "Access-Control-Allow-Headers":"Content-Type",
    //         "Access-Control-Allow-Origin":`${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
    //         "Access-Control-Allow-Methods":"OPTIONS,POST,GET",
    //         Authorization: localStorage.getItem("Authorization")
    //     }
    // }
    // {
    //     "file": file,
    //     "nickname":nickname,
    //     "userNo":localStorage.getItem("userNo"),
    //     "password": password != null ? password : null
    // },

    await fetch(`${URL}/api/getNickname`, {
        body:formdata,
        headers:{}
        }
    )
        .then(response => {
            console.log(response);
            // return response;
        }).catch(err => {
            // console.log(`${err.status} : ${err.message}`);
            console.log(err.response);
        })
}

