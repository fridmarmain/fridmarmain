export default {
  name: 'review',
  title: 'Client Reviews',
  type: 'document',
  fields: [
    {name: 'clientName', title: 'Client Name', type: 'string'},
    {name: 'clientRole', title: 'Client Role', type: 'string'},
    {
      name: 'clientImage',
      title: 'Client Headshot',
      type: 'image',
      description: 'Small profile photo of the reviewer',
    },
    {
      name: 'reviewType',
      title: 'Review Type',
      type: 'string',
      options: {list: ['text', 'video', 'image']},
    },

    {
      name: 'content',
      title: 'Review Text',
      type: 'text',
      hidden: ({document}) => document?.reviewType !== 'text',
    },

    {
      name: 'videoThumbnail',
      title: 'Video Preview Image',
      type: 'image',
      options: {hotspot: true},
      hidden: ({document}) => document?.reviewType !== 'video',
    },
    {
      name: 'videoSource',
      title: 'Video Source',
      type: 'string',
      options: {
        list: [
          {title: 'YouTube/TikTok URL', value: 'url'},
          {title: 'Direct Upload (Mux - Smoothest)', value: 'upload'},
        ],
        layout: 'radio',
      },
      hidden: ({document}) => document?.reviewType !== 'video',
    },
    {
      name: 'videoUrl',
      title: 'Paste Social URL',
      type: 'url',
      hidden: ({document}) => document?.videoSource !== 'url',
    },
    {
      name: 'videoUpload',
      title: 'Upload to Mux',
      type: 'mux.video',
      hidden: ({document}) => document?.videoSource !== 'upload',
    },
    {
      name: 'reviewImage',
      title: 'Review Image (Result or Photo)',
      type: 'image',
      hidden: ({document}) => document?.reviewType !== 'image',
    },
    {name: 'rating', title: 'Star Rating', type: 'number', initialValue: 5},
  ],
}
