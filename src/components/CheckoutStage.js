import React from "react";
import { Nav } from "react-bootstrap";
const CheckoutStage = ({ children, disabled }) => {
  return (
    <div>
      <Nav.Item >
        <Nav.Link disabled={disabled} >{children}</Nav.Link>
    </Nav.Item>
    </div>
  );
};

export default CheckoutStage;
