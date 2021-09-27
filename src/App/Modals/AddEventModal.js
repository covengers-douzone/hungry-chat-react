import React, {useState} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Tooltip,
    Alert,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import * as config from "../../config/config";
import axios from "axios";

function AddEventModal( props ) {

    const [title, setTitle] = useState("");

    const send = async () => {
            try {
                await axios.post(`${config.URL}/api/addCalendarEvent`, {
                    title: title,
                    start: props.data.start,
                    end: props.data.end,
                    roomNo: props.data.roomNo,
                    Authorization: localStorage.getItem("Authorization"),
                }).then(res => {
                    props.setReload(prevState => !prevState);
                    props.setAllEvents([...props.allEvents, props.newEvent])
                    props.modalToggle()
                }).catch(err => {
                    console.log(`${err.message}`)
                })
            } catch (e) {
                console.log(e.message);
            }
    }

    return (
        <div>
            <Modal className="modal-dialog-zoom" isOpen={props.modal} centered>
                <ModalHeader toggle={props.modalToggle}>
                    <i className="ti ti-pencil"></i> COVENGERS !) 이벤트 추가
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="title">일정 제목</Label>
                            <Input type="text" name="title" id="title" onChange={(event)=>{
                                const { value } = event.target;
                                setTitle(value);
                            }}/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    {title === "" ? <Button disabled color="primary" onClick={send}>제출하기</Button> : <Button color="primary" onClick={send}>제출하기</Button>}
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default AddEventModal
