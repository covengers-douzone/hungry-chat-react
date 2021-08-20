import React from 'react'
import ManAvatar1 from "../../../assets/img/man_avatar1.jpg"
import ManAvatar2 from "../../../assets/img/man_avatar2.jpg"
import ManAvatar3 from "../../../assets/img/man_avatar3.jpg"
import ManAvatar4 from "../../../assets/img/man_avatar4.jpg"
import WomenAvatar1 from "../../../assets/img/women_avatar1.jpg"
import WomenAvatar2 from "../../../assets/img/women_avatar2.jpg"
import WomenAvatar5 from "../../../assets/img/women_avatar5.jpg"

// 비동기 통신
const getRoomList = async function () {
    try {
        const response = await fetch(`http://localhost:8888/api/roomlist?userNo=${1}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'applcation/json'
            }
        });

        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        if (json.result !== 'success') {
            throw json.message;
        }

        //json.data.length > 0 && setChatList([...chatList, ...json.data]);
        return json.data;
    } catch (err) {
        console.error(err);
    }
}

const getChatList = async function (roomNo) {
    try {
        const response = await fetch(`http://localhost:8888/api/chatlist?roomNo=${roomNo}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'applcation/json'
            }
        });

        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        if (json.result !== 'success') {
            throw json.message;
        }
        
        //json.data.length > 0 && setChatList([...chatList, ...json.data]);
        //console.log(json.data);
        return json.data;
    } catch (err) {
        console.error(err);
    }
}

// get chatList
getRoomList()
    .then((roomlist) => {
        console.log(roomlist);
        const roomNo = roomlist[0].no;
        getChatList(roomNo)
            .then((chatList)=> {
                console.log(chatList)
            })
    })

export const chatLists2 = [
    {
        user : 1
    }
]