export default {
  name: 'cityPage',
  title: 'Individual City Content',
  type: 'document',
  fields: [
    {
      name: 'cityName',
      title: 'City Name',
      type: 'string',
      description: 'Must match one from the Region list exactly.',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'cityName'},
    },
    {name: 'customHeadline', title: 'Custom H1', type: 'string'},
    {name: 'customIntro', title: 'Custom Intro Text', type: 'text'},
    {name: 'localInsights', title: 'Local Industry Insights', type: 'text'},
  ],
}
