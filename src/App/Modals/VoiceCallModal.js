import React, {useState} from 'react'
import {Modal, ModalBody, Tooltip} from 'reactstrap'
import ManAvatar5 from "../../assets/img/man_avatar5.jpg"
import CallBg from "../../assets/img/call-bg.png"

function VoiceCallModal() {

    const [modal, setModal] = useState(false);

    const modalToggle = () => setModal(!modal);

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const tooltipToggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <div>
            <button className="btn btn-success" onClick={modalToggle} id="Tooltip-Voice-Call">
                <i className="fa fa-phone"></i>
            </button>
            <Tooltip
                placement="bottom"
                isOpen={tooltipOpen}
                target={"Tooltip-Voice-Call"}
                toggle={tooltipToggle}>
                Voice Call
            </Tooltip>
            <Modal isOpen={modal} toggle={modalToggle} centered className="call modal-dialog-zoom">
                <ModalBody>
                    <div className="call-background" style={{backgroundImage: "url(" + CallBg + ")"}}></div>
                    <div>
                        <figure className="avatar avatar-xl mb-4">
                            <img src={ManAvatar5} className="rounded-circle" alt="avatar"/>
                        </figure>
                        <h4>Brietta Blogg <span className="text-success">calling...</span></h4>
                        <div className="action-button">
                            <button type="button" onClick={modalToggle}
                                    className="btn btn-danger btn-floating btn-lg"
                                    data-dismiss="modal">
                                <i className="ti ti-close"></i>
                            </button>
                            <button type="button" onClick={modalToggle}
                                    className="btn btn-success btn-pulse btn-floating btn-lg">
                                <i className="fa fa-phone"></i>
                            </button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default VoiceCallModal
