export default {
  name: "navbarSettings",
  title: "Navbar Settings",
  type: "document",
  fields: [
    {
      name: "bookingLabel",
      title: "Booking Button Label",
      type: "string",
      initialValue: "Book a call",
    },
    {
      name: "bookingUrl",
      title: "Booking Button URL",
      type: "url",
      initialValue: "https://calendly.com/fridmar/meet-with-mey",
    },
    {
      name: "resourcesLabel",
      title: "Resources Label",
      type: "string",
      initialValue: "Resources",
    },
    {
      name: "resourcesPath",
      title: "Resources Path",
      type: "string",
      initialValue: "/resources",
    },
    {
      name: "customResourcesLinks",
      title: "Override Resources Dropdown Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "path", type: "string" },
          ],
        },
      ],
    },
    {
      name: "reviewsLabel",
      title: "Reviews Label",
      type: "string",
      initialValue: "Reviews",
    },
    {
      name: "reviewsPath",
      title: "Reviews Path",
      type: "string",
      initialValue: "/reviews",
    },
    {
      name: "extraLinks",
      title: "Extra Header Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "path", type: "string" },
          ],
        },
      ],
    },
  ],
};
