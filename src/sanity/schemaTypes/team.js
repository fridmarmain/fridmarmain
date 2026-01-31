export default {
  name: 'team',
  title: 'Team Members',
  type: 'document',
  fields: [
    {name: 'name', type: 'string', title: 'Full Name'},
    {name: 'slug', type: 'slug', title: 'Slug', options: {source: 'name'}},
    {name: 'role', type: 'string', title: 'Job Title / Position'},
    {name: 'image', type: 'image', title: 'Professional Headshot', options: {hotspot: true}},

    // Contact Info Section
    {name: 'phone', type: 'string', title: 'Phone Number'},
    {name: 'email', type: 'string', title: 'Email Address'},
    {name: 'languages', type: 'array', title: 'Languages Spoken', of: [{type: 'string'}]},

    // Detailed Lists
    {
      name: 'education',
      type: 'array',
      title: 'Education',
      of: [{type: 'string'}],
      description: 'e.g., J.D. 2018, Osgoode Hall Law School',
    },
    {
      name: 'memberships',
      type: 'array',
      title: 'Professional Memberships',
      of: [{type: 'string'}],
    },

    // The "Meet Dan" Section
    {name: 'bio', type: 'array', title: 'Full Biography', of: [{type: 'block'}]},

    // Socials & Video
    {name: 'linkedin', type: 'url', title: 'LinkedIn Profile'},
    {
      name: 'tiktokReels',
      title: 'Top Performing Reels',
      type: 'array',
      description: 'Add 2-3 TikTok URLs',
      of: [{type: 'url'}],
      validation: (Rule) => Rule.max(3),
    },
  ],
}
