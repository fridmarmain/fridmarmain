"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icon from "lucide-react";

const steps = [
  {
    id: 1,
    question: "How can we help you today?",
    options: [
      "Construction Dispute",
      "Commercial Litigation",
      "Real Estate Matter",
      "Other Professional Service",
    ],
  },
  {
    id: 2,
    question: "Is this matter urgent?",
    options: [
      "Yes, immediate attention needed",
      "No, just exploring options",
      "I have a deadline approaching",
    ],
  },
];

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleOption = (option) => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-3xl">
        {!completed ? (
          <div className="text-center">
            <span className="text-gold font-mono text-sm mb-4 block">
              Step {currentStep + 1} of {steps.length}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
              >
                <h3 className="text-3xl md:text-4xl font-serif mb-10">
                  {steps[currentStep].question}
                </h3>
                <div className="grid gap-4">
                  {steps[currentStep].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleOption(opt)}
                      className="p-6 border border-slate-700 rounded-xl hover:border-gold hover:bg-slate-800 transition-all text-left flex justify-between items-center group"
                    >
                      {opt}
                      <Icon.ChevronRight className="text-slate-500 group-hover:text-gold" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <Icon.CheckCircle className="mx-auto text-gold mb-6" size={64} />
            <h3 className="text-4xl font-serif mb-4">
              We are ready to assist.
            </h3>
            <p className="text-slate-400 mb-8">
              Based on your answers, we recommend a 15-minute introductory call.
            </p>
            <button className="bg-gold text-black px-10 py-5 rounded-full font-bold flex items-center gap-2 mx-auto">
              Book Your Free Intake <Icon.ArrowUpRight size={20} />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Questionnaire;
