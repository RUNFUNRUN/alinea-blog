import { Config, Field, Infer } from 'alinea'
import { ComponentType, Fragment } from 'react'
import { CodeBlockView } from './CodeBlockView'
import { ImageBlockView } from './ImageBlockView'
import { CodeBlock } from '@/schema/blocks/CodeBlock'
import { ImageBlock } from '@/schema/blocks/ImageBlock'
import { RichText, RichTextProps } from 'alinea/ui/RichText'
import reactStringReplace from 'react-string-replace'

function Text({ children }: { children: string }) {
  return reactStringReplace(children, /\`(.+?)\`/g, (match, i) => (
    <span key={i}>
      {match}
    </span>
  ))
}

export function WebText<T extends {}>(props: RichTextProps<T>) {
  return (
    <div>
      <RichText
        text={Text}
        ul={<ul />}
        ol={<ol />}
        li={<li />}
        blockquote={<blockquote />}
        {...props}
      />
    </div>
  )
}

export const textField = () =>
  Field.richText('Body', {
    schema: {
      CodeBlock,
      ImageBlock,
    },
    searchable: true
  })

export const TextBlock = Config.type('Body text', {
  fields: { text: textField() }
})

export interface TextBlockViewProps extends Infer<typeof TextBlock> {
  container?: ComponentType
}

export function TextBlockView({ text, container }: TextBlockViewProps) {
  const Wrapper = container || Fragment
  return (
    <Wrapper>
      <TextView text={text} />
    </Wrapper>
  )
}

export function TextView({ text }: TextBlockViewProps) {
  return (
    <WebText
      doc={text}
      CodeBlock={CodeBlockView}
      ImageBlock={ImageBlockView}
    />
  )
}
