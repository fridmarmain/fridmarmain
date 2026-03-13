export default {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    {
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      description: "Custom subtitle for the page hero",
    },
    {
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
    },
    { name: "description", title: "Description", type: "text" },
    {
      name: "seoKeywords",
      title: "SEO Keywords",
      type: "string",
      description: "Comma separated keywords",
    },
  ],
};
