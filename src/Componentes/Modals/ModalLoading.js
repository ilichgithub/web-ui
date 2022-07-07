import React from "react";
import { Modal, ModalBody } from "reactstrap";

import "./ModalLoading.css";

const ModalLoading = (props) => {
  return (
    <Modal
      isOpen={props.modalListarLoading}
      fade={true}
      className="modal-dialog-centered"
    >
      <ModalBody>
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
        <div className="text-center">
          <strong>Buscando...</strong>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalLoading;
