export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    // --- ANNOUNCEMENT BAR ---
    {
      name: "showAnnouncement",
      title: "Show Announcement Bar?",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "announcementHeader",
      title: "Header (Short)",
      type: "string",
      hidden: ({ document }) => !document?.showAnnouncement,
    },
    {
      name: "announcementImage",
      title: "Announcement Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ document }) => !document?.showAnnouncement,
    },
    {
      name: "announcementDescription",
      title: "Description",
      type: "text",
      rows: 2,
      hidden: ({ document }) => !document?.showAnnouncement,
    },
    {
      name: "announcementUrl",
      title: "Announcement Link (URL)",
      type: "url",
      description: "Optional: Link to an external site or specific page.",
      hidden: ({ document }) => !document?.showAnnouncement,
    },
    {
      name: "announcementNeverShowText",
      title: "Never Show Again Button Text",
      type: "string",
      initialValue: "Don’t show this again",
      hidden: ({ document }) => !document?.showAnnouncement,
    },
    // --- TRUST LOGOS ---
    {
      name: "trustLogos",
      title: "Trust & Partner Logos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "label", type: "string", title: "Partner Name" }],
        },
      ],
    },
    // --- GLOBAL ACTIONS ---
    {
      name: "calendlyUrl",
      title: "Global Calendly Booking URL",
      type: "url",
      initialValue: "https://calendly.com/fridmar/meet-with-mey",
    },
    {
      name: "footerTagline",
      title: "Footer Brand Description Tagline",
      type: "text",
      rows: 2,
      initialValue:
        "Professional Legal Solutions for the Construction Industry and Beyond.",
    },
    {
      name: "footerBackgroundText",
      title: "Large Footer Watermark Text",
      type: "string",
      initialValue: "Fridmar",
    },
    {
      name: "socialLinks",
      title: "Social Profile URLs",
      type: "object",
      fields: [
        { name: "linkedin", title: "LinkedIn Profile URL", type: "url" },
        { name: "tiktok", title: "TikTok Profile URL", type: "url" },
        { name: "instagram", title: "Instagram Profile URL", type: "url" },
        { name: "facebook", title: "Facebook Page URL", type: "url" },
        { name: "youtube", title: "YouTube Channel URL", type: "url" },
      ],
    },
    // --- FOOTER COLUMNS ---
    {
      name: "footerColumns",
      title: "Footer Link Columns",
      type: "array",
      of: [
        {
          type: "object",
          name: "footerColumn",
          title: "Link Column Group",
          fields: [
            {
              name: "columnHeading",
              title: "Column Section Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "links",
              title: "Links",
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
        },
      ],
    },
    // --- NAVBAR CONFIG ---
    {
      name: "bookingLabel",
      title: "Navbar Booking Button Label",
      type: "string",
      initialValue: "Book a call",
    },
    {
      name: "bookingUrl",
      title: "Navbar Booking Button URL",
      type: "url",
      initialValue: "https://calendly.com/fridmar/meet-with-mey",
    },
    {
      name: "resourcesLabel",
      title: "Resources Dropdown Label",
      type: "string",
      initialValue: "Resources",
    },
    {
      name: "resourcesPath",
      title: "Resources Main Path",
      type: "string",
      initialValue: "/resources",
    },
    {
      name: "customResourcesLinks",
      title: "Override Resources Dropdown Items",
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
      title: "Reviews Link Label",
      type: "string",
      initialValue: "Reviews",
    },
    {
      name: "reviewsPath",
      title: "Reviews Target Path",
      type: "string",
      initialValue: "/reviews",
    },
    // --- POLYMORPHIC EXTRA LINKS ---
    {
      name: "extraLinks",
      title: "Extra Navbar Header Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "navLink",
          title: "Standalone Link",
          fields: [
            { name: "label", title: "Link Title", type: "string" },
            { name: "path", title: "Target Route", type: "string" },
          ],
        },
        {
          type: "object",
          name: "navDropdown",
          title: "Dropdown Menu",
          fields: [
            { name: "label", title: "Dropdown Title", type: "string" },
            {
              name: "links",
              title: "Sub-Links",
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
        },
      ],
    },
  ],
};
