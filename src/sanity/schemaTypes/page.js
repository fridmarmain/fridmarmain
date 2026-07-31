import { defineType, defineField } from "sanity";

export default defineType({
  name: "page",
  title: "Pages",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug (URL path)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "pageBuilder",
      title: "Page Sections",
      type: "array",
      description: "Add, reorder, or remove sections on this page.",
      of: [
        { type: "heroSection" }, // This connects our Hero Section from Step 1+
        { type: "ctaSection" }, // Added right here
        { type: "aboutComponent" }, // 👈 Connects your existing about block schema
        { type: "ceoSection" },
        { type: "practiceSection" }, // Added here
        { type: "teamSection" },
        { type: "blogSection" }, // Added here
        { type: "reviewSection" }, // Added here
        { type: "visionMissionSection" },
        // { type: "contactSection" }, //
      ],
    }),
  ],
});
