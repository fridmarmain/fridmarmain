import { defineType, defineField } from "sanity";

export default defineType({
  name: "sectionHeader",
  title: "Section Header Configuration",
  type: "object",
  fields: [
    defineField({
      name: "sideHeader",
      title: "Vertical Side Text (e.g., Our Services)",
      type: "string",
    }),
    defineField({
      name: "mainHeader",
      title: "Main Title Bold Text (e.g., Expertise)",
      type: "string",
    }),
    defineField({
      name: "subHeader",
      title: "Subtitle Text (e.g., Practice Areas)",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description Text (Right Column Paragraph)",
      type: "text",
      rows: 3,
    }),
  ],
});
