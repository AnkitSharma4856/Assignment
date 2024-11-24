import React, { useState } from 'react';
import axios from 'axios';
import API_ENDPOINTS from '../apiConfig';

const Registration = () => {

  const [ errors, setErrors ] = useState({});
  const [ loading, setLoading ] = useState(false);
  const [ responseMessage, setResponseMessage ] = useState("");
  const [ formData, setFormData ] = useState({
    name: "",
    email: "",
    mobile: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const newErrors = { ...errors };
    if(!value) {
      newErrors[name] = `${ name } is required`;
    } else {
      newErrors[name] = "";
    }
    setErrors(newErrors);

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = formValidationMiddleWare(formData);
    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {

      setLoading(true);
      setResponseMessage("");
      console.log("form data ==", formData);

      const response = await axios.post(API_ENDPOINTS.CREATE_USER, formData);
      if(response.data.success){
        setResponseMessage("Form submitted successfully");
      } else {
        setResponseMessage(response.data.message);
      }

    } catch(error) {
      console.log("Error in post the data == ", error);
      setResponseMessage("Form faild to submit please try again");
    } finally {
      setLoading(false);
    }

    return false;
  }

  const formValidationMiddleWare = (formData) => {
    const errors = {};
    if(!formData.name) {
      errors.name = "Name is required";
    } else if (/[^a-zA-Z\s]/.test(formData.name)) {
      errors.name = "Name must not contain special characters or numbers";
    }
    if(!formData.email) {
      errors.email = "Valid email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if(!formData.mobile || !/^\+?[0-9]{1,3}?[ -]?([0-9]{10})$/.test(formData.mobile)) {
      errors.mobile = "Please enter valid mobile number";
    }
    return errors;
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
        <h2>User Form</h2>

        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          { errors.name && <p style={{ color: "red" }}> {errors.name} </p> }
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          { errors.email && <p style={{ color: "red" }}> {errors.email} </p> }
        </div>

        <div>
          <label>Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
          { errors.mobile && <p style={{ color: "red" }}> {errors.mobile} </p> }
        </div>
        
        <button type="submit">
          { loading ? "Submitting...." : "Submit"  }
        </button>
        { responseMessage && <p>{ responseMessage }</p> }
      </form>
    </>
  );
}

export default Registration;
