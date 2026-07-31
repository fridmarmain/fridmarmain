export default {
  name: "navLink",
  title: "Navigation Link",
  type: "object",
  fields: [
    {
      name: "label",
      title: "Link Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "path",
      title: "Internal Path or External URL",
      type: "string",
      description:
        'Use relative paths for internal routing (e.g., "/about" or "/practice/construction-law") and absolute URLs for external domains.',
      validation: (Rule) => Rule.required(),
    },
  ],
};
