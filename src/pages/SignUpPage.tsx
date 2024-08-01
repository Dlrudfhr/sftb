import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import logo from "../assets/images/rogo.png";

interface SignUpPageProps {
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onSubmit }) => {
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <img src={logo} alt="image" style={{ width: "50%", height: "auto" }} />
      </div>
      <h2>Started From The Bottom</h2>
      <Row className="mb-3">
        <Form.Group
          as={Col}
          controlId="formGridName"
          style={{
            marginBottom: "0.5rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Form.Label>이름</Form.Label>
          <Form.Control type="text" placeholder="Enter name" />
        </Form.Group>

        <Form.Group
          as={Col}
          controlId="formGridStudentId"
          style={{
            marginBottom: "0.5rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Form.Label>학번</Form.Label>
          <Form.Control type="text" placeholder="Enter student ID" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group
          as={Col}
          controlId="formGridUsername"
          style={{
            marginBottom: "0.5rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Form.Label>아이디</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>

        <Form.Group
          as={Col}
          controlId="formGridPassword"
          style={{
            marginBottom: "0.5rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password" placeholder="Enter password" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group
          as={Col}
          controlId="formGridEmail"
          style={{
            marginBottom: "0.5rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Form.Label>이메일</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Button variant="primary" type="submit">
        회원가입
      </Button>
    </Form>
  );
};

export default SignUpPage;
