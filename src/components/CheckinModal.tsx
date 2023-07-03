import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type Props = {
  show: boolean;
  callback: () => void;
  message: string;
};

const CheckinModal = (props: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    props.callback();
    setShow(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <Modal show={show} size="sm" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.message}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={handleClose}>Done</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckinModal;
