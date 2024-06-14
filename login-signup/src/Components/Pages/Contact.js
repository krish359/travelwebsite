import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import Navbar from '../Navbar/Navbar'
import './Contact.css'
// npm i @emailjs/browser

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_dc2xvtb",
        "template_z1gxyfg",
        form.current,
        {
          publicKey: '_Br83U_VWHu11ve0k',
        })
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <Navbar></Navbar>
    <div className='contact-container'>
      <h className="contact-heading">Contact Form</h>
      <div className="underlin"></div>
    <StyledContactForm>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" placeholder="Provide your Name"/>
        <label>Email</label>
        <input type="email" name="user_email" placeholder="Provide your Email"/>
        <label>Message</label>
        <textarea name="message" placeholder="Please specify your message in detail"/>
        <input type="submit" value="Send" />
      </form>
    </StyledContactForm>
    </div>
    </div>
  );
};

export default Contact;

// Styles
const StyledContactForm = styled.div`
  width: 400px;
  
  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 30px;
    color: white;

    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);
      font-size: 1.3rem;

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;
