import React, {useEffect, useState} from 'react';
import {CopyBlock, dracula} from "react-code-blocks";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another
import {sample, TopBar} from "../CodeBlock";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Tooltip,
    Form,
    FormGroup,
    Label,
    Input,
    InputGroup, Dropdown, DropdownMenu, DropdownItem, DropdownToggle,
} from 'reactstrap';

import userEvent from '@testing-library/user-event';

import myFetch from "../Module/fetchApi";
import {useSelector} from "react-redux";
import dark from "react-syntax-highlighter/dist/cjs/styles/hljs/dark";


function CodeBlockModal({modal, setModal}) {

    const {roomNo} = useSelector(state => state);
    const {participantNo} = useSelector(state => state);
    const {headCount} = useSelector(state => state)
    const {codeBlock} = useSelector(state => state)
    const {sendOk} = useSelector(state => state)

    const [language, changeLanguage] = useState("jsx");
    const [languageDemo, changeDemo] = useState(sample["jsx"]);
    const [lineNumbers, toggleLineNumbers] = useState(true);



    const [text, setText] = useState("");
    const [codeBlockText, setCodeBlockText] = useState(" class HelloMessage extends React.Component {\n" +
        "  handlePress = () => {\n" +
        "    alert('Hello')\n" +
        "  }\n" +
        "  render() {\n" +
        "    return (\n" +
        "      <div>\n" +
        "        <p>Hello {this.props.name}</p>\n" +
        "        <button onClick={this.handlePress}>Say Hello</button>\n" +
        "      </div>\n" +
        "    );\n" +
        "  }\n" +
        "}\n" +
        "\n" +
        "ReactDOM.render(\n" +
        "  <HelloMessage name=\"Taylor\" />, \n" +
        "  mountNode \n" +
        "); ");
    const [content, setContent] = useState("hello");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const height = window.outerHeight / 2


    // Create Button Event
    const modalToggle = () => {
        console.log("modalToggle", modal)
        setModal(!modal)

    }

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("file", null);
        formData.append("roomNo", roomNo);
        formData.append("participantNo", participantNo);
        formData.append("headCount", headCount);
        formData.append("text", "```" + language + "\n" + codeBlockText + "\n```");
        formData.append("markDown", "true");
        formData.append("codeBlock", codeBlock)
        formData.append("Authorization", localStorage.getItem("Authorization"));
        myFetch(null, null).send(formData);
        setCodeBlockText("");
        setModal(!modal)
    }

    const handleCodeBlockTextChange = (e) => {

        setCodeBlockText(e.target.value)
    }

    useEffect(() => {


    }, [codeBlockText])

    // 방 제목 변경
    const ContentEvent = (e) => {
        setContent(e.target.value);
    }

    return (
        <div>

            <Modal style = {{minWidth : '75%' , minHeight : '100%'}}
                   className="modal-dialog-zoom" isOpen={modal} onRequestClose={(e) => {
                setModal(true)
            }
            } centered>
                <ModalHeader toggle={modalToggle}>
                    <i className="fa fa-users">
                    </i> 코드 블럭
                </ModalHeader>

                <ModalBody >
                    <div className="container mx-auto p-4" >
                        <TopBar
                            language={{
                                value: language,
                                onChange: e => {
                                    // content(e.tar.value)
                                    changeDemo(sample[e.target.value]);
                                    return changeLanguage(e.target.value);
                                },
                                options: Object.keys(sample).map(lang => (
                                    <option key={lang} value={lang}>
                                        {lang}
                                    </option>
                                ))
                            }}
                            toggle={{
                                checked: lineNumbers,
                                onChange: e => toggleLineNumbers(!lineNumbers)
                            }}
                        />
                        <Editor
                            value={codeBlockText}
                            onValueChange={(code) => setCodeBlockText(code)}
                            highlight={(code) => highlight(code, languages.js)}
                            padding={10}
                            style={{
                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                fontSize: 12,
                                borderWidth : 3
                            }}
                        />


                    </div>

                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>코드 호출!!</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default CodeBlockModal
