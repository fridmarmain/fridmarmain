export default {
  name: 'post',
  title: 'Resource Post',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}},
    {
      name: 'format',
      title: 'Resource Format',
      type: 'string',
      options: {
        list: [
          {title: 'Standard Blog', value: 'blog'},
          {title: 'Video (Vlog/YouTube)', value: 'video'},
          {title: 'Podcast/Audio', value: 'podcast'},
        ],
        layout: 'radio',
      },
      initialValue: 'blog',
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      hidden: ({document}) => document?.format !== 'video',
    },
    {
      name: 'videoCover',
      title: 'Video Cover Image (Decoy)',
      type: 'image',
      options: {hotspot: true},
      description: 'This image shows before the video starts playing.',
      hidden: ({document}) => document?.format !== 'video',
    },
    {
      name: 'podcastUrl',
      title: 'Podcast URL',
      type: 'url',
      description: 'RSS.com or Spotify Link',
      hidden: ({document}) => document?.format !== 'podcast',
    },
    {name: 'mainImage', title: 'Hero Image', type: 'image', options: {hotspot: true}},
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
    {name: 'publishedAt', title: 'Published Date', type: 'datetime'},
    {name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3},
    {name: 'body', title: 'Content / Description', type: 'blockContent'},
  ],
}
