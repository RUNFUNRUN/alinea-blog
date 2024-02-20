import { Config, Field } from 'alinea'
import { createCMS } from 'alinea/next'
import { CodeBlock } from './schema/blocks/CodeBlock'
import { ImageBlock } from './schema/blocks/ImageBlock'

export const BlogOverview = Config.type('Blog Overview', {
  contains: ['BlogPost'],
  fields: {
    title: Field.text('Title', { width: 0.5, required: true }),
    path: Field.path('Path', { width: 0.5 }),
  },
})

export const BlogPost = Config.type('Blog Post', {
  fields: {
    title: Field.text('Title', { width: 0.5, required: true }),
    path: Field.path('Path', { width: 0.5, required: true }),
    metadata: Field.metadata('Metadata', { required: true }),
    body: Field.richText('Body', {
      schema: { ImageBlock, CodeBlock },
      searchable: true,
      required: true
    }),
  },
})

export const cms = createCMS({
  schema: {
    BlogPost,
    BlogOverview
  },
  workspaces: {
    main: Config.workspace('My BLOG', {
      source: 'content',
      color: '#3F61E8',
      mediaDir: 'public',
      roots: {
        pages: Config.root('main project', {
          contains: ['BlogOverview', 'BlogPost'],
        }),
        media: Config.media()
      }
    })
  },
  preview:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/preview'
      : '/api/preview'
})
