"use client";
import { motion } from "framer-motion";
import * as Icon from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="contact-section">
      <h1>REQUEST A CONSULTATION</h1>

      <p>
        Fill out the form below to schedule a confidential initial consultation.
      </p>
      <div className="contact-container">
        <motion.div
          className="contact-image-wrapper"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src="https://images.pexels.com/photos/3777557/pexels-photo-3777557.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Professional businessman"
            className="contact-image"
          />
        </motion.div>

        <motion.div
          className="contact-form-wrapper"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="contact-title">
            Get In <span className="highlight">Touch</span>
          </h2>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-grid">
              <motion.input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              />

              <motion.input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              />

              <motion.input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              />

              <motion.select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="form-input form-select"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <option value="">Type of service</option>
                <option value="consulting">Consulting</option>
                <option value="development">Development</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="other">Other</option>
              </motion.select>
            </div>

            <motion.textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="form-textarea"
              rows={6}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            />

            <button className="  secondaryBtn">
              <div> Send Meassage</div>
              <div className="iconBall">
                <Icon.ArrowUpRight />
              </div>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
