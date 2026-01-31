export default {
  name: 'aboutComponent',
  title: 'About Section',
  type: 'document', // Used as a block within a page or settings
  fields: [
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      initialValue: 'Who we are',
    },
    {
      name: 'title',
      title: 'Main Title',
      type: 'string',
      initialValue: 'About Us',
    },
    {
      name: 'bio',
      title: 'CEO Bio / Company Text',
      type: 'array',
      of: [{type: 'block'}],
      description: 'The "Fridmar Professional Corporation opened shop..." text',
    },
  ],
}
