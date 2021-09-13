import React, {useState} from 'react'
import {
    Modal,
    ModalBody,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    ModalHeader,
    Input,
    InputGroupAddon,
    InputGroup,
    InputGroupText,
    CustomInput
} from 'reactstrap'
import classnames from 'classnames'
import ManAvatar3 from '../../assets/img/man_avatar3.jpg'

function EditProfileModal(props) {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    return (
        <div>
            <Modal isOpen={props.modal} toggle={props.toggle} centered className="modal-dialog-zoom">
                <ModalHeader toggle={props.toggle}>
                    <i className="ti ti-pencil"></i> 프로필 수정
                </ModalHeader>
                <ModalBody>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                href="#/"
                                className={classnames({active: activeTab === '1'})}
                                onClick={() => {
                                    toggle('1');
                                }}
                            >
                                Personal
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                href="#/"
                                className={classnames({active: activeTab === '2'})}
                                onClick={() => {
                                    toggle('2');
                                }}
                            >
                                About
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                href="#/"
                                className={classnames({active: activeTab === '3'})}
                                onClick={() => {
                                    toggle('3');
                                }}
                            >
                                Social Links
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Form>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <FormGroup>
                                    <Label for="fullname">Fullname</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ti ti-user"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" name="fullname" id="fullname"/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="avatar">Avatar</Label>
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <figure className="avatar mr-3 item-rtl">
                                                <img src={ManAvatar3} className="rounded-circle" alt="avatar"/>
                                            </figure>
                                        </div>
                                        <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile"/>
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="city">City</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ti ti-map-alt"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" name="city" id="city" placeholder="Ex: Columbia"/>
                                    </InputGroup>
                                </FormGroup>
                                {/*<FormGroup>
                                    <Label for="phone">Phone</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ti ti-mobile"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" name="phone" id="phone" placeholder="(555) 555 55 55"/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="phone">Website</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ti ti-link"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" name="website" id="website" placeholder="https://"/>
                                    </InputGroup>
                                </FormGroup>
                            </TabPane>
                            <TabPane tabId="2">
                                <FormGroup>
                                    <Label for="about">Write a few words that describe you</Label>
                                    <Input type="textarea" name="about" id="about"/>
                                </FormGroup>
                                <FormGroup>
                                    <CustomInput type="checkbox" id="customCheckbox1" label="View profile"
                                                 defaultChecked/>
                                </FormGroup>
                            </TabPane>
                            <TabPane tabId="3">
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-facebook">
                                                <i className="fa fa-facebook"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" name="facebook" id="facebook" placeholder="Username"/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-twitter">
                                                <i className="fa fa-twitter"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" name="twitter" id="twitter" placeholder="Username"/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-instagram">
                                                <i className="fa fa-instagram"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" name="instagram" id="instagram" placeholder="Username"/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-linkedin">
                                                <i className="fa fa-linkedin"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" name="linkedin" id="linkedin" placeholder="Username"/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-dribbble">
                                                <i className="fa fa-dribbble"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" name="dribbble" id="dribbble" placeholder="Username"/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-youtube">
                                                <i className="fa fa-youtube"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" name="youtube" id="youtube" placeholder="Username"/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-google">
                                                <i className="fa fa-google"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" name="google" id="google" placeholder="Username"/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText className="bg-whatsapp">
                                                <i className="fa fa-whatsapp"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" name="whatsapp" id="whatsapp" placeholder="Username"/>
                                    </InputGroup>
                                </FormGroup>*/}
                            </TabPane>
                        </TabContent>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary">Save</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default EditProfileModal
