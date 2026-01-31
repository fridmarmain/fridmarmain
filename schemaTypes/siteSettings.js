export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'showAnnouncement',
      title: 'Show Announcement Bar?',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'announcementHeader',
      title: 'Header (Short)',
      type: 'string',
      hidden: ({document}) => !document?.showAnnouncement,
    },
    {
      name: 'announcementImage',
      title: 'Announcement Image',
      type: 'image',
      options: {hotspot: true},
      hidden: ({document}) => !document?.showAnnouncement,
    },
    {
      name: 'announcementDescription',
      title: 'Description',
      type: 'text',
      rows: 2,
      hidden: ({document}) => !document?.showAnnouncement,
    },
    // {
    //   name: 'announcementBody',
    //   title: 'Full Details',
    //   type: 'array',
    //   of: [{type: 'block'}],
    //   hidden: ({document}) => !document?.showAnnouncement,
    // },
    {
      name: 'announcementUrl',
      title: 'Announcement Link (URL)',
      type: 'url',
      description:
        'Optional: Link to an external site or specific page. If empty, it defaults to /announcement',
      hidden: ({document}) => !document?.showAnnouncement,
    },

    {
      name: 'announcementNeverShowText',
      title: 'Never Show Again Button Text',
      type: 'string',
      initialValue: 'Don’t show this again',
      hidden: ({document}) => !document?.showAnnouncement,
    },
    {
      name: 'trustLogos',
      title: 'Trust & Partner Logos',
      type: 'array',
      description: 'Upload logos for the ribbon (LSO, LinkedIn, etc.)',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Partner Name (for alphabetical sorting)',
            },
          ],
        },
      ],
    },
  ],
}
