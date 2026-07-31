import { defineType, defineField } from "sanity";

export default defineType({
  name: "teamSection",
  title: "Team Section Block",
  type: "object",
  fields: [
    defineField({
      name: "header",
      title: "Section Header Configuration",
      type: "sectionHeader",
    }),
    defineField({
      name: "layoutType",
      title: "Layout Type Display",
      type: "string",
      options: {
        list: [
          { title: "Standard Grid Layout", value: "grid" },
          { title: "Interactive Swiper Slider", value: "slider" },
        ],
        layout: "radio",
      },
      initialValue: "grid",
    }),
    defineField({
      name: "members",
      title: "Team Members Selection & Ordering",
      description:
        "Search and add team members. Drag items up and down to change their order on the page.",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "team" }], // References your existing 'team' document
        },
      ],
    }),
  ],
});
