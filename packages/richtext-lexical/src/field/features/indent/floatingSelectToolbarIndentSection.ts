import type {
  FloatingToolbarSection,
  FloatingToolbarSectionEntry,
} from '../../lexical/plugins/FloatingSelectToolbar/types'

export const IndentSectionWithEntries = (
  entries: FloatingToolbarSectionEntry[],
): FloatingToolbarSection => {
  return {
    type: 'buttons',
    entries,
    key: 'indent',
    order: 3,
  }
}
