export default {
  name: "contact",
  title: "Contact Form Submissions",
  type: "document",
  fields: [
    { name: "name", type: "string", title: "Name", readOnly: true },
    { name: "email", type: "string", title: "Email", readOnly: true },
    { name: "phone", type: "string", title: "Phone", readOnly: true },
    { name: "service", type: "string", title: "Service", readOnly: true },
    { name: "message", type: "text", title: "Message", readOnly: true },
    { name: "submittedAt", title: "Submitted At", type: "datetime" },
  ],
};
