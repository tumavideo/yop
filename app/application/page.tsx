'use client';

import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { JOB_APP } from "../api";

const districts = [
  {
    name: "Choma",
    constituencies: [
      "Bweengwa",
      "Choma Central",
      "Choma North",
      "Choma South",
      "Mapatizya",
      "Nanzhila",
      "Sinazongwe",
      "Siamunene",
    ],
  },
  {
    name: "Kalomo",
    constituencies: [
      "Chikankata",
      "Dundumwezi",
      "Mazabuka Central",
      "Sikongo",
      "Simonga",
      "Sioma",
      "Sipatunyana",
    ],
  },
  {
    name: "Kasama",
    constituencies: [
      "Chilubi",
      "Kaputa",
      "Kasama Central",
      "Kasama South",
      "Luwingu",
      "Mporokoso",
      "Nkolemfumu",
      "Zambezi",
    ],
  },
  {
    name: "Lusaka",
    constituencies: [
      "Chawama",
      "Chilenje",
      "Kabwata",
      "Kafue",
      "Kanyama",
      "Lusaka Central",
      "Mandevu",
      "Matero",
      "Mumbwa",
      "Ngabwe",
      "Pemba",
      "Shibuyunji",
    ],
  },
  {
    name: "Ndola",
    constituencies: [
      "Chifubu",
      "Kabwe Central",
      "Kamfinsa",
      "Kansenji",
      "Matero East",
      "Matero North",
      "Matero West",
      "Mufumbwe",
      "Ndola Central",
      "Ndola East",
      "Ndola North",
      "Ndola Rural",
      "Ndola West",
    ],
  },
];

export default function Application({ user = {} }) {
  const [validated, setValidated] = useState(false);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    about: "",
    resume: "",
    gender: "",
    disabled: false,
    dob: "",
    NRCNumber: "",
    physicalAddress: "",
    district: "",
    constituency: "",
    nextOfKin: {
      name: "",
      mobileNumber: "",
      physicalAddress: "",
    },
  });

  const router = useRouter();

  const { loanId, jobId } = router.query;

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return false;
    }
    setValidated(true);

    axios
      .post(JOB_APP, {
        ...values,
        name: values.firstName + " " + values.lastName,
        jobId: jobId,
      })
      .then(async (response) => {
        console.log(response.data.payload);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      })
      .finally(() => console.log("done"));
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setValues((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };

  const handleNextOfKinInputChange = (event) => {
    const { name, value } = event.target;
    setValues((prevFormData) => ({
      ...prevFormData,
      nextOfKin: {
        ...prevFormData.nextOfKin,
        [name]: value,
      },
    }));
  };

  const [district, setDistrict] = useState("");
  const [constituency, setConstituency] = useState("");

  const handleDistrictChange = (e) => {
    const selectedDistrict = districts.find(
      (district) => district.name === e.target.value
    );
    setDistrict(e.target.value);
    setConstituency(selectedDistrict.constituencies[0]);
  };

  return (
    <div className="container">
      <div className="row">
        <Form
          className="mt-5"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Row>
            <Col>
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
              {!loanId && (
                <Button className="mt-4" variant="primary" type="submit">
                  Submit
                </Button>
              )}
            </Col>
            {loanId && (
              <Col xs={12} md={6}>
                <Form.Group className="mt-4" controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control as="select">
                    <option>Unselected</option>
                    <option>Male</option>
                    <option>Female</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mt-4">
                  <Form.Label>Disabled</Form.Label>
                  <Form.Check
                    type="checkbox"
                    label="Yes"
                    onChange={handleCheckboxChange}
                  />
                </Form.Group>
                <Form.Group className="mt-4">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    placeholder="Enter date of birth"
                  />
                </Form.Group>
                <Form.Group className="mt-4">
                  <Form.Label>NRC Number</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter NRC number"
                  />
                </Form.Group>
                <Form.Group className="mt-4">
                  <Form.Label>Physical Address</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter physical address"
                  />
                </Form.Group>
                <Form.Group className="mt-4">
                  <Form.Label>District</Form.Label>
                  <Form.Control
                    as="select"
                    value={district}
                    onChange={handleDistrictChange}
                  >
                    <option value="">-- Select District --</option>
                    {districts.map((district) => (
                      <option key={district.name} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mt-4">
                  <Form.Label>Constituency</Form.Label>
                  <Form.Control
                    as="select"
                    value={constituency}
                    onChange={(e) => setConstituency(e.target.value)}
                  >
                    {district &&
                      districts
                        .find((d) => d.name === district)
                        .constituencies.map((constituency) => (
                          <option key={constituency} value={constituency}>
                            {constituency}
                          </option>
                        ))}
                  </Form.Control>
                </Form.Group>
                <hr />
                <h4>Next of Kin</h4>
                <Form.Group className="mt-4">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter name"
                    onChange={handleNextOfKinInputChange}
                  />
                </Form.Group>
                <Form.Group className="mt-4">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    required
                    type="tel"
                    placeholder="Enter mobile number"
                    onChange={handleNextOfKinInputChange}
                  />
                </Form.Group>
                <Form.Group className="mt-4">
                  <Form.Label>Physical Address</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter physical address"
                    onChange={handleNextOfKinInputChange}
                  />
                </Form.Group>
                <Button className="mt-4" variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            )}
          </Row>
        </Form>
      </div>
    </div>
  );
}
