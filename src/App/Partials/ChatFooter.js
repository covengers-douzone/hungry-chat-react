import React ,{useState,useRef,useEffect} from 'react'
import {Button, Input} from 'reactstrap'
import UploadFileModal from "../Modals/UploadFileModal";

function ChatFooter(props) {

    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [ previewURL, setPreviewUrl ] = useState(null);

    const editModalToggle = () => setUploadModalOpen(!uploadModalOpen);

    const handleSubmit = (e) => {
        e.preventDefault();

        props.onSubmit({
            file: file,
            text: props.inputMsg
        });

        setPreviewUrl(null);
    };

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
                        <Input type="text" className="form-control" placeholder="메세지 입력" value={props.inputMsg}
                           onChange={handleChange}/>
                }
                <div className="form-buttons">
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
