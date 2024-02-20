import { Typo, VStack } from 'alinea/ui'
import { CodeBlock } from '@/schema/blocks/CodeBlock'
import { Infer } from 'alinea'

export async function CodeBlockView({
  code,
  fileName,
}: Infer<typeof CodeBlock>) {
  if (!code) return null
  const html = code
  return (
    <VStack gap={8}>
      {fileName && <div>{fileName}</div>}
      <div style={{ position: 'relative' }}>
        <Typo.Monospace
          as="div"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </VStack>
  )
}
