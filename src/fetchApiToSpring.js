// 비동기 통신
import * as config from "./config/config";

export default function (defaultState , setState) {
    return {
        dummy: async  function(e){
            try {
                const response = await fetch(`${config.URL}/api/user/join`,{
                    method:"POST",
                    credentials: 'include',
                    headers:{
                        "Access-Control-Allow-Headers" : "Content-Type",
                        "Access-Control-Allow-Origin": `${config.SPRING_URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        'Accept': 'application/json, text/plain',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify({
                    })
                })
              return response.json();
            }catch (e){
                console.error(`Error : ${e}`);
            }
        },
    }
}
