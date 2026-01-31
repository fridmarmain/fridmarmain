import {defineField, defineType} from 'sanity'
import React from 'react'
import * as LucideIcons from 'lucide-react'

export default defineType({
  name: 'practiceArea',
  title: 'Practice Areas',
  type: 'document',
  fields: [
    defineField({
      name: 'iconType',
      title: 'Icon Type',
      type: 'string',
      options: {
        list: [
          {title: 'Lucide Library', value: 'library'},
          {title: 'Custom SVG Code', value: 'custom'},
        ],
        layout: 'radio',
      },
      initialValue: 'library',
    }),

    defineField({
      title: 'Library Icon',
      name: 'icon',
      type: 'iconPicker',
      // Only show this if "Lucide Library" is selected
      hidden: ({document}) => document?.iconType !== 'library',
      options: {
        outputFormat: 'name',
        configurations: [
          {
            title: 'Lucide Icons',
            provider: 'lu',
            outputFormat: 'name',
            icons: () =>
              Object.entries(LucideIcons).map(([name, Component]) => ({
                name,
                component: () => React.createElement(Component, {width: '1.5em', height: '1.5em'}),
                tags: [name],
              })),
          },
        ],
      },
    }),

    defineField({
      name: 'level',
      title: 'Page Level',
      type: 'string',
      options: {
        list: [
          {title: 'Umbrella (Top Navigation)', value: 'umbrella'},
          {title: 'Category (Menu Group)', value: 'category'},
          {title: 'Service Page', value: 'service'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'customSvg',
      title: 'Custom SVG Code',
      type: 'text',
      description: 'Paste the raw <svg> code here.',
      // Only show this if "Custom SVG Code" is selected
      hidden: ({document}) => document?.iconType !== 'custom',
    }),
    defineField({name: 'title', type: 'string', title: 'Service Name'}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
    }),
    defineField({
      name: 'parentArea',
      title: 'Parent Practice Area',
      type: 'reference',
      to: [{type: 'practiceArea'}],
      options: {
        filter: ({document}) => {
          if (document?.level === 'category') {
            return {
              filter: 'level == "umbrella"',
            }
          }
          if (document?.level === 'service') {
            return {
              filter: 'level == "category"',
            }
          }
          return {}
        },
      },
      hidden: ({document}) => document?.level === 'umbrella',
    }),

    defineField({name: 'mainImage', type: 'image', title: 'Hero Image', options: {hotspot: true}}),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Short Overview',
      validation: (Rule) =>
        Rule.max(200).warning('Keep descriptions under 200 characters for the best card layout.'),
    }),
    defineField({name: 'body', type: 'blockContent', title: 'Detailed Content'}),
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'question', type: 'string'},
            {name: 'answer', type: 'text'},
          ],
        },
      ],
    }),
  ],

  // PUT IT RIGHT HERE:
  preview: {
    select: {
      title: 'title',
      level: 'level',
      parent: 'parentArea.title', // Pull the title of the referenced parent
    },
    prepare({title, level, parent}) {
      const emojis = {umbrella: '🟦', category: '🟨', service: '📄'}
      return {
        title: title,
        // Shows "SERVICE | Parent Category Name"
        subtitle: `${level ? level.toUpperCase() : '??'} ${parent ? `| ${parent}` : ''}`,
        media: () => emojis[level] || '❓',
      }
    },
  },
})
