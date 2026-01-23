"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icon from "lucide-react";
import "../styles/questionaire.css";

export default function IntakeFunnel() {
  const [step, setStep] = useState("START");
  const [history, setHistory] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Navigation Logic
  const goToStep = (nextStepId, currentSelection = null, key = null) => {
    if (key && currentSelection) {
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

  return (
    <section className="py-24 bg-slate-900 text-white min-h-[800px] relative">
      <div className="container mx-auto px-6 max-w-2xl">
        {!isCompleted && step !== "START" && (
          <button
            onClick={goBack}
            className="mb-8 flex items-center gap-2 text-slate-400 hover:text-gold transition-colors"
          >
            <Icon.ChevronLeft size={20} /> Back
          </button>
        )}

        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              {step === "START" && (
                <div className="text-center">
                  <h2 className="text-4xl font-serif mb-6">
                    Let’s see if we’re the right legal team for you
                  </h2>
                  <p className="text-slate-400 mb-10">
                    This short form helps us respond more efficiently (approx. 2
                    mins).
                  </p>
                  <button
                    onClick={() => setStep("WHO")}
                    className="bg-gold text-black px-12 py-4 rounded-full font-bold"
                  >
                    Start
                  </button>
                </div>
              )}

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

              {step === "URGENCY" && (
                <OptionStep
                  question="Is your matter urgent?"
                  description="This helps us prioritize our review."
                  options={[
                    "Yes — there are deadlines",
                    "Possibly — I’m not sure",
                    "No — but I’d like advice",
                  ]}
                  onSelect={(opt) => goToStep("PRACTICE_AREA", opt, "urgency")}
                />
              )}

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

              {/* --- BRANCHES --- */}
              {step === "BRANCH_CONSTRUCTION" && (
                <FormStep
                  question="Construction-related issue"
                  fields={[
                    {
                      name: "desc",
                      label: "Briefly describe what’s going on",
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
                  onSubmit={(data) => submitBranch(data, "constructionDetails")}
                />
              )}

              {step === "BRANCH_BUSINESS" && (
                <FormStep
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
                      label: "Optional: Names of the parties involved",
                      type: "text",
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
                      placeholder: "If Yes, provide details...",
                    },
                  ]}
                  onSubmit={(data) => submitBranch(data, "businessDetails")}
                />
              )}

              {step === "BRANCH_REAL_ESTATE" && (
                <FormStep
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
                      placeholder: "If Yes, provide details...",
                    },
                  ]}
                  onSubmit={(data) => submitBranch(data, "realEstateDetails")}
                />
              )}

              {step === "BRANCH_ENFORCEMENT" && (
                <FormStep
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
                  onSubmit={(data) => submitBranch(data, "enforcementDetails")}
                />
              )}

              {step === "BRANCH_UNSURE" && (
                <FormStep
                  question="Tell us more"
                  fields={[
                    {
                      name: "desc",
                      label: "Describe your situation briefly",
                      type: "textarea",
                    },
                  ]}
                  onSubmit={(data) => submitBranch(data, "otherDetails")}
                />
              )}

              {/* --- POST-BRANCH --- */}
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
                  onSubmit={(data) =>
                    goToStep("CONFLICT_CHECK", data, "previousLawyer")
                  }
                />
              )}

              {step === "CONFLICT_CHECK" && (
                <FormStep
                  question="Conflict Check"
                  description="List main parties involved (companies, individuals, lenders)."
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
                    },
                    {
                      name: "lender",
                      label: "Lender (if applicable)",
                      type: "text",
                    },
                    { name: "others", label: "Others", type: "text" },
                  ]}
                  onSubmit={(data) =>
                    goToStep("PROCEED_CHOICE", data, "conflicts")
                  }
                />
              )}

              {step === "PROCEED_CHOICE" && (
                <OptionStep
                  question="How would you like to proceed?"
                  options={[
                    "Book a confidential intake call",
                    "Submit this information for review and hear back first",
                  ]}
                  onSelect={(opt) => {
                    setAnswers((prev) => ({ ...prev, intent: opt }));
                    setIsCompleted(true);
                  }}
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <Icon.CheckCircle className="mx-auto text-gold mb-6" size={64} />
              <h2 className="text-4xl font-serif mb-4">Thank you.</h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                Our team will review your submission, including time-sensitive
                issues and potential conflicts, and will be in touch shortly.
              </p>
              <div className="text-xs text-slate-500 italic max-w-md mx-auto border-t border-slate-800 pt-6">
                Submitting this form does not create a solicitor-client
                relationship. A relationship is only established once a retainer
                agreement is confirmed.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Sub-components for clean rendering
function OptionStep({ question, description, options, onSelect }) {
  return (
    <div className="text-left">
      <h3 className="text-3xl font-serif mb-2">{question}</h3>
      {description && <p className="text-slate-400 mb-8">{description}</p>}
      <div className="grid gap-3 mt-6">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className="p-5 border border-slate-700 rounded-xl hover:border-gold hover:bg-slate-800 transition-all flex justify-between items-center group text-left"
          >
            <span>{opt}</span>
            <Icon.ChevronRight className="text-slate-600 group-hover:text-gold" />
          </button>
        ))}
      </div>
    </div>
  );
}

function FormStep({ question, description, fields, onSubmit }) {
  const [vals, setVals] = useState({});

  // Validation Logic: Check if all non-optional fields have a value
  const isInvalid = fields.some((f) => {
    if (f.label.toLowerCase().includes("optional")) return false; // Skip optional fields
    const value = vals[f.name];
    return !value || (Array.isArray(value) && value.length === 0);
  });

  const handleCheck = (name, opt) => {
    const current = vals[name] || [];
    const next = current.includes(opt)
      ? current.filter((i) => i !== opt)
      : [...current, opt];
    setVals({ ...vals, [name]: next });
  };

  return (
    <div className="funnel-step">
      <h3 className="funnel-title">{question}</h3>
      {description && <p className="funnel-description">{description}</p>}

      <div className="funnel-fields">
        {fields.map((f) => (
          <div key={f.name} className="field-group">
            <label className="field-label">
              {f.label}{" "}
              {!f.label.toLowerCase().includes("optional") && (
                <span className="required">*</span>
              )}
            </label>

            {f.type === "textarea" ? (
              <textarea
                className="funnel-input funnel-textarea"
                onChange={(e) => setVals({ ...vals, [f.name]: e.target.value })}
              />
            ) : f.type === "select" ? (
              <select
                className="funnel-input funnel-select"
                onChange={(e) => setVals({ ...vals, [f.name]: e.target.value })}
              >
                <option value="">Select...</option>
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
                      onChange={() => handleCheck(f.name, o)}
                    />
                    {o}
                  </label>
                ))}
              </div>
            ) : (
              <input
                type="text"
                placeholder={f.placeholder}
                className="funnel-input"
                onChange={(e) => setVals({ ...vals, [f.name]: e.target.value })}
              />
            )}
          </div>
        ))}

        <button
          onClick={() => !isInvalid && onSubmit(vals)}
          disabled={isInvalid}
          className={`funnel-submit-btn ${isInvalid ? "disabled" : ""}`}
        >
          {isInvalid ? "Please fill required fields" : "Continue"}
        </button>
      </div>
    </div>
  );
}
