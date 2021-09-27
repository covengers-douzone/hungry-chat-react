import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, {PureComponent, useEffect, useState} from "react";
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Alert, Modal, ModalBody, ModalHeader, TabContent, TabPane} from 'reactstrap';
import {addMinutes} from "date-fns";
import axios from "axios";
import * as config from "../../config/config";


const locales = {
    "ko-Ko": require("date-fns/locale/ko")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

// month 는 -1, date는 +1 시킬것.
function CalendarModal(props){
    const [allEvents, setAllEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({start:"", end:"", title:""})
    const [alertOpen, setAlertOpen] = useState(false);
    const [newTitle, setTitle] = useState("");
    const [reload, setReload] = useState(false);

    useEffect(() => {
        try {
            axios.post(`${config.URL}/api/getCalendarEvents`, {
                roomNo: props.roomNo,
                Authorization: localStorage.getItem("Authorization"),
            }).then(res => {
                setAllEvents(res.data.data)
            }).catch(err => {
                console.log(`${err.message}`)
            })
        } catch (e) {
            console.log(e.message);
        }
    }, [reload]);

    const handleSelectSlots = ({start, end}) => {
        // const title = window.prompt('New Event name')
        // if (title){
        //     const newEvent = {
        //         events: [
        //             ...allEvents,
        //             {
        //                 title,
        //                 start,
        //                 end
        //             }
        //         ]
        //     }
        //     setAllEvents(newEvent)
        // }
    }


    const handleAddEvent =async () => {
        try {
           await axios.post(`${config.URL}/api/addCalendarEvent`, {
                title: newEvent.title,
                start: newEvent.start.toString(),
                end: newEvent.end.toString(),
                roomNo: props.roomNo,
                Authorization: localStorage.getItem("Authorization"),
            }).then(res => {
                setReload(prevState => !prevState);
                setAllEvents([...allEvents, newEvent])
            }).catch(err => {
                console.log(`${err.message}`)
            })
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
            <Modal style={{minWidth:'1000px', minHeight: '500px'}} isOpen={props.modal} centered>
                <ModalHeader toggle={props.toggle}>
                    <i className="ti ti-calendar"></i> 캘린더
                </ModalHeader>
                <ModalBody style={{minWidth:'1000px', minHeight: '500px', position:"relative"}}>
                    <Alert isOpen={alertOpen}>일정 : {newTitle}</Alert>

                    <Calendar
                        selectable
                        localizer={localizer}
                        events={allEvents}
                        startAccessor="start"
                        endAccessor={(event) => {
                        return addMinutes(new Date(event.end), 1)
                        }}
                        onSelectEvent={event => {
                            setAlertOpen(!alertOpen)
                            setTitle(event.title);
                        }}
                        onSelectSlot={event => {
                            handleSelectSlots(event)
                        }}
                        style={{ height: 500, margin: "50px" }} />


                    <div style={{marginLeft:"auto" }}>
                        <h4>새로운 일정 추가하기</h4>
                        <input type="text" placeholder="일정 제목" style={{ width: "20%", marginRight: "10px", float:"left" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                        <DatePicker placeholderText="시작하는 날" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                        <DatePicker placeholderText="끝나는 날" selected={newEvent.end} onChange={(end) => {
                            setNewEvent({ ...newEvent, end })
                        }} />
                        {newEvent.title !== "" && newEvent.start !== "" && newEvent.end !== "" ?
                            <button style={{ marginTop: "10px", border:0, borderRadius:30, }} onClick={handleAddEvent}>
                                <i className="ti ti-pin-alt" style={{color:"lightpink", fontWeight:"bold", marginRight:7}}/>
                                일정 추가하기
                            </button> :
                            <button disabled style={{ marginTop: "10px", border:0, borderRadius:30, }} onClick={handleAddEvent}>
                                <i className="ti ti-pin-alt" style={{color:"lightpink", fontWeight:"bold", marginRight:7}}/>
                                일정 추가하기
                            </button> }
                    </div>
                </ModalBody>
            </Modal>
        )
}
export default CalendarModal

