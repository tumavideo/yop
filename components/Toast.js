import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function ToastMessage({
  daysago="11 mins ago",
  message="Woohoo, you're reading this text in a Toast!",
  title="Bootstrap"
}) {
  const [showToast, setShowToast] = useState(true);
  const toggleShowToast = () => setShowToast(!showToast);

  return (
    <Row className='middle-end'>
      <Col md={6} className="mb-2">
        <Toast show={showToast} onClose={toggleShowToast}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{title}</strong>
            <small>{daysago}</small>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}

export default ToastMessage;
