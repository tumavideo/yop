import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { JOB_APP } from "../api";

export default function Application({ user = {} }) {
  const [validated, setValidated] = useState(false);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    about: "",
    resume: "",
  });

  const router = useRouter();

  const { jobId } = router.query;

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    axios
      .post(JOB_APP, {
        ...values,
        name: values.firstName + " " + values.lastName,
        jobId: jobId,
      })
      .then(async (response) => {
        console.log(response);
      })
      .catch((e) => console.log(e))
      .finally(() => console.log("done"));
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <Form
            className="mt-5"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Group className="mt-4" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={values["firstName"]}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your first name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-4" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter last name"
                name="lastName"
                value={values["lastName"]}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your last name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-4" controlId="formPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                required
                type="tel"
                placeholder="Enter phone number"
                name="mobile"
                value={values["mobile"]}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid phone number.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-4" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                name="email"
                value={values["email"]}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-4" controlId="formAbout">
              <Form.Label>About You</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                maxLength={250}
                placeholder="Tell us about yourself"
                name="about"
                value={values["about"]}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4" controlId="formResume">
              <Form.Label>Resume</Form.Label>
              <Form.Control
                required
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Please upload your resume.
              </Form.Control.Feedback>
            </Form.Group>
            <Button className="mt-4" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className="col-md-6">
          <img
            src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
