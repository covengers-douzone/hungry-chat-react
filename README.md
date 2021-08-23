# Hungry Chat React

## Project

### 설치
```shell
npm i -D redux-devtools-extension
```
* redux-devtools-extension : 현재 Store 상태를 개발자 도구로 편하게 조회가능 
    * 사용시, [chrome 확장 프로그램](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) 에서도 설치

### 기능

* chat list 가지고 오기
    * 관련
        * App/Module/fetchApi.js
            * getRoomList: room, participant -> room list
            * getChatList: chat, participant -> chat list
        * App/Layout.js
            * fetchApi 사용, roomList, chatList 저장
            * code
                ```js
                const [roomList, setRoomList] = useState([]);
                const [chatList, setChatList] = useState([]);

                useEffect(()=>{
                    fetchApi(roomList,setRoomList).getRoomList()
                        .then( roomlist => {
                            roomlist.map((room) => {
                                fetchApi(chatList,setChatList).getChatList(room.no);
                            });
                        });
                },[]);
                ```
        * App/Sidebars/index.js
            * 받은 chatList, roomList 를 하나의 chatList로 만듦
            * code
                ```js
                roomList.map((room) => {
                const chats = chatList.filter(chat => room.no === chat.roomNo);
                if(chats && chats.length > 0){
                    roomChatList.push({
                        id: room.no,
                        name: chats[0].Participant.nickname,
                        avatar: <figure className="avatar avatar-state-success">
                            <img src={ManAvatar1} className="rounded-circle" alt="avatar"/>
                        </figure>,
                        text: <p>What's up, how are you?</p>,
                        date: '03:41 PM',
                        unread_messages: 1,
                        messages: chats.map(chat => {
                            if(chat.Participant.no === userNo){
                                return ({
                                    text: chat.contents,
                                    date: chat.createdAt
                                })
                            } else {
                                return ({
                                    text: chat.contents,
                                    date: chat.createdAt,
                                    type: 'outgoing-message'
                                })    
                            }
                        })
                    });
                }
            })
            ```