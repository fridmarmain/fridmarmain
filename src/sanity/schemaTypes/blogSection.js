import { defineType, defineField } from "sanity";

export default defineType({
  name: "blogSection",
  title: "Blog Section Block",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Section Header Configuration",
      type: "sectionHeader", // Reusing our exact header object block template
    }),
    defineField({
      name: "postsCount",
      title: "Maximum Articles to Display",
      type: "number",
      description: "Choose how many latest posts should render here (e.g., 3).",
      initialValue: 3,
    }),
  ],
});
