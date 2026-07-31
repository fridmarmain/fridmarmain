export default {
  name: "contactSection",
  title: "Contact Section Settings",
  type: "document",
  fields: [
    {
      name: "heading",
      title: "Section Heading",
      type: "string",
      description:
        "Use asterisks to highlight words in gold. Example: Your Legal Strategy *Starts Here*",
      initialValue: "Your Legal Strategy *Starts Here*",
    },
    {
      name: "subheading",
      title: "Section Subheading",
      type: "text",
      initialValue:
        "The Fridmar Professional Corporation is happy to welcome its clients to its new office. For legal advice tailored to your circumstances and business, please contact us through the information below:",
    },
    {
      name: "officeImage",
      title: "Office Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "formImage",
      title: "Form Side Image (Portrait)",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "locationAddress",
      title: "Office Address",
      type: "text",
      description: "Use Enter to create new lines",
      initialValue:
        "242 Applewood Crescent, Unit 5-Ground\nConcord, ON L4K 4E5",
    },
    {
      name: "phone",
      title: "Phone Number",
      type: "string",
      initialValue: "(647) 363-6704",
    },
    {
      name: "fax",
      title: "Fax Number",
      type: "string",
      initialValue: "(289) 807-0204",
    },
    {
      name: "email",
      title: "Contact Email",
      type: "string",
      initialValue: "info@fridmar.com",
    },
    {
      name: "hoursWeekdays",
      title: "Weekday Hours",
      type: "string",
      initialValue: "Weekdays: 9:00 AM – 5:00 PM",
    },
    {
      name: "namePlaceholder",
      title: "Name Field Placeholder",
      type: "string",
      initialValue: "Your Name",
    },
    {
      name: "emailPlaceholder",
      title: "Email Field Placeholder",
      type: "string",
      initialValue: "Your Email",
    },
    {
      name: "phonePlaceholder",
      title: "Phone Field Placeholder",
      type: "string",
      initialValue: "Your Phone Number",
    },
    {
      name: "messagePlaceholder",
      title: "Message Field Placeholder",
      type: "string",
      initialValue: "Message",
    },
    {
      name: "servicesOptions",
      title: "Services Dropdown Options",
      type: "array",
      of: [{ type: "string" }],
      initialValue: ["Construction", "dispute", "litigation", "other"],
    },
    {
      name: "sourcesOptions",
      title: "Referral Source Dropdown Options",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "Google Search",
        "Referral",
        "Social Media",
        "Website",
        "Other",
      ],
    },
    {
      name: "formHeading",
      title: "Form Heading",
      type: "string",
      description: "Use asterisks to highlight words. Example: Get In *Touch*",
      initialValue: "Get In *Touch*",
    },
    {
      name: "formSubheading",
      title: "Form Subheading",
      type: "text",
      initialValue:
        "Fill out the form below to schedule a confidential initial consultation.",
    },
    {
      name: "submitButtonText",
      title: "Submit Button Default Text",
      type: "string",
      initialValue: "Send Message",
    },
    {
      name: "submitButtonSuccessText",
      title: "Submit Button Success Text",
      type: "string",
      initialValue: "Message Sent!",
    },
  ],
};
