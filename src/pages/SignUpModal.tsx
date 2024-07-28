import React from "react";
import { Modal, Button } from "react-bootstrap";

interface SignUpModalProps {
  show: boolean;
  handleClose: () => void;
  message: string;
}

const SignUpModal: React.FC<SignUpModalProps> = ({
  show,
  handleClose,
  message,
}) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>알림</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SignUpModal;
