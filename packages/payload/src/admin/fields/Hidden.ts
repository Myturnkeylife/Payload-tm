type HiddenFieldBaseClientProps = {
  readonly disableModifyingForm?: false
  readonly field?: never
  readonly path: string
  readonly value?: unknown
}

export type HiddenFieldProps = HiddenFieldBaseClientProps
