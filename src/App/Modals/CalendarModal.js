import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, {PureComponent, useEffect, useState} from "react";
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Alert, Modal, ModalBody, ModalHeader, NavItem, NavLink, TabContent, TabPane, Nav, Button} from 'reactstrap';
import {addMinutes} from "date-fns";
import axios from "axios";
import * as config from "../../config/config";
import AddEventModal from "./AddEventModal";
import classnames from 'classnames'
import '../../assets/scss/calendar.scss';


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
    const [eventSuccessOpen, setEventSuccessOpen] = useState(false);

    const [newTitle, setTitle] = useState("");
    const [reload, setReload] = useState(false);

    const [data, setData] = useState();
    const [modal, setModal] = useState(false);
    const modalToggle = () => setModal(!modal);
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

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


    const handleSelectSlots =  ( async ({start, end}) => {
        setModal(!modal);
        setData({
            start : start.toString(),
            end : addMinutes(new Date(end), -1).toString(),
            roomNo : props.roomNo
        })
    })


    const handleAddEvent = async () => {
        setEventSuccessOpen(false);
        try {
           await axios.post(`${config.URL}/api/addCalendarEvent`, {
                title: newEvent.title,
                start: newEvent.start.toString(),
                end: newEvent.end.toString(),
                roomNo: props.roomNo,
                Authorization: localStorage.getItem("Authorization"),
            }).then(res => {
                setEventSuccessOpen(true)
                setReload(prevState => !prevState);
                setAllEvents([...allEvents, newEvent])
            }).catch(err => {
                console.log(`${err.message}`)
            })
        } catch (e) {
            console.log(e.message);
        }
    }

    const role = localStorage.getItem("role") === "ROLE_USER";

    return (
            <Modal style={{minWidth:'1000px', minHeight: '500px'}} isOpen={props.modal} centered>
                <ModalHeader toggle={props.toggle}>
                <i className="ti ti-calendar"></i> 캘린더
                </ModalHeader>
                <ModalBody style={{minWidth:'1000px', minHeight: '500px', position:"relative"}}>
                    <Alert isOpen={alertOpen}>일정 : {newTitle}</Alert>
                    <AddEventModal data={data} modal={modal} modalToggle={modalToggle} setReload={setReload} allEvents={allEvents} setAllEvents={setAllEvents} newEvent={newEvent}/>
                    <Nav tabs>
                        <NavItem>
                            <NavLink href="#/"
                                     className={classnames({active: activeTab === '1'})}
                                     onClick={() => {
                                         setAlertOpen(false);
                                         setEventSuccessOpen(false);
                                         toggle('1');
                                     }}
                            >
                                일정 보기 & 클릭하여 일정 추가하기
                            </NavLink>
                        </NavItem>
                        { role ?
                            <NavItem>
                                <NavLink href="#/"
                                         className={classnames({active: activeTab === '2'})}
                                         onClick={() => {
                                             setAlertOpen(false);
                                             setEventSuccessOpen(false);
                                             toggle('2');
                                         }}
                                >
                                    날짜로 일정 추가하기
                                </NavLink>
                            </NavItem> : ""
                        }
                    </Nav>

                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            { role ?  <Calendar
                                selectable
                                localizer={localizer}
                                events={allEvents}
                                views={['month','agenda']}
                                startAccessor="start"
                                endAccessor={(event) => {
                                    return addMinutes(new Date(event.end), 1)
                                }}
                                onSelectEvent={event => {
                                    setAlertOpen(true);
                                    setTitle(event.title);
                                }}
                                onSelectSlot={event => {
                                    handleSelectSlots(event)
                                }}
                                style={{ height: 500, margin: "50px" }} /> :
                                <Calendar
                                    localizer={localizer}
                                    events={allEvents}
                                    views={['month','agenda']}
                                    startAccessor="start"
                                    endAccessor={(event) => {
                                        return addMinutes(new Date(event.end), 1)
                                    }}
                                    onSelectEvent={event => {
                                        setAlertOpen(true);
                                        setTitle(event.title);
                                    }}
                                    onSelectSlot={event => {
                                        handleSelectSlots(event)
                                    }}
                                    style={{ height: 500, margin: "50px" }} />
                            }

                        </TabPane>
                        <TabPane tabId="2">
                            <div className="calendar-setting">
                                <Alert isOpen={eventSuccessOpen}>일정 추가 완료</Alert>
                                <div>
                                    <label id="calendar_title">일정 제목</label>
                                    <br/>
                                    <input type="text" placeholder="일정 제목" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                                 </div>
                                <div>
                                    <label id="calendar_start">일정 시작</label>
                                    <DatePicker id="start" placeholderText="시작하는 날" selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                                </div>
                                <div>
                                    <label id="calendar_end">일정 끝</label>
                                    <DatePicker id="end" placeholderText="끝나는 날" selected={newEvent.end} onChange={(end) => {
                                        setNewEvent({ ...newEvent, end })
                                    }} />
                                </div>

                                {newEvent.title !== "" && newEvent.start !== "" && newEvent.end !== "" ?
                                    <Button onClick={handleAddEvent} color="primary"> <i className="ti ti-pin-alt" style={{color: "lightpink", fontWeight: "bold", marginRight: 7}}/>일정 추가하기</Button>
                                    : <Button disabled onClick={handleAddEvent} color="primary"> <i className="ti ti-pin-alt" style={{color: "lightpink", fontWeight: "bold", marginRight: 7}}/>일정 추가하기</Button>
                                }
                            </div>
                        </TabPane>
                    </TabContent>


                </ModalBody>
            </Modal>
        )
}
export default CalendarModal

