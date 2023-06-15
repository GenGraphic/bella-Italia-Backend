import React from 'react';
import Nav from 'react-bootstrap/Nav';

const Menu = () => {

  return (
    <Nav variant="pills">
      <Nav.Item>
        <Nav.Link href="/admin_panel" >Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#/adminShop">Shop</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#/Rechnung">Rechnungen</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='/admin_panel'>Abmelden</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Menu;
