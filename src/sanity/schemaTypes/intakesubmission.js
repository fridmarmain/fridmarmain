export default {
  name: "intakeSubmission",
  title: "Intake Submissions",
  type: "document",
  fields: [
    { name: "name", type: "string", title: "Name", readOnly: true },
    { name: "email", type: "string", title: "Email", readOnly: true },
    {
      name: "clientType",
      type: "string",
      title: "Client Type",
      readOnly: true,
    },
    { name: "urgency", type: "string", title: "Urgency", readOnly: true },
    {
      name: "practiceArea",
      type: "string",
      title: "Practice Area",
      readOnly: true,
    },
    {
      name: "branchDetails",
      type: "text",
      title: "Branch Details (JSON)",
      readOnly: true,
    },
    {
      name: "hasLawyer",
      type: "string",
      title: "Has Existing Lawyer",
      readOnly: true,
    },
    {
      name: "previousLawyer",
      type: "text",
      title: "Previous Lawyer (JSON)",
      readOnly: true,
    },
    {
      name: "conflicts",
      type: "text",
      title: "Conflict Check (JSON)",
      readOnly: true,
    },
    {
      name: "intent",
      type: "string",
      title: "How They Want to Proceed",
      readOnly: true,
    },
    {
      name: "submittedAt",
      type: "datetime",
      title: "Submitted At",
      readOnly: true,
    },
  ],
};
