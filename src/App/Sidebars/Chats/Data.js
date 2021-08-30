import React from 'react'
import ManAvatar1 from "../../../assets/img/man_avatar1.jpg"
import ManAvatar2 from "../../../assets/img/man_avatar2.jpg"
import ManAvatar3 from "../../../assets/img/man_avatar3.jpg"
import ManAvatar4 from "../../../assets/img/man_avatar4.jpg"
import WomenAvatar1 from "../../../assets/img/women_avatar1.jpg"
import WomenAvatar2 from "../../../assets/img/women_avatar2.jpg"
import WomenAvatar5 from "../../../assets/img/women_avatar5.jpg"

export const chatLists = [
    {
        id: 1,
        name: 'Townsend Seary',
        avatar: <figure className="avatar avatar-state-success">
            <img src={ManAvatar1} className="rounded-circle" alt="avatar"/>
        </figure>,
        text: <p>What's up, how are you?</p>,
        date: '03:41 PM',
        unread_messages: 3,
        messages: [
            {
                text: "Hey, Maher! I'm waiting for you to send me the files.",
                date: '01:20 PM',
                type: 'outgoing-message'
            },
            {
                text: "I'm sorry :( I'll send you as soon as possible.",
                date: '01:35 PM'
            },
            {
                text: "I'm waiting. Thank you :)",
                date: '05:31 PM',
                type: 'outgoing-message'
            },
            {
                text: "I'm sending files now.",
                date: '10:12 PM'
            },
            {
                file: <React.Fragment>
                    <div className="file-icon">
                        <i className="ti ti-file"></i>
                    </div>
                    <div>
                        <div>important_documents.pdf <i className="text-muted small">(50KB)</i></div>
                        <ul className="list-inline">
                            <li className="list-inline-item"><a href="/#/">Download</a></li>
                            <li className="list-inline-item"><a href="/#/">View</a></li>
                        </ul>
                    </div>
                </React.Fragment>,
                date: '11:56 PM'
            },
            {
                text: "Thank you so much. After I review these files, I will give you my opinion. If there's a problem, you can send it back. Good luck with!",
                date: '11:59 PM',
                type: 'outgoing-message'
            },
            {
                text: "I can't wait",
                date: '07:15 AM'
            },
            {
                text: "I know how important this file is to you. You can trust me ;)",
                date: '07:45 AM',
                type: 'outgoing-message'
            },
            {
                text: "Lorem ipsum dolor sit amet.",
                date: '08:00 AM'
            }
        ]
    },
    {
        id: 2,
        name: 'Forest Kroch',
        avatar: <figure className="avatar avatar-state-warning">
            <img src={ManAvatar4} className="rounded-circle" alt="avatar"/>
        </figure>,
        text: <p><i className="fa fa-camera mr-1"></i> Photo</p>,
        unread_messages: 1,
        date: '03:41 PM',
        messages: [
            {
                text: 'Hello how are you?',
                date: '01:20 PM',
            },
            {
                text: <div>I'm fine, how are you <span role="img" aria-label="xxx">😃</span></div>,
                date: '01:35 PM',
                type: 'outgoing-message'
            },
            {
                type: 'divider',
                text: '1 message unread'
            },
            {
                text: 'What are you doing this?',
                date: '01:20 PM',
            }
        ]
    },
    {
        id: 3,
        name: 'Byrom Guittet',
        avatar: <figure className="avatar">
            <img src={ManAvatar3} className="rounded-circle" alt="avatar"/>
        </figure>,
        text: <p>I sent you all the files. Good luck with <span role="img" aria-label="xxx">😃</span></p>,
        date: '03:41 PM',
        messages: [
            {
                text: 'Hello how are you?',
                date: '01:20 PM',
            },
            {
                text: <div>I'm fine, how are you <span role="img" aria-label="xxx">😃</span></div>,
                date: '01:35 PM',
                type: 'outgoing-message'
            },
            {
                text: 'What are you doing this?',
                date: '01:20 PM',
            }
        ]
    },
    {
        id: 4,
        name: 'Margaretta Worvell',
        avatar: <figure className="avatar">
            <img src={WomenAvatar1} className="rounded-circle" alt="avatar"/>
        </figure>,
        text: <p>I need you today. Can you come with me?</p>,
        date: '03:41 PM',
        messages: [
            {
                text: 'Hello how are you?',
                date: '01:20 PM',
            },
            {
                text: <div>I'm fine, how are you <span role="img" aria-label="xxx">😃</span></div>,
                date: '01:35 PM',
                type: 'outgoing-message'
            },
            {
                text: 'What are you doing this?',
                date: '01:20 PM',
            }
        ]
    },
    {
        id: 5,
        name: <span role="img" aria-label="xxx">😍 My Family 😍</span>,
        avatar: <figure className="avatar">
            <span className="avatar-title bg-warning rounded-circle">
            <i className="fa fa-users"></i>
        </span>
        </figure>,
        text: <p><strong>Maher Ruslandi: </strong>Hello!!!</p>,
        date: '03:41 PM',
        messages: [
            {
                text: 'Hello how are you?',
                date: '01:20 PM',
            },
            {
                text: 'Hi!',
                date: '01:20 PM',
            },
            {
                text: <div>I'm fine, how are you <span role="img" aria-label="xxx">😃</span></div>,
                date: '01:35 PM',
                type: 'outgoing-message'
            },
            {
                text: 'What are you doing this?',
                date: '01:20 PM',
            }
        ]
    },
    {
        id: 6,
        name: 'Jennica Kindred',
        avatar: <figure className="avatar">
            <img src={WomenAvatar5} className="rounded-circle" alt="avatar"/>
        </figure>,
        text: <p>
            <i className="fa fa-video-camera mr-1"></i>
            Video
        </p>,
        date: '03:41 PM',
        messages: [
            {
                text: 'Hello how are you?',
                date: '01:20 PM',
            },
            {
                text: <div>I'm fine, how are you <span role="img" aria-label="xxx">😃</span></div>,
                date: '01:35 PM',
                type: 'outgoing-message'
            },
            {
                text: 'What are you doing this?',
                date: '01:20 PM',
            }
        ]
    },
    {
        id: 7,
        name: 'Marvin Rohan',
        avatar: <figure className="avatar">
            <span className="avatar-title bg-info rounded-circle">M</span>
        </figure>,
        text: <p>Have you prepared the files?</p>,
        date: '03:41 PM',
        messages: [
            {
                text: 'Hello how are you?',
                date: '01:20 PM',
            },
            {
                text: <div>I'm fine, how are you <span role="img" aria-label="xxx">😃</span></div>,
                date: '01:35 PM',
                type: 'outgoing-message'
            },
            {
                text: 'What are you doing this?',
                date: '01:20 PM',
            }
        ]
    },
    {
        id: 8,
        name: 'Townsend Seary',
        avatar: <figure className="avatar">
            <img src={WomenAvatar2} className="rounded-circle" alt="avatar"/>
        </figure>,
        text: <p>Where are you?</p>,
        date: '03:41 PM',
        messages: [
            {
                text: 'Hello how are you?',
                date: '01:20 PM',
            },
            {
                text: <div>I'm fine, how are you <span role="img" aria-label="xxx">😃</span></div>,
                date: '01:35 PM',
                type: 'outgoing-message'
            },
            {
                text: 'What are you doing this?',
                date: '01:20 PM',
            }
        ]
    },
    {
        id: 9,
        name: 'Gibb Ivanchin',
        avatar: <figure className="avatar">
            <span className="avatar-title bg-secondary rounded-circle">G</span>
        </figure>,
        text: <p>I want to visit them.</p>,
        date: '03:41 PM',
        messages: [
            {
                text: 'Hello how are you?',
                date: '01:20 PM',
            },
            {
                text: <div>I'm fine, how are you <span role="img" aria-label="xxx">😃</span></div>,
                date: '01:35 PM',
                type: 'outgoing-message'
            },
            {
                text: 'What are you doing this?',
                date: '01:20 PM',
            }
        ]
    },
    {
        id: 10,
        name: 'Harald Kowalski',
        avatar: <figure className="avatar">
            <img src={ManAvatar1} className="rounded-circle" alt="avatar"/>
        </figure>,
        text: <p>Reports are ready.</p>,
        date: '03:41 PM',
        messages: [
            {
                text: 'Hello how are you?',
                date: '01:20 PM',
            },
            {
                text: <div>I'm fine, how are you <span role="img" aria-label="xxx">😃</span></div>,
                date: '01:35 PM',
                type: 'outgoing-message'
            },
            {
                text: 'What are you doing this?',
                date: '01:20 PM',
            }
        ]
    },
    {
        id: 11,
        name: 'Afton McGilvra',
        avatar: <figure className="avatar">
            <span className="avatar-title bg-success rounded-circle">A</span>
        </figure>,
        text: <p>I do not know where is it. Don't ask me, please.</p>,
        date: '03:41 PM',
        messages: [
            {
                text: 'Hello how are you?',
                date: '01:20 PM',
            },
            {
                text: <div>I'm fine, how are you <span role="img" aria-label="xxx">😃</span></div>,
                date: '01:35 PM',
                type: 'outgoing-message'
            },
            {
                text: 'What are you doing this?',
                date: '01:20 PM',
            }
        ]
    },
    {
        id: 12,
        name: 'Alexandr Donnelly',
        avatar: <figure className="avatar">
            <img src={ManAvatar2} className="rounded-circle" alt="avatar"/>
        </figure>,
        text: <p>Can anyone enter the meeting?</p>,
        date: '03:41 PM',
        messages: [
            {
                text: 'Hello how are you?',
                date: '01:20 PM',
            },
            {
                text: <div>I'm fine, how are you <span role="img" aria-label="xxx">😃</span></div>,
                date: '01:35 PM',
                type: 'outgoing-message'
            },
            {
                text: 'What are you doing this?',
                date: '01:20 PM',
            }
        ]
    },
];
