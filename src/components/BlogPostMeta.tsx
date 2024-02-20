import { HStack } from 'alinea/ui'

export type BlogPostMetaProps = {
  publishDate: string
  author?: {
    name: string
  }
}

export function BlogPostMeta({ publishDate, author }: BlogPostMetaProps) {
  const date = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(publishDate))
  return (
    <HStack gap={8} align="flex-start">
      {author && (
        <HStack center gap={8}>
          By
          <HStack center gap={8}>
            {author.name}
          </HStack>
        </HStack>
      )
      }
      <time>— {date}</time>
    </HStack >
  )
}
