import type {
  FloatingToolbarSection,
  FloatingToolbarSectionEntry,
} from '../../../lexical/plugins/FloatingSelectToolbar/types'

export const SectionWithEntries = (
  entries: FloatingToolbarSectionEntry[],
): FloatingToolbarSection => {
  return {
    type: 'buttons',
    entries,
    key: 'format',
    order: 4,
  }
}
