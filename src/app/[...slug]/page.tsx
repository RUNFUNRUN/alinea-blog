import { cms, BlogPost } from "@/cms"
import { TextView } from "@/components/TextView"
import { Query } from "alinea"
import { Metadata } from "next"

export interface BlogPostPageProps {
  params: { slug: string[] }
}

export async function generateStaticParams() {
  const paths = await cms.find(Query(BlogPost).select(Query.path))
  return paths.map((path) => ({ params: { slug: path.split('/') } }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const page = await cms.find(Query(BlogPost).wherePath(params.slug[1]));
  return {
    title: page[0].metadata?.title ?? undefined,
    description: page[0].metadata?.description ?? undefined,
    openGraph: {
      title: page[0].metadata?.title ?? undefined,
      description: page[0].metadata?.description ?? undefined,
    }
  } satisfies Metadata;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const page = await cms.get(Query(BlogPost).wherePath(params.slug[1]));
  return (
    <div>
      <div>
        <article>
          <header>
            <h1>
              {page.metadata.title}
            </h1>
          </header>
          <TextView text={page.body} />
        </article>
      </div>
    </div>
  )
}
