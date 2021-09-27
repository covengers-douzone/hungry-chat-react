import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {CopyBlock, dracula, CodeBlock, github, vs2015, rainbow} from "react-code-blocks";
import { sample, TopBar } from "../CodeBlock";
import Logo from "../CodeBlock/Logo"
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



function CodeBlockModal({modal,setModal}) {


    const [language, changeLanguage] = useState("jsx");
    const [languageDemo, changeDemo] = useState(sample["jsx"]);
    const [lineNumbers, toggleLineNumbers] = useState(true);

    let a  = " class HelloMessage extends React.Component {\n" +
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
        "); "

    const [codeBlockText , setCodeBlockText] = useState("");
    const [content, setContent] = useState("hello");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const height = window.outerHeight / 2




    // Create Button Event
    const modalToggle = () => {
        console.log("modalToggle" , modal)
        setModal(!modal)

    }

    const handleSubmit = ()  => {
        setModal(!modal)
    }

    const handleCodeBlockTextChange = (e) =>{
        setCodeBlockText(e.target.value);
    }

    useEffect( () => {

        console.log("!!")
    },[codeBlockText])

    // 방 제목 변경
    const ContentEvent = (e) => {
        setContent(e.target.value);
    }

    return (
        <div>
            <Modal style = {{minWidth : '50%' , minHeight : '100%' ,height : 'auto'}} className="modal-dialog-zoom" isOpen={modal} toggle={modalToggle} centered>
                <ModalHeader toggle={modalToggle}>
                    <i className="fa fa-users">
                    </i>  코드 블럭
                </ModalHeader>
                <ModalBody>
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
                    {/*<CodeBlock style = {{width : "100%" , height : height}}>*/}
                    {/*    language={language}*/}
                    {/*    text={languageDemo}*/}
                    {/*    showLineNumbers={lineNumbers}*/}
                    {/*    theme={dracula}*/}
                    {/*    wrapLines={true}*/}
                    {/*    codeBlock*/}
                    {/*</CodeBlock>*/}
                    <div>
                       

                    <textarea  onChange={handleCodeBlockTextChange} style = {{width : "48%" , height : height, float:"left", overflow:"auto", backgroundColor:"#282a36", color:"white", marginRight:"10px" }}/>
                    
                    <div  style={{float: "left" , width:"48%",height:height, overflow:"auto"}}>
                    <CopyBlock
                        language={language}
                        text={codeBlockText}
                        wrapLines={true}
                        theme={dracula}
                        showLineNumbers={lineNumbers}
                        codeBlock

                    />
                    </div>
                    
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
