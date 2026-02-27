export default {
  name: "termsOfUse",
  title: "Terms of Use",
  type: "document",
  // Singleton — only one document of this type should ever exist
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "title",
      title: "Page Title",
      type: "string",
      description:
        'Displayed as the main heading on the page (e.g. "Terms of Use")',
      validation: (Rule) => Rule.required(),
    },
    {
      name: "lastUpdated",
      title: "Last Updated",
      type: "date",
      description:
        "The date shown at the top of the page. Update this manually whenever you make changes.",
      options: {
        dateFormat: "MMMM D, YYYY",
      },
    },
    {
      name: "sections",
      title: "Sections",
      type: "array",
      description:
        "Add, remove, and drag to reorder sections. Each section becomes a heading + body.",
      of: [
        {
          type: "object",
          name: "section",
          title: "Section",
          preview: {
            select: { title: "heading" },
            prepare({ title }) {
              return { title: title || "Untitled Section" };
            },
          },
          fields: [
            {
              name: "heading",
              title: "Section Heading",
              type: "string",
              description:
                'e.g. "Privacy", "Limitation of Liability", "Contact Us"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: "body",
              title: "Section Content",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [{ title: "Normal", value: "normal" }],
                  lists: [
                    { title: "Bullet", value: "bullet" },
                    { title: "Numbered", value: "number" },
                  ],
                  marks: {
                    decorators: [
                      { title: "Bold", value: "strong" },
                      { title: "Italic", value: "em" },
                      { title: "Underline", value: "underline" },
                    ],
                    annotations: [
                      {
                        name: "link",
                        type: "object",
                        title: "Link",
                        fields: [
                          {
                            name: "href",
                            type: "url",
                            title: "URL",
                            validation: (Rule) =>
                              Rule.uri({
                                allowRelative: true,
                                scheme: ["http", "https", "mailto"],
                              }),
                          },
                          {
                            name: "blank",
                            title: "Open in new tab",
                            type: "boolean",
                            initialValue: true,
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
