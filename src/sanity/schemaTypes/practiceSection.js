import { defineType, defineField } from "sanity";

export default defineType({
  name: "practiceSection",
  title: "Practice Overview Section",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Section Header Text Content",
      type: "sectionHeader", // References our reusable block configuration
    }),
    defineField({
      name: "displayLevel",
      title: "Filter Practice Level to Display",
      type: "string",
      description:
        "Choose which tiers of practice areas map into this homepage section layout wrapper.",
      options: {
        list: [
          { title: "Show All Levels", value: "all" },
          { title: "Umbrella (Top Navigation) Only", value: "umbrella" },
          { title: "Category (Menu Group) Only", value: "category" },
          { title: "Service Pages Only", value: "service" },
        ],
        layout: "radio",
      },
      initialValue: "umbrella",
    }),
  ],
});
