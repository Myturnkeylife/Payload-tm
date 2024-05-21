'use client'
import type { InitialConfigType } from '@lexical/react/LexicalComposer.js'
import type { FormFieldBase } from '@payloadcms/ui/fields/shared'
import type { EditorState, SerializedEditorState } from 'lexical'
import type { LexicalEditor } from 'lexical'

import { LexicalComposer } from '@lexical/react/LexicalComposer.js'
import * as React from 'react'

import type { SanitizedClientEditorConfig } from './config/types.js'

import { EditorFocusProvider } from './EditorFocusProvider.js'
import { LexicalEditor as LexicalEditorComponent } from './LexicalEditor.js'
import { EditorConfigProvider } from './config/client/EditorConfigProvider.js'
import { getEnabledNodes } from './nodes/index.js'

export type LexicalProviderProps = {
  editorConfig: SanitizedClientEditorConfig
  fieldProps: FormFieldBase & {
    editorConfig: SanitizedClientEditorConfig // With rendered features n stuff
    name: string
    richTextComponentMap: Map<string, React.ReactNode>
  }
  onChange: (editorState: EditorState, editor: LexicalEditor, tags: Set<string>) => void
  path: string
  readOnly: boolean
  value: SerializedEditorState
}
export const LexicalProvider: React.FC<LexicalProviderProps> = (props) => {
  const { editorConfig, fieldProps, onChange, path, readOnly } = props
  let { value } = props

  const [initialConfig, setInitialConfig] = React.useState<InitialConfigType | null>(null)

  // set lexical config in useEffect: // TODO: Is this the most performant way to do this? Prob not
  React.useEffect(() => {
    const newInitialConfig: InitialConfigType = {
      editable: readOnly !== true,
      editorState: value != null ? JSON.stringify(value) : undefined,
      namespace: editorConfig.lexical.namespace,
      nodes: [...getEnabledNodes({ editorConfig })],
      onError: (error: Error) => {
        throw error
      },
      theme: editorConfig.lexical.theme,
    }
    setInitialConfig(newInitialConfig)
  }, [editorConfig, readOnly, value])

  if (editorConfig?.features?.hooks?.load?.length) {
    editorConfig.features.hooks.load.forEach((hook) => {
      value = hook({ incomingEditorState: value })
    })
  }

  if (value && typeof value !== 'object') {
    throw new Error(
      'The value passed to the Lexical editor is not an object. This is not supported. Please remove the data from the field and start again. This is the value that was passed in: ' +
        JSON.stringify(value),
    )
  }

  if (value && Array.isArray(value) && !('root' in value)) {
    throw new Error(
      'You have tried to pass in data from the old, Slate editor, to the new, Lexical editor. This is not supported. There is no automatic conversion from Slate to Lexical data available yet (coming soon). Please remove the data from the field and start again.',
    )
  }

  if (value && 'jsonContent' in value) {
    throw new Error(
      'You have tried to pass in data from payload-plugin-lexical. This is not supported. The data structure has changed in this editor, compared to the plugin, and there is no automatic conversion available yet (coming soon). Please remove the data from the field and start again.',
    )
  }

  if (!initialConfig) {
    return <p>Loading...</p>
  }

  return (
    <LexicalComposer initialConfig={initialConfig} key={path}>
      <EditorFocusProvider>
        <EditorConfigProvider editorConfig={editorConfig} fieldProps={fieldProps}>
          <LexicalEditorComponent editorConfig={editorConfig} onChange={onChange} />
        </EditorConfigProvider>
      </EditorFocusProvider>
    </LexicalComposer>
  )
}
