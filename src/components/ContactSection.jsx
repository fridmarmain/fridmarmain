"use client";
import { motion } from "framer-motion";
import * as Icon from "lucide-react";
import { useState, useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { urlFor } from "@/lib/sanity";
import "../styles/ContactSection.css";

// We move validate inside the component file, but pass dynamic allowed lists to it
const validate = (formData, allowedServices, allowedSources) => {
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

  if (formData.service && !allowedServices.includes(formData.service))
    errors.service = "Invalid service selection.";

  if (formData.source && !allowedSources.includes(formData.source))
    errors.source = "Invalid source selection.";

  if (!formData.message.trim() || formData.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";
  if (formData.message.length > 2000)
    errors.message = "Message is too long (max 2000 characters).";

  return errors;
};

const ContactSection = ({ sectionData }) => {
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

  // Custom visual configuration map fallbacks
  const headingRaw = sectionData?.heading || "Get In *Touch*";
  const subheading =
    sectionData?.subheading ||
    "The Fridmar Professional Corporation is happy to welcome its clients to its new office. For legal advice tailored to your circumstances and business, please contact us through the information below:";
  const displayAddress =
    sectionData?.locationAddress ||
    "242 Applewood Crescent, Unit 5-Ground\nConcord, ON L4K 4E5";
  const displayPhone = sectionData?.phone || "(647) 363-6704";
  const displayFax = sectionData?.fax || "(289) 807-0204";
  const formHeadingRaw = sectionData?.formHeading || "Get In *Touch*";
  const formSubheading =
    sectionData?.formSubheading ||
    "Fill out the form below to schedule a confidential initial consultation.";
  const displayEmail = sectionData?.email || "info@fridmar.com";
  const weekdayHours =
    sectionData?.hoursWeekdays || "Weekdays: 9:00 AM – 5:00 PM";

  const officeImgUrl = sectionData?.officeImage
    ? urlFor(sectionData.officeImage).url()
    : "/about/fridmaroffice.webp";
  const formImgUrl = sectionData?.formImage
    ? urlFor(sectionData.formImage).url()
    : "./about/aboutx.jpg";

  // Dynamic dropdown arrays mapping
  const servicesList = sectionData?.servicesOptions || [
    "Construction",
    "dispute",
    "litigation",
    "other",
  ];
  const sourcesList = sectionData?.sourcesOptions || [
    "Google Search",
    "Referral",
    "Social Media",
    "Website",
    "Other",
  ];

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
      if (formData._hp) return; // Silent discard bots

      // Pass the dynamic arrays to the validator to ensure it doesn't block valid CMS additions
      const validationErrors = validate(formData, servicesList, sourcesList);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setStatus("loading");

      let recaptchaToken = null;
      for (let attempt = 0; attempt < 6; attempt++) {
        if (executeRecaptcha) {
          try {
            recaptchaToken = await executeRecaptcha("contact_form");
            break;
          } catch {
            // token failed -> retry
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
    [formData, executeRecaptcha, servicesList, sourcesList],
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
          {/* Dynamic asterisk splitting for highlighted text */}
          <h2>
            {headingRaw.split("*").map((text, idx) =>
              idx % 2 === 1 ? (
                <span key={idx} className="highlight">
                  {text}
                </span>
              ) : (
                text
              ),
            )}
          </h2>
          <p>{subheading}</p>
        </div>

        <img className="offficeImg" src={officeImgUrl} alt="Office space" />

        <div className="office-info-grid">
          <div className="office-info-card">
            <div className="office-info-icon">
              <Icon.MapPin size={30} />
            </div>
            <div>
              <span className="office-info-label">Location</span>
              <p
                className="office-info-value"
                style={{ whiteSpace: "pre-line" }}
              >
                {displayAddress}
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
                href={`tel:${displayPhone.replace(/\D/g, "")}`}
                className="office-info-value office-info-link"
              >
                Phone: {displayPhone}
              </a>
              {displayFax && (
                <p className="office-info-value">Fax: {displayFax}</p>
              )}
              <a
                href={`mailto:${displayEmail}`}
                className="office-info-value office-info-link"
              >
                Mail: {displayEmail}
              </a>
            </div>
          </div>
          <div className="office-info-card">
            <div className="office-info-icon">
              <Icon.Clock size={30} />
            </div>
            <div>
              <span className="office-info-label">Office Hours</span>
              <p className="office-info-value">{weekdayHours}</p>
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
            src={formImgUrl}
            alt="Contact representative"
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
            {formHeadingRaw.split("*").map((text, idx) =>
              idx % 2 === 1 ? (
                <span key={idx} className="highlight">
                  {text}
                </span>
              ) : (
                text
              ),
            )}
          </h2>
          <p className="margBottom">{formSubheading}</p>
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
                  placeholder={sectionData?.namePlaceholder || "Your Name"}
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
                  placeholder={sectionData?.emailPlaceholder || "Your Email"}
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
                  placeholder={
                    sectionData?.phonePlaceholder || "Your Phone Number"
                  }
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
                  {servicesList.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </motion.select>
                {errors.service && (
                  <span className="error-text">{errors.service}</span>
                )}
              </div>
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
                style={{ width: "100%" }}
                viewport={{ once: true }}
              >
                <option value="">How did you hear about us?</option>
                {sourcesList.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </motion.select>
              {errors.source && (
                <span className="error-text">{errors.source}</span>
              )}
            </div>

            <div>
              <motion.textarea
                name="message"
                placeholder={sectionData?.messagePlaceholder || "Message"}
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
                    ? sectionData?.submitButtonSuccessText || "Message Sent!"
                    : status === "error"
                      ? "Try Again"
                      : sectionData?.submitButtonText || "Send Message"}
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
