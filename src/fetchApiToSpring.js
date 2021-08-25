// 비동기 통신
export default function (defaultState , setState) {
    const PORT = 8888;
    const domain = `http://localhost:`;
    const URI = domain+PORT;
    return {
        dummy: async  function(e){
            try {
                const response = await fetch(`${URI}/api/user/join`,{
                    method:"POST",
                    credentials: 'include',
                    headers:{
                        "Access-Control-Allow-Headers" : "Content-Type",
                        "Access-Control-Allow-Origin": "http://localhost:8888",
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
