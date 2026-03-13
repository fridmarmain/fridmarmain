// Category Hero Configuration
// Maps category slugs to custom hero content and styling

import corporateBg from "@/styles/assets/corporate.jpg";
import intellectualBg from "@/styles/assets/intellectual.jpg";
import laborBg from "@/styles/assets/labor.jpg";
import litigationBg from "@/styles/assets/litigation.jpg";
import realEstateBg from "@/styles/assets/realestate.jpg";
import taxBg from "@/styles/assets/tax.jpg";
import immigrationBg from "@/styles/assets/immigration.jpg";
import complianceBg from "@/styles/assets/compliance.jpg";

export const categoryHeroConfig = {
  "corporate-law": {
    title: "Corporate Law",
    subtitle:
      "Navigate complex business structures, mergers, acquisitions, and corporate governance with expert guidance. Our corporate law specialists ensure your business transactions are seamlessly executed.",
    backgroundImage: corporateBg.src,
    accentColor: "#1e3a8a", // Deep blue
    icon: "Building2",
    description:
      "Business transactions • Entity formation • M&A • Corporate governance",
  },
  "intellectual-property": {
    title: "Intellectual Property",
    subtitle:
      "Protect your innovations, trademarks, and creative works. We provide comprehensive IP strategy and enforcement to safeguard your intellectual assets.",
    backgroundImage: intellectualBg.src,
    accentColor: "#7c3aed", // Purple
    icon: "Lightbulb",
    description:
      "Patents • Trademarks • Copyrights • IP licensing & enforcement",
  },
  "labor-employment": {
    title: "Labor & Employment",
    subtitle:
      "From hiring practices to dispute resolution, we help employers and employees navigate employment law with confidence and compliance.",
    backgroundImage: laborBg.src,
    accentColor: "#059669", // Emerald
    icon: "Users",
    description:
      "Employment agreements • Compliance • Disputes • Workplace policies",
  },
  litigation: {
    title: "Litigation & Dispute Resolution",
    subtitle:
      "Strategic representation in civil and commercial disputes. We advocate fiercely for your interests in court and alternative dispute resolution.",
    backgroundImage: litigationBg.src,
    accentColor: "#dc2626", // Red
    icon: "Scale",
    description:
      "Civil litigation • Arbitration • Mediation • Trial representation",
  },
  "real-estate": {
    title: "Real Estate",
    subtitle:
      "Expert counsel for property transactions, development, and real estate investment. We handle everything from acquisition to disposition.",
    backgroundImage: realEstateBg.src,
    accentColor: "#ea580c", // Orange
    icon: "Home",
    description:
      "Property transactions • Commercial leasing • Development • Title issues",
  },
  taxation: {
    title: "Taxation",
    subtitle:
      "Strategic tax planning and compliance services to minimize liability and maximize efficiency. We optimize your tax position across jurisdictions.",
    backgroundImage: taxBg.src,
    accentColor: "#1f2937", // Dark gray
    icon: "Calculator",
    description: "Tax planning • Compliance • Dispute resolution • Strategy",
  },
  immigration: {
    title: "Immigration Law",
    subtitle:
      "Navigate visa requirements, work authorizations, and immigration compliance. We guide individuals and corporations through complex immigration matters.",
    backgroundImage: immigrationBg.src,
    accentColor: "#0891b2", // Cyan
    icon: "Globe",
    description:
      "Visas • Work authorizations • Compliance • Immigration strategy",
  },
  "compliance-regulatory": {
    title: "Compliance & Regulatory",
    subtitle:
      "Stay ahead of regulatory requirements and industry standards. Our compliance expertise helps you operate confidently within complex regulatory frameworks.",
    backgroundImage: complianceBg.src,
    accentColor: "#4338ca", // Indigo
    icon: "CheckCircle",
    description:
      "Regulatory compliance • Industry standards • Audit preparation • Risk mitigation",
  },
};

// Default config for unmapped categories
export const defaultHeroConfig = {
  title: "Resources",
  subtitle:
    "Dedicated to providing sophisticated legal solutions with a commitment to excellence and integrity.",
  backgroundImage: corporateBg.src,
  accentColor: "#1e3a8a",
  icon: "BookOpen",
  description: "Comprehensive legal resources and guidance",
};

export const getHeroConfig = (slug) => {
  return categoryHeroConfig[slug] || defaultHeroConfig;
};
