import React, { useState } from "react";
import axios from "axios";
import { SUBSCRIBE_URL } from "../../api";

const Subscribe = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const err = validateForm();
    if (Object.keys(err).length > 0) {
      setErrors(err);
    } else {
      // Submit form data to backend
      setSubmitting(true);
      axios
          .post(SUBSCRIBE_URL, { name, email, mobile })
          .then(async (response) => {
            setName("");
            setEmail("");
            setMobile("");
            alert(response.data.payload);
          })
          .catch((e) => {
            alert(e.response.data["error"]);
          })
          .finally(() => setSubmitting(false));
    }
  };

  const validateForm = () => {
    let err = {};
    if (!name) err.name = "Name is required";
    if (!email) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) err.email = "Invalid email address";
    if (!mobile) err.mobile = "Phone is required";
    else if (!/^\d{10}$/.test(mobile)) err.mobile = "Invalid phone number";
    return err;
  };

  return (
      <section id="subscribe">
        <div className="container">
          <h1>Stay Updated</h1>
          <p>
            Enter your full name, email and mobile mobile to receive the latest
            news and to learn about opportunities update.
          </p>
          <form onSubmit={handleSubscribe.bind()}>
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                    className="form-control"
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    required
                />
                {errors.name && <p>{errors.name}</p>}
              </div>

              <div className="col-md-4">
                <label htmlFor="mobile" className="form-label">
                  Mobile Number
                </label>
                <input
                    className="form-control"
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter mobile number"
                    required
                />
                {errors.mobile && <p>{errors.mobile}</p>}
              </div>

              <div className="col-md-4">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                    className="form-control"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    required
                />
                {errors.email && <p>{errors.email}</p>}
              </div>
            </div>

            {submitting ? (
                <button disabled>Please Wait</button>
            ) : (
                <button>Submit Now</button>
            )}
          </form>
        </div>
      </section>
  );
};

export default Subscribe;
