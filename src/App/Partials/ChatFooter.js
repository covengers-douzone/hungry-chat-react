import React ,{useState,useRef,useEffect} from 'react'
import {Button, Input} from 'reactstrap'
import UploadFileModal from "../Modals/UploadFileModal";

import UploadVideoModal from "../Modals/UploadVideoModal";

import CodeBlockModal from "../Modals/CodeBlockModal";
import ReactPlayer from "react-player";
import {useDispatch, useSelector} from "react-redux";
import {markDownAction} from "../../Store/Actions/markDownAction";
import Picker from "emoji-picker-react";


function ChatFooter(props) {

    const dispatch = useDispatch
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [videoUploadModalOpen, setVideoUploadModalOpen] = useState(false);

    const [file, setFile] = useState(null);
    const [ previewURL, setPreviewUrl ] = useState(null);
    const [type,  setType] = useState(null);
    const {markDown} = useSelector(state => state)

    const [modalCodeBlock , setModalCodeBlock] = useState(false);

    const editModalToggle = () => setUploadModalOpen(!uploadModalOpen);
    const editVideoModalToggle = () => setVideoUploadModalOpen(!videoUploadModalOpen);

    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [emojiOpen, setEmojiOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Chat.js에 메세지 관련 데이터 보내기
        props.onSubmit({
            file: file,
            text: props.inputMsg
        });

        // file: 보내고 데이터 비우기
        setPreviewUrl(null);
        setFile(null);
    };
    const chatCodeBlock = () => {
        console.log("chatCodeBlock" , modalCodeBlock)
        setModalCodeBlock(!modalCodeBlock)
    }
    const handleChange = (e) => {
        console.log("")
        props.onChange(e.target.value)
    };

    const selectFile = (e) => {
        setUploadModalOpen(true);
    }

    const videoUpload = (e) => {
        setVideoUploadModalOpen(true);
    }

    const handleFile = (userFile,previewURL) => {
        setFile(userFile);
        setPreviewUrl(previewURL);
        const type = previewURL.split('/')[0].split(':')[1];
        setType("image");
    }

    const handleVideoFile = (userFile,previewURL) => {
        setFile(userFile);
        setPreviewUrl(previewURL);
        const type = previewURL.split('/')[0].split(':')[1];
        setType("video")
    }

    const handleKeyPress = (e) => {

        console.log("handleKeyPress" , e.key)
        if(e.key ==="Enter"){
            handleSubmit(e);
        }



    }

    const keydownHandler = (e) => {
        if(e.keyCode===13 && e.ctrlKey) {
            props.setInputMsg(props.inputMsg+"\n")
        }

    }


    useEffect(() => {
        document.addEventListener('keydown',keydownHandler);
        return () => {
            document.removeEventListener('keydown',keydownHandler);
        }
    })


    const onEmojiClick = (event, {emoji}) => {
        setChosenEmoji(emoji);
        props.inputMsg === "" ? props.setInputMsg(emoji) : props.setInputMsg(props.inputMsg + emoji);
    };

    return (
        <div className="chat-footer">

            {/* emoji */}
            {
                emojiOpen &&  <div>
                    {chosenEmoji ? (
                        <span>{chosenEmoji}</span>
                    ) : (
                        <span>Covengers !</span>
                    )}
                    <Picker onEmojiClick={onEmojiClick} />
                </div>
            }

            <form onSubmit={handleSubmit}>
                {
                    previewURL ?
                        type === "video" ?
                            <ReactPlayer
                                  className='react-player'
                                  url={previewURL}
                                  width='100%'
                                  height='100%'
                                  playing
                                />
                        :

                            <img
                                  style={{
                                    height: "100px"
                                    
                                  }}
                                  src={previewURL}
                                  className="form-control"
                                  alt="avatar"
                            />
                        :
                        <textarea onKeyPress = {handleKeyPress} className="form-control" placeholder="메세지 입력" value={props.inputMsg}
                           onChange={handleChange}/>
                }

                <div className="form-buttons">
                    <Button color="light" className="btn-floating"  onClick={() => {
                        setEmojiOpen(!emojiOpen);
                    }}>
                        <i className="ti ti-face-smile"></i>
                    </Button>
                    <Button color="light" className="btn-floating" onClick={chatCodeBlock}>
                        <i className="fa fa-code">
                            <CodeBlockModal modal = {modalCodeBlock} setModal = {setModalCodeBlock}/>
                        </i>
                    </Button>
                    <Button color="light" className="btn-floating" onClick={selectFile}>
                        <i className="fa fa-paperclip"></i>
                    </Button>
                    <Button color="light" className="btn-floating" onClick={videoUpload}>
                    <i class="fa fa-video-camera" aria-hidden="true"></i>
                    </Button>
                    
                    <Button color="primary" className="btn-floating">
                        <i className="fa fa-send"></i>
                    </Button>
                </div>
            </form>

            <UploadVideoModal modal={videoUploadModalOpen} toggle={editVideoModalToggle} handleFile={handleVideoFile}/>
            <UploadFileModal modal={uploadModalOpen} toggle={editModalToggle} handleFile={handleFile}/>
            
        </div>
    )
}

export default ChatFooter
