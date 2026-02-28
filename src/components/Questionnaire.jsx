"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icon from "lucide-react";
import "../styles/questionaire.css";

export default function IntakeFunnel() {
  const [step, setStep] = useState("START");
  const [history, setHistory] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [formVals, setFormVals] = useState({});

  const getFormVals = (stepName) => formVals[stepName] || {};
  const setStepFormVals = (stepName, vals) =>
    setFormVals((prev) => ({ ...prev, [stepName]: vals }));

  const goToStep = (nextStepId, currentSelection = null, key = null) => {
    if (key && currentSelection !== null) {
      setAnswers((prev) => ({ ...prev, [key]: currentSelection }));
    }
    setHistory((prev) => [...prev, step]);
    setStep(nextStepId);
  };

  const goBack = () => {
    const lastStep = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setStep(lastStep);
  };

  const submitBranch = (branchData, branchKey) => {
    setAnswers((prev) => ({ ...prev, [branchKey]: branchData }));
    goToStep("EXISTING_COUNSEL");
  };

  const handleFinalSubmit = async (finalAnswers) => {
    setSubmitStatus("loading");
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalAnswers),
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      setSubmitStatus("idle");

      if (data.isBooking && data.calendlyUrl) {
        window.location.href = data.calendlyUrl;
      } else {
        setStep("COMPLETED");
      }
    } catch {
      setSubmitStatus("error");
      setStep("COMPLETED");
    }
  };

  // Steps in order for progress bar
  const STEPS_ORDER = [
    "PERSONAL_DETAILS",
    "WHO",
    "URGENCY",
    "PRACTICE_AREA",
    "BRANCH_CONSTRUCTION",
    "BRANCH_BUSINESS",
    "BRANCH_REAL_ESTATE",
    "BRANCH_ENFORCEMENT",
    "BRANCH_UNSURE",
    "EXISTING_COUNSEL",
    "LAWYER_DETAILS",
    "CONFLICT_CHECK",
    "PROCEED_CHOICE",
  ];
  const totalSteps = 7; // approximate visible spine length
  const currentIndex = Math.min(history.length, totalSteps);

  return (
    <section
      id="intake"
      className="intake-funnel-section py-24 min-h-screen relative"
    >
      {/* Loading Overlay */}
      {submitStatus === "loading" && (
        <div className="funnel-loading-overlay">
          <Icon.Loader2
            className="animate-spin"
            size={28}
            color="var(--gold)"
          />
          <span className="funnel-loading-label">
            Submitting your information
          </span>
        </div>
      )}

      <div className="container mx-auto px-6 max-w-xl">
        {/* Progress bar */}
        {step !== "START" && step !== "COMPLETED" && (
          <div className="funnel-progress">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`funnel-progress-dot ${
                  i < currentIndex - 1
                    ? "done"
                    : i === currentIndex - 1
                      ? "active"
                      : ""
                }`}
              />
            ))}
          </div>
        )}

        {/* Back Button */}
        {step !== "START" && step !== "COMPLETED" && history.length > 0 && (
          <button onClick={goBack} className="funnel-back-btn">
            <Icon.ChevronLeft size={16} />
            Back
          </button>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* ── START ─────────────────────────────────────────── */}
            {step === "START" && (
              <div className="funnel-start-screen">
                <span className="funnel-eyebrow">Initial Consultation</span>
                <h2 className="funnel-title">
                  Let's see if we're the right legal team for you
                </h2>
                <span className="funnel-gold-rule" />
                <p className="funnel-start-tagline">
                  This short intake form helps us respond more efficiently.
                  <br />
                  It takes approximately 2 minutes to complete.
                </p>
                <button
                  onClick={() => goToStep("PERSONAL_DETAILS")}
                  className="funnel-start-btn"
                >
                  Begin
                  <Icon.ArrowRight size={15} />
                </button>
              </div>
            )}

            {/* ── PERSONAL DETAILS ──────────────────────────────── */}
            {step === "PERSONAL_DETAILS" && (
              <FormStep
                stepKey="PERSONAL_DETAILS"
                question="Before we begin"
                description="We'll use this to send you a confirmation and follow up with you directly."
                fields={[
                  { name: "name", label: "Your full name", type: "text" },
                  { name: "email", label: "Your email address", type: "email" },
                ]}
                savedVals={getFormVals("PERSONAL_DETAILS")}
                onSave={(vals) => setStepFormVals("PERSONAL_DETAILS", vals)}
                onSubmit={(data) => {
                  setAnswers((prev) => ({ ...prev, personalDetails: data }));
                  goToStep("WHO");
                }}
              />
            )}

            {/* ── WHO ───────────────────────────────────────────── */}
            {step === "WHO" && (
              <OptionStep
                question="Who are you reaching out as?"
                options={[
                  "Contractor / Subcontractor",
                  "Homeowner / Property Owner",
                  "Business Owner",
                  "Lender / Mortgagee",
                  "Another Law Firm",
                  "Other",
                ]}
                onSelect={(opt) => goToStep("URGENCY", opt, "clientType")}
              />
            )}

            {/* ── URGENCY ───────────────────────────────────────── */}
            {step === "URGENCY" && (
              <OptionStep
                question="Is your matter urgent?"
                description="This helps us prioritize our review of your submission."
                options={[
                  "Yes — there are deadlines",
                  "Possibly — I'm not sure",
                  "No — but I'd like advice",
                ]}
                onSelect={(opt) => goToStep("PRACTICE_AREA", opt, "urgency")}
              />
            )}

            {/* ── PRACTICE AREA ─────────────────────────────────── */}
            {step === "PRACTICE_AREA" && (
              <OptionStep
                question="What best describes your issue?"
                options={[
                  "Construction-related issue",
                  "Business or contract dispute",
                  "Real estate or property dispute",
                  "Enforcement, insolvency, or judgment-related issue",
                  "Unsure / not listed",
                ]}
                onSelect={(opt) => {
                  const map = {
                    "Construction-related issue": "BRANCH_CONSTRUCTION",
                    "Business or contract dispute": "BRANCH_BUSINESS",
                    "Real estate or property dispute": "BRANCH_REAL_ESTATE",
                    "Enforcement, insolvency, or judgment-related issue":
                      "BRANCH_ENFORCEMENT",
                    "Unsure / not listed": "BRANCH_UNSURE",
                  };
                  goToStep(map[opt], opt, "practiceArea");
                }}
              />
            )}

            {/* ── BRANCHES ──────────────────────────────────────── */}
            {step === "BRANCH_CONSTRUCTION" && (
              <FormStep
                stepKey="BRANCH_CONSTRUCTION"
                question="Construction-related issue"
                fields={[
                  {
                    name: "desc",
                    label: "Briefly describe what's going on",
                    type: "textarea",
                  },
                  {
                    name: "lien",
                    label: "Is a construction lien involved?",
                    type: "select",
                    options: ["Yes", "No", "Not sure"],
                  },
                  {
                    name: "value",
                    label: "Approximate project value (if known)",
                    type: "text",
                    optional: true,
                  },
                  {
                    name: "location",
                    label: "Project location (city/town)",
                    type: "text",
                  },
                  {
                    name: "parties",
                    label: "Names of main parties involved",
                    type: "text",
                  },
                  {
                    name: "started",
                    label: "Has any of the following started?",
                    type: "checkbox",
                    options: [
                      "Adjudication",
                      "Court proceeding",
                      "Demand letter sent",
                      "None yet",
                    ],
                  },
                ]}
                savedVals={getFormVals("BRANCH_CONSTRUCTION")}
                onSave={(vals) => setStepFormVals("BRANCH_CONSTRUCTION", vals)}
                onSubmit={(data) => submitBranch(data, "constructionDetails")}
              />
            )}

            {step === "BRANCH_BUSINESS" && (
              <FormStep
                stepKey="BRANCH_BUSINESS"
                question="Business or contract dispute"
                fields={[
                  {
                    name: "desc",
                    label: "Briefly describe the issue",
                    type: "textarea",
                  },
                  {
                    name: "value",
                    label: "Approximate value in dispute",
                    type: "text",
                  },
                  {
                    name: "location",
                    label: "Location of the dispute",
                    type: "text",
                  },
                  {
                    name: "parties",
                    label: "Names of the parties involved",
                    type: "text",
                    optional: true,
                  },
                  {
                    name: "deadlines",
                    label: "Aware of any deadlines?",
                    type: "select",
                    options: ["Yes", "Possibly", "Not sure"],
                  },
                  {
                    name: "litigationStarted",
                    label: "Has litigation/arbitration started?",
                    type: "text",
                    optional: true,
                    placeholder: "If yes, provide details...",
                  },
                ]}
                savedVals={getFormVals("BRANCH_BUSINESS")}
                onSave={(vals) => setStepFormVals("BRANCH_BUSINESS", vals)}
                onSubmit={(data) => submitBranch(data, "businessDetails")}
              />
            )}

            {step === "BRANCH_REAL_ESTATE" && (
              <FormStep
                stepKey="BRANCH_REAL_ESTATE"
                question="Real estate or property dispute"
                fields={[
                  {
                    name: "desc",
                    label: "Brief description of the issue",
                    type: "textarea",
                  },
                  {
                    name: "propertyType",
                    label: "Type of property",
                    type: "select",
                    options: ["Residential", "Commercial", "Mixed-use"],
                  },
                  {
                    name: "location",
                    label: "Location of the property",
                    type: "text",
                  },
                  {
                    name: "value",
                    label: "Approximate value involved",
                    type: "text",
                    optional: true,
                  },
                  {
                    name: "closed",
                    label: "Has the transaction closed?",
                    type: "select",
                    options: ["Yes", "No", "Not applicable"],
                  },
                  {
                    name: "litigation",
                    label: "Has litigation started?",
                    type: "text",
                    optional: true,
                    placeholder: "If yes, provide details...",
                  },
                ]}
                savedVals={getFormVals("BRANCH_REAL_ESTATE")}
                onSave={(vals) => setStepFormVals("BRANCH_REAL_ESTATE", vals)}
                onSubmit={(data) => submitBranch(data, "realEstateDetails")}
              />
            )}

            {step === "BRANCH_ENFORCEMENT" && (
              <FormStep
                stepKey="BRANCH_ENFORCEMENT"
                question="Enforcement or Insolvency"
                fields={[
                  {
                    name: "type",
                    label: "Are you enforcing or responding to a judgment?",
                    type: "text",
                  },
                  {
                    name: "desc",
                    label: "Brief description of the situation",
                    type: "textarea",
                  },
                  {
                    name: "value",
                    label: "Approximate value involved",
                    type: "text",
                    optional: true,
                  },
                  {
                    name: "insolvency",
                    label: "Insolvency or bankruptcy related issues?",
                    type: "select",
                    options: ["Yes", "Possibly", "No"],
                  },
                  {
                    name: "parties",
                    label: "Names of the parties involved",
                    type: "text",
                  },
                ]}
                savedVals={getFormVals("BRANCH_ENFORCEMENT")}
                onSave={(vals) => setStepFormVals("BRANCH_ENFORCEMENT", vals)}
                onSubmit={(data) => submitBranch(data, "enforcementDetails")}
              />
            )}

            {step === "BRANCH_UNSURE" && (
              <FormStep
                stepKey="BRANCH_UNSURE"
                question="Tell us more"
                description="Describe your situation in your own words and we'll direct you appropriately."
                fields={[
                  {
                    name: "desc",
                    label: "Describe your situation briefly",
                    type: "textarea",
                  },
                ]}
                savedVals={getFormVals("BRANCH_UNSURE")}
                onSave={(vals) => setStepFormVals("BRANCH_UNSURE", vals)}
                onSubmit={(data) => submitBranch(data, "otherDetails")}
              />
            )}

            {/* ── POST-BRANCH ────────────────────────────────────── */}
            {step === "EXISTING_COUNSEL" && (
              <OptionStep
                question="Are you currently working with another lawyer on this?"
                options={["Yes", "No", "Not sure"]}
                onSelect={(opt) => {
                  if (opt === "Yes")
                    goToStep("LAWYER_DETAILS", opt, "hasLawyer");
                  else goToStep("CONFLICT_CHECK", opt, "hasLawyer");
                }}
              />
            )}

            {step === "LAWYER_DETAILS" && (
              <FormStep
                stepKey="LAWYER_DETAILS"
                question="Current Counsel Details"
                fields={[
                  {
                    name: "firm",
                    label: "Name of lawyer / law firm",
                    type: "text",
                  },
                  {
                    name: "intent",
                    label: "I am...",
                    type: "checkbox",
                    options: [
                      "Seeking a second opinion",
                      "Considering transferring the file",
                      "Unsure and want guidance",
                    ],
                  },
                ]}
                savedVals={getFormVals("LAWYER_DETAILS")}
                onSave={(vals) => setStepFormVals("LAWYER_DETAILS", vals)}
                onSubmit={(data) =>
                  goToStep("CONFLICT_CHECK", data, "previousLawyer")
                }
              />
            )}

            {step === "CONFLICT_CHECK" && (
              <FormStep
                stepKey="CONFLICT_CHECK"
                question="Conflict Check"
                description="Please list the main parties involved so we can confirm there is no conflict of interest."
                fields={[
                  {
                    name: "yourOrg",
                    label: "Your company / organization",
                    type: "text",
                  },
                  {
                    name: "opposing",
                    label: "Opposing party / company",
                    type: "text",
                    optional: true,
                  },
                  {
                    name: "lender",
                    label: "Lender (if applicable)",
                    type: "text",
                    optional: true,
                  },
                  {
                    name: "others",
                    label: "Other parties involved",
                    type: "text",
                    optional: true,
                  },
                ]}
                savedVals={getFormVals("CONFLICT_CHECK")}
                onSave={(vals) => setStepFormVals("CONFLICT_CHECK", vals)}
                onSubmit={(data) =>
                  goToStep("PROCEED_CHOICE", data, "conflicts")
                }
              />
            )}

            {step === "PROCEED_CHOICE" && (
              <OptionStep
                question="How would you like to proceed?"
                description="We'll tailor our response based on your preference."
                options={[
                  "Book a confidential intake call",
                  "Submit this information for review and hear back first",
                ]}
                onSelect={(opt) => {
                  const finalAnswers = { ...answers, intent: opt };
                  setAnswers(finalAnswers);
                  handleFinalSubmit(finalAnswers);
                }}
              />
            )}

            {/* ── COMPLETED ─────────────────────────────────────── */}
            {step === "COMPLETED" && (
              <div className="funnel-complete">
                <div className="funnel-complete-icon">
                  <Icon.Check size={28} strokeWidth={1.5} />
                </div>
                <h2 className="funnel-complete-title">Thank you.</h2>
                <span className="funnel-gold-rule" />
                <p className="funnel-complete-body">
                  Our team will carefully review your submission — including any
                  time-sensitive matters and potential conflicts — and will be
                  in touch with you shortly. A confirmation has been sent to
                  your inbox.
                </p>
                {submitStatus === "error" && (
                  <p className="funnel-error-msg">
                    There was a problem saving your submission. Please contact
                    us directly if you don't hear back.
                  </p>
                )}
                <p className="funnel-legal-disclaimer">
                  Submitting this form does not create a solicitor-client
                  relationship. A relationship is only established once a
                  retainer agreement has been confirmed in writing.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ── OptionStep ─────────────────────────────────────────────── */
function OptionStep({ question, description, options, onSelect }) {
  return (
    <div className="funnel-step">
      <span className="funnel-eyebrow">Select one</span>
      <h3 className="funnel-title">{question}</h3>
      {description && <p className="funnel-description">{description}</p>}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.625rem",
          marginTop: "1.5rem",
        }}
      >
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className="option-btn"
          >
            <span>{opt}</span>
            <Icon.ChevronRight size={16} className="option-icon" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── FormStep ───────────────────────────────────────────────── */
function FormStep({
  stepKey,
  question,
  description,
  fields,
  savedVals,
  onSave,
  onSubmit,
}) {
  const [vals, setVals] = useState(savedVals || {});

  const updateVal = (name, value) => {
    const next = { ...vals, [name]: value };
    setVals(next);
    onSave(next);
  };

  const handleCheck = (name, opt) => {
    const current = vals[name] || [];
    const next = current.includes(opt)
      ? current.filter((i) => i !== opt)
      : [...current, opt];
    updateVal(name, next);
  };

  const isInvalid = fields.some((f) => {
    if (f.optional) return false;
    const value = vals[f.name];
    return !value || (Array.isArray(value) && value.length === 0);
  });

  return (
    <div className="funnel-step">
      <h3 className="funnel-title">{question}</h3>
      {description && <p className="funnel-description">{description}</p>}

      <div className="funnel-fields">
        {fields.map((f) => (
          <div key={f.name} className="field-group">
            <label className="field-label">
              {f.label}
              {!f.optional && <span className="required"> *</span>}
            </label>

            {f.type === "textarea" ? (
              <textarea
                className="funnel-input funnel-textarea"
                placeholder={f.placeholder}
                value={vals[f.name] || ""}
                onChange={(e) => updateVal(f.name, e.target.value)}
              />
            ) : f.type === "select" ? (
              <select
                className="funnel-input funnel-select"
                value={vals[f.name] || ""}
                onChange={(e) => updateVal(f.name, e.target.value)}
              >
                <option value="">Select an option</option>
                {f.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : f.type === "checkbox" ? (
              <div className="checkbox-grid">
                {f.options.map((o) => (
                  <label
                    key={o}
                    className={`checkbox-item ${vals[f.name]?.includes(o) ? "checked" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={vals[f.name]?.includes(o) || false}
                      onChange={() => handleCheck(f.name, o)}
                    />
                    {o}
                  </label>
                ))}
              </div>
            ) : (
              <input
                type={f.type === "email" ? "email" : "text"}
                placeholder={f.placeholder}
                className="funnel-input"
                value={vals[f.name] || ""}
                onChange={(e) => updateVal(f.name, e.target.value)}
              />
            )}
          </div>
        ))}

        <button
          onClick={() => !isInvalid && onSubmit(vals)}
          disabled={isInvalid}
          className={`funnel-submit-btn ${isInvalid ? "disabled" : ""}`}
        >
          {isInvalid ? "Please complete required fields" : "Continue"}
        </button>
      </div>
    </div>
  );
}

// CALENDLY_URL=https://calendly.com/your-link-here
