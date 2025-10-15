import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Contact.scss';
import SectionHeading from '../SectionHeading/SectionHeading';
import { Icon } from '@iconify/react';
import SocialLinks from '../SocialLinks/SocialLinks';
import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";

const Contact = ({ data, socialData }) => {
  const [status, setStatus] = useState("");
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_puy5ynh", // your Service ID
        "template_3o0cyop", // your Template ID
        form.current,
        "kpKXw-yeg_G-8sePL" // your Public Key
      )
      .then(
        (result) => {
          console.log("Success:", result.text);
          // alert("Message sent successfully!");
          setStatus("Thank you for contacting me!");
          setTimeout(() => setStatus(""), 5000);
          form.current.reset(); // clear form after send
        },
        (error) => {
          console.error("Error:", error.text);
          // alert("Failed to send message. Check console for details.");
          setStatus("Something went wrong. Please try again.");
          setTimeout(() => setStatus(""), 5000);
        }
      );
  };
  const { title, text, subTitle } = data;
  return (
    <section id="contact" className="st-dark-bg">
      <div className="st-height-b100 st-height-lg-b80"></div>
      <SectionHeading title="Contact" />
      <div className="container" data-aos="fade-up" data-aos-duration="800" data-aos-delay="500">
        <div className="row d-flex">
          <div className="col-lg-6">
            <h3 className="st-contact-title">Just say Hello</h3>
            <div id="st-alert"></div>
            <form ref={form} onSubmit={sendEmail} className="st-contact-form" id="contact-form">
              <div className="st-form-field">
                <input type="text" id="name" name="name" placeholder="Your Name" required />
              </div>
              <div className="st-form-field">
                <input type="text" id="email" name="email" placeholder="Your Email" required />
              </div>
              <div className="st-form-field">
                <input type="text" id="subject" name="subject" placeholder="Your Subject" required />
              </div>
              <div className="st-form-field">
                <input type="tel" id="phone" name="phone" placeholder="Your Number" required />
              </div>
              <div className="st-form-field">
                <textarea cols="30" rows="10" id="msg" name="msg" placeholder="Your Message" required></textarea>
                <input type="hidden" name="time" value={new Date().toLocaleString()} />
                <div className="st-height-b0 st-height-lg-b30" id='success-message'>{status && <p>{status}</p>}</div>
              </div>
              <button className='st-btn st-style1 st-color1' type="submit" id="submit" name="submit">Send Message</button>
            </form>
          </div>
          <div className="col-lg-6">
            <div className="st-height-b0 st-height-lg-b40"></div>
            <h3 className="st-contact-title">{title}</h3>
            <div className="st-contact-text">{text}</div>
            <div className="st-contact-info-wrap">
              <div className="st-single-contact-info">
                <div className="st-icon-wrap">
                  <Icon icon="fa-regular:envelope" />
                </div>
                <div className="st-single-info-details">
                  <h4>Email</h4>
                  <Link to="mailto:hassandanyal18@gmail.com">hassandanyal18@gmail.com</Link>
                </div>
              </div>
              <div className="st-single-contact-info">
                <div className="st-icon-wrap">
                  <Icon icon="fa-solid:phone-alt" />
                </div>
                <div className="st-single-info-details">
                  <h4>Phone</h4>
                  <span><Link to="tel:+92-3132453790"> +92-3132453790</Link></span>
                </div>
              </div>
              <div className="st-single-contact-info">
                <div className="st-icon-wrap">
                  <Icon icon="mdi:location" />
                </div>
                <div className="st-single-info-details">
                  <h4>Address</h4>
                  <span>Gulshan-e-iqbal Karachi Pakistan</span>
                </div>
              </div>
              <div className="st-social-info">
                <div className="st-social-text">{subTitle}</div>
                <SocialLinks data={socialData} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="st-height-b100 st-height-lg-b80"></div>
    </section>
  )
}

Contact.propTypes = {
  data: PropTypes.object,
  socialData: PropTypes.array,
}

export default Contact;
