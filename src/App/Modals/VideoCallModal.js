import React, {useState} from 'react'
import {Modal, ModalBody, Tooltip} from 'reactstrap'
import WomenAvatar1 from "../../assets/img/women_avatar1.jpg"
import CallBg from "../../assets/img/call-bg.png"

function VideoCallModal() {
    const [modal, setModal] = useState(false);

    const modalToggle = () => setModal(!modal);

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const tooltipToggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <div>
            <button className="btn btn-secondary" onClick={modalToggle} id="Tooltip-Video-Call">
                <i className="fa fa-video-camera"></i>
            </button>
            <Tooltip
                placement="bottom"
                isOpen={tooltipOpen}
                target={"Tooltip-Video-Call"}
                toggle={tooltipToggle}>
                Video Call
            </Tooltip>
            <Modal isOpen={modal} toggle={modalToggle} centered className="modal-dialog-zoom call">
                <ModalBody>
                    <div className="call-background" style={{backgroundImage: "url(" + CallBg + ")"}}></div>
                    <div>
                        <figure className="avatar avatar-xl mb-4">
                            <img src={WomenAvatar1} className="rounded-circle" alt="avatar"/>
                        </figure>
                        <h4>Brietta Blogg <span className="text-success">video calling...</span></h4>
                        <div className="action-button">
                            <button type="button" onClick={modalToggle}
                                    className="btn btn-danger btn-floating btn-lg"
                                    data-dismiss="modal">
                                <i className="ti ti-close"></i>
                            </button>
                            <button type="button" onClick={modalToggle}
                                    className="btn btn-success btn-pulse btn-floating btn-lg">
                                <i className="fa fa-video-camera"></i>
                            </button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default VideoCallModal
