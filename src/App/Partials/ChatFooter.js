import React ,{useState,useRef,useEffect} from 'react'
import {Button, Input} from 'reactstrap'
import UploadFileModal from "../Modals/UploadFileModal";

import UploadVideoModal from "../Modals/UploadVideoModal";

import CodeBlockModal from "../Modals/CodeBlockModal";
import {useDispatch, useSelector} from "react-redux";
import {markDownAction} from "../../Store/Actions/markDownAction";


function ChatFooter(props) {

    const dispatch = useDispatch
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [videoUploadModalOpen, setVideoUploadModalOpen] = useState(false);

    const [file, setFile] = useState(null);
    const [ previewURL, setPreviewUrl ] = useState(null);

    const [isImage, setIsImage] = useState(false);
    const [isVideo, setIsVideo] = useState(false);
    const [type,  setType] = useState(null);
    const {markDown} = useSelector(state => state)


    const [modalCodeBlock , setModalCodeBlock] = useState(false);

    const editModalToggle = () => setUploadModalOpen(!uploadModalOpen);
    const editVideoModalToggle = () => setVideoUploadModalOpen(!videoUploadModalOpen);

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
        console.log(type);
        setType("image");
    }

    const handleVideoFile = (userFile,previewURL) => {
        setFile(userFile);
        setPreviewUrl(previewURL);
        const type = previewURL.split('/')[0].split(':')[1];
        console.log(type);
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

    return (
        <div className="chat-footer">
            <form onSubmit={handleSubmit}>
                {
                    previewURL ?
                        type === "video" ? 
                    <video
                    style={{
                      height: "100px"
                      
                    }}
                    src={previewURL}
                    className="form-control"
                    alt="avatar"
                    />:

                            <img
                                  style={{
                                    height: "100px"
                                    
                                  }}
                                  src={previewURL}
                                  className="form-control"
                                  alt="avatar"
                            />
                            

                              
                        :

                        <textarea type="text" onKeyPress = {handleKeyPress} className="form-control" placeholder="메세지 입력" value={props.inputMsg}
                           onChange={handleChange}/>
                }
                <div className="form-buttons">
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
