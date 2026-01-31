export default {
  name: 'region',
  title: 'Service Regions',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Region Title',
      type: 'string', // e.g., "Toronto & the Greater Toronto Area (GTA)"
    },
    {
      name: 'intro',
      title: 'Region Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'groups',
      title: 'City Groups',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'groupName', title: 'Group Name', type: 'string'}, // e.g., "York Region"
            {
              name: 'cities',
              title: 'Cities (Comma Separated)',
              type: 'text',
              description: 'Example: Vaughan, Markham, Richmond Hill',
            },
          ],
        },
      ],
    },
  ],
}
