import { cms, BlogOverview, BlogPost } from '@/cms';
import { Query } from 'alinea';
import { VStack } from 'alinea/ui'
import Link from 'next/link';

const Content = async () => {
  const overview = await cms.get(
    Query(BlogOverview).get({
      title: Query.title,
      path: Query.path,
      url: Query.url,
      posts: Query.children(BlogPost).select({
        ...Query.entry,
        metadata: BlogPost.metadata,
      })
    })
  );

  if (!overview) {
    return <div>Not found</div>
  }

  return (
    <VStack>
      {overview.posts.map(post => {
        return (
          <VStack
            gap={8}
            key={post.id}
            align="flex-start"
          >
            <Link href={post.url}>
              <h2>{post.title}</h2>
            </Link>
          </VStack>
        )
      })}
    </VStack>
  );
}

export default function Home() {

  return (
    <div>
      <h1>Alinea Blog</h1>
      <div>
        <Content />
      </div>
    </div>
  );
}
