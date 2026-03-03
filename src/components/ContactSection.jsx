"use client";
import { motion } from "framer-motion";
import * as Icon from "lucide-react";
import { useState } from "react";

const ALLOWED_SERVICES = ["", "Construction", "dispute", "litigation", "other"];

const validate = (formData) => {
  const errors = {};

  if (!formData.name.trim() || formData.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters.";
  if (formData.name.length > 100) errors.name = "Name is too long.";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email))
    errors.email = "Please enter a valid email address.";

  const phoneRegex = /^[\d\s\-+().]{7,20}$/;
  if (formData.phone && !phoneRegex.test(formData.phone))
    errors.phone = "Please enter a valid phone number.";

  if (formData.service && !ALLOWED_SERVICES.includes(formData.service))
    errors.service = "Invalid service selection.";

  if (!formData.message.trim() || formData.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";
  if (formData.message.length > 2000)
    errors.message = "Message is too long (max 2000 characters).";

  return errors;
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    _hp: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const maxLengths = {
      name: 100,
      email: 254,
      phone: 20,
      service: 50,
      message: 2000,
    };
    if (value.length > (maxLengths[name] ?? 2000)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
          _hp: "",
        });
        setErrors({});
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        const data = await response.json();
        setStatus("error");
        setErrors({ server: data.message || "Something went wrong." });
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      setErrors({ server: "Network error. Please try again." });
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contactSection" className="contact-section container">
      <h1 style={{ textAlign: "left", width: "100%" }}>
        REQUEST A CONSULTATION
      </h1>
      <p style={{ textAlign: "left", width: "100%" }}>
        Fill out the form below to schedule a confidential initial consultation.
      </p>

      <div className="contact-container">
        <motion.div
          className="contact-image-wrapper"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src="./about/aboutx.jpg"
            alt="Dan Fridmar"
            className="contact-image"
          />
        </motion.div>

        <motion.div
          className="contact-form-wrapper"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="contact-title">
            Get In <span className="highlight">Touch</span>
          </h2>

          {errors.server && (
            <p style={{ color: "red", marginBottom: "1rem" }}>
              {errors.server}
            </p>
          )}

          <form onSubmit={handleSubmit} className="contact-form" noValidate>
            {/* Honeypot — inside form, wired to state, hidden from real users */}
            <input
              type="text"
              name="_hp"
              value={formData._hp}
              onChange={handleChange}
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="form-grid">
              <div>
                <motion.input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? "input-error" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                />
                {errors.name && (
                  <span className="error-text">{errors.name}</span>
                )}
              </div>

              <div>
                <motion.input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? "input-error" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>

              <div>
                <motion.input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-input ${errors.phone ? "input-error" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                />
                {errors.phone && (
                  <span className="error-text">{errors.phone}</span>
                )}
              </div>

              <div>
                <motion.select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`form-input form-select ${errors.service ? "input-error" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <option value="">Type of service</option>
                  <option value="Construction">Construction</option>
                  <option value="dispute">Dispute</option>
                  <option value="litigation">Litigation</option>
                  <option value="other">Other</option>
                </motion.select>
                {errors.service && (
                  <span className="error-text">{errors.service}</span>
                )}
              </div>
            </div>

            <div>
              <motion.textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className={`form-textarea ${errors.message ? "input-error" : ""}`}
                rows={6}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {errors.message ? (
                  <span className="error-text">{errors.message}</span>
                ) : (
                  <span />
                )}
                <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>
                  {formData.message.length}/2000
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="secondaryBtn"
              disabled={status === "loading" || status === "success"}
              style={{
                opacity: status === "loading" || status === "success" ? 0.6 : 1,
                cursor: status === "loading" ? "not-allowed" : "pointer",
              }}
            >
              <div>
                {status === "loading"
                  ? "Sending..."
                  : status === "success"
                    ? "Message Sent!"
                    : status === "error"
                      ? "Try Again"
                      : "Send Message"}
              </div>
              <div className="iconBall">
                {status === "loading" ? (
                  <Icon.Loader2 className="animate-spin" />
                ) : status === "success" ? (
                  <Icon.Check />
                ) : status === "error" ? (
                  <Icon.AlertCircle />
                ) : (
                  <Icon.ArrowUpRight />
                )}
              </div>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
