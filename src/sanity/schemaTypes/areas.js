export default {
  name: 'areasWeServe',
  title: 'Areas We Serve',
  type: 'document',
  fields: [
    {
      name: 'regionName',
      title: 'Region Name',
      type: 'string', // e.g., "York Region"
    },
    {
      name: 'regionDescription',
      title: 'Region Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'cityList',
      title: 'Cities (Comma Separated)',
      type: 'text',
      description: 'Example: Toronto, North York, Etobicoke',
    },
  ],
}
