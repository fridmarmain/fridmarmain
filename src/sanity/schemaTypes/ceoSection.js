import { defineType, defineField } from "sanity";

export default defineType({
  name: "ceoSection",
  title: "CEO / Founder Quote Block",
  type: "object",
  fields: [
    defineField({
      name: "subtitle",
      title: "Subtitle / Role Label",
      type: "string",
      initialValue: "Founder & Principal Lawyer",
    }),
    defineField({
      name: "quoteText",
      title: "Quote Header Text",
      type: "string",
      description:
        "Use an asterisk * before and after text to highlight it in gold (e.g. GEARING UP TO SERVE YOUR *LEGAL NEEDS.*)",
      initialValue: "GEARING UP TO SERVE YOUR *LEGAL NEEDS.*",
    }),
    defineField({
      name: "description",
      title: "Description Paragraphs",
      type: "array",
      of: [{ type: "block" }],
      initialValue: [
        {
          _key: "p1",
          _type: "block",
          style: "normal",
          children: [
            {
              _key: "c1",
              _type: "span",
              text: "Welcome to the Fridmar Professional Corporation (the “FPC”) a fresh practice ready to engage with your legal needs in the construction industry.",
            },
          ],
        },
        {
          _key: "p2",
          _type: "block",
          style: "normal",
          children: [
            {
              _key: "c2",
              _type: "span",
              text: "The FPC, with its zealous leader, aims to provide clients with affordable and creative solutions to even the most complicated of legal problems.",
            },
          ],
        },
        {
          _key: "p3",
          _type: "block",
          style: "normal",
          children: [
            {
              _key: "c3",
              _type: "span",
              text: "By combining his legal, educational, and practical knowledge, Mr. Fridmar proudly provides all of FPC’s clients with a tailored and bespoke solution to their individual legal and business needs.",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "portraitImage",
      title: "Custom Portrait Image Override",
      type: "image",
      description:
        "Upload an image to override the CSS layout image framework asset background.",
      options: { hotspot: true },
    }),
    defineField({
      name: "ctaLabel",
      title: "Button CTA Label",
      type: "string",
      initialValue: "Book Consultation",
    }),
    defineField({
      name: "ctaUrl",
      title: "Button CTA URL",
      type: "string",
      initialValue: "https://calendly.com/fridmar/meet-with-mey",
    }),
  ],
});
