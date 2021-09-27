import React ,{useState,useRef,useEffect} from 'react'
import {Button, Input} from 'reactstrap'
import UploadFileModal from "../Modals/UploadFileModal";
import CodeBlockModal from "../Modals/CodeBlockModal";

function ChatFooter(props) {

    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [ previewURL, setPreviewUrl ] = useState(null);
    const [modalCodeBlock , setModalCodeBlock] = useState(false);
    const editModalToggle = () => setUploadModalOpen(!uploadModalOpen);

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
        props.onChange(e.target.value)
    };

    const selectFile = (e) => {
        setUploadModalOpen(true);
    }

    const handleFile = (userFile,previewURL) => {
        setFile(userFile);
        setPreviewUrl(previewURL);
    }

    return (
        <div className="chat-footer">
            <form onSubmit={handleSubmit}>
                {
                    previewURL ?
                            <img
                                  style={{
                                    height: "100px"
                                  }}
                                  src={previewURL}
                                  className="form-control"
                                  alt="avatar"
                            />
                        :
                        <textarea type="text" className="form-control" placeholder="메세지 입력" value={props.inputMsg}
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
                    <Button color="light" className="btn-floating">
                        <i className="fa fa-microphone"></i>
                    </Button>
                    <Button color="primary" className="btn-floating">
                        <i className="fa fa-send"></i>
                    </Button>
                </div>
            </form>
            <UploadFileModal modal={uploadModalOpen} toggle={editModalToggle} handleFile={handleFile}/>
        </div>
    )
}

export default ChatFooter
