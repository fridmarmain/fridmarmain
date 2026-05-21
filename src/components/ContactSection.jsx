"use client";
import { motion } from "framer-motion";
import * as Icon from "lucide-react";
import { useState, useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import "../styles/ContactSection.css";

const ALLOWED_SERVICES = ["", "Construction", "dispute", "litigation", "other"];
const ALLOWED_SOURCES = [
  "",
  "Google Search",
  "Referral",
  "Social Media",
  "Website",
  "Other",
];

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
  if (formData.source && !ALLOWED_SOURCES.includes(formData.source))
    errors.source = "Invalid source selection.";
  if (!formData.message.trim() || formData.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";
  if (formData.message.length > 2000)
    errors.message = "Message is too long (max 2000 characters).";
  return errors;
};

const ContactSection = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    source: "",
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
      source: 100,
      message: 2000,
    };
    if (value.length > (maxLengths[name] ?? 2000)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const validationErrors = validate(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setStatus("loading");

      // Wait up to 3s for reCAPTCHA to become ready
      let recaptchaToken = null;
      for (let attempt = 0; attempt < 6; attempt++) {
        if (executeRecaptcha) {
          try {
            recaptchaToken = await executeRecaptcha("contact_form");
            break;
          } catch {
            // token generation failed — retry
          }
        }
        await new Promise((res) => setTimeout(res, 500));
      }

      if (!recaptchaToken) {
        setStatus("error");
        setErrors({
          server: "reCAPTCHA failed to load. Please refresh and try again.",
        });
        setTimeout(() => setStatus("idle"), 4000);
        return;
      }

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, recaptchaToken }),
        });

        if (response.ok) {
          setStatus("success");
          setFormData({
            name: "",
            email: "",
            phone: "",
            service: "",
            source: "",
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
    },
    [formData, executeRecaptcha],
  );

  return (
    <section id="contactSection" className="contact-section container">
      <motion.div
        className="office-info-wrapper"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="contactHeader">
          <h2>Your Legal Strategy Starts Here</h2>
          <p>
            The Fridmar Professional Corporation is happy to welcome its clients
            to its new office. For legal advice tailored to your circumstances
            and business, please contact us through the information below:
          </p>
        </div>

        <img className="offficeImg" src="/about/fridmaroffice.webp" />

        <div className="office-info-grid">
          <div className="office-info-card">
            <div className="office-info-icon">
              <Icon.MapPin size={30} />
            </div>
            <div>
              <span className="office-info-label">Location</span>
              <p className="office-info-value">
                242 Applewood Crescent, Unit 5-Ground
                <br />
                Concord, ON L4K 4E5
              </p>
            </div>
          </div>
          <div className="office-info-card">
            <div className="office-info-icon">
              <Icon.Phone size={30} />
            </div>
            <div>
              <span className="office-info-label">Contact</span>
              <a
                href="tel:6473636704"
                className="office-info-value office-info-link"
              >
                Phone: (647) 363-6704
              </a>
              <p className="office-info-value">Fax: (289) 807-0204</p>
              <a
                href="mailto:info@fridmar.com"
                className="office-info-value office-info-link"
              >
                Mail: info@fridmar.com
              </a>
            </div>
          </div>
          <div className="office-info-card">
            <div className="office-info-icon">
              <Icon.Clock size={30} />
            </div>
            <div>
              <span className="office-info-label">Office Hours</span>
              <p className="office-info-value">Weekdays: 9:00 AM – 5:00 PM</p>
              <p className="office-info-value">Saturday: Closed</p>
              <p className="office-info-value">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </motion.div>

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
          <p className="margBottom">
            Fill out the form below to schedule a confidential initial
            consultation.
          </p>

          {errors.server && (
            <p style={{ color: "red", marginBottom: "1rem" }}>
              {errors.server}
            </p>
          )}

          <form onSubmit={handleSubmit} className="contact-form" noValidate>
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
              <div>
                <motion.select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className={`form-input form-select ${errors.source ? "input-error" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <option value="">How did you hear about us?</option>
                  <option value="Google Search">Google Search</option>
                  <option value="Referral">Referral</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Website">Website</option>
                  <option value="Other">Other</option>
                </motion.select>
                {errors.source && (
                  <span className="error-text">{errors.source}</span>
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
                transition={{ duration: 0.5, delay: 0.7 }}
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
