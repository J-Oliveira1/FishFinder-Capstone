import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "./NavBar.css";

const Navigation = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Navbar
      fixed="top"
      bg="success"
      variant="light"
      className="justify-content-between"
    >
      <Container>
        <Navbar.Brand style={{ fontSize: "2rem", marginRight: "5rem" }}>
          FishFinder
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/fishingholes">Fishing Holes</Nav.Link>
        </Nav>
        {user ? (
          <Button
            className="navBar"
            variant="success"
            style={{
              background: "black",
              borderColor: "black",
              color: "white",
            }}
            onClick={logoutUser}
          >
            Logout
          </Button>
        ) : (
          <Button
            className="navBar"
            variant="success"
            style={{
              background: "black",
              borderColor: "black",
              color: "white",
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Navigation;
