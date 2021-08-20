import React from 'react'
import {Button, Input} from 'reactstrap'
import WomenAvatar5 from "../../assets/img/women_avatar5.jpg";

function ChatFooter(props) {

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit({
            name: 'Mirabelle Tow',
            avatar: <figure className="avatar">
                <img src={WomenAvatar5} className="rounded-circle" alt="avatar"/>
            </figure>,
            text: props.inputMsg,
            date: 'Now',
            type: 'outgoing-message'
        })
    };

    const handleChange = (e) => {
        props.onChange(e.target.value)
    };

    return (
        <div className="chat-footer">
            <form onSubmit={handleSubmit}>
                <Input type="text" className="form-control" placeholder="Write a message." value={props.inputMsg}
                       onChange={handleChange}/>
                <div className="form-buttons">
                    <Button color="light" className="btn-floating">
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
        </div>
    )
}

export default ChatFooter
