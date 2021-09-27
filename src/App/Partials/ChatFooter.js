import React ,{useState,useRef,useEffect} from 'react'
import {Button, Input} from 'reactstrap'
import UploadFileModal from "../Modals/UploadFileModal";
import UploadVideoModal from "../Modals/UploadVideoModal";

function ChatFooter(props) {

    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [videoUploadModalOpen, setVideoUploadModalOpen] = useState(false);

    const [file, setFile] = useState(null);
    const [ previewURL, setPreviewUrl ] = useState(null);
    const [isImage, setIsImage] = useState(false);
    const [isVideo, setIsVideo] = useState(false);
    const [type,  setType] = useState(null);

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

    const handleChange = (e) => {
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

                        <input type="text" className="form-control" placeholder="메세지 입력" value={props.inputMsg}
                           onChange={handleChange}/>
                }
                
                <div className="form-buttons">
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
