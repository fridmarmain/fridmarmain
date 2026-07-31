import { defineType, defineField } from "sanity";

export default defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Main Heading",
      type: "string",
    }),
    defineField({
      name: "subheading",
      title: "Subheading Text",
      type: "string",
    }),
    defineField({
      name: "backgroundImage",
      title: "Hero Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "infoLinks",
      title: "Info Box Links",
      type: "array",
      description:
        "Add up to 3 links to display inside the Hero Info Box container.",
      validation: (Rule) => Rule.max(3),
      of: [
        {
          type: "object",
          name: "infoLinkItem",
          title: "Link Item",
          fields: [
            { name: "title", title: "Link Title", type: "string" },
            {
              name: "url",
              title: "URL Link (e.g. /resources or https://...)",
              type: "string",
            },
            {
              name: "icon",
              title: "Icon Selection",
              type: "iconPicker",
              options: {
                providers: ["lu"], // 'lu' stands for Lucide in this plugin
                outputFormat: "react", // Saves icon strings cleanly matching lucide-react names
              },
            },
            {
              name: "isActive",
              title: "Highlight / Make Active Class",
              type: "boolean",
              initialValue: false,
              description:
                "Turn on to make this link use the highlighted accent color background.",
            },
          ],
        },
      ],
    }),
  ],
});
