import { defineType, defineField } from "sanity";

export default defineType({
  name: "reviewSection",
  title: "Review Section Block",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Section Header Configuration",
      type: "sectionHeader", // Reusing our exact header object block template
    }),
    defineField({
      name: "showLoadMore",
      title: "Enable Load More Interface",
      description:
        "Turn this on for deep overview pages. Keep turned off for simple landing pages.",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
