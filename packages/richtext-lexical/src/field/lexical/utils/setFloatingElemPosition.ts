/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const VERTICAL_GAP = 10
const HORIZONTAL_OFFSET = 5

export function setFloatingElemPosition(
  targetRect: ClientRect | null,
  floatingElem: HTMLElement,
  anchorElem: HTMLElement,
  horizontalPosition: 'center' | 'left' = 'left',
  verticalGap: number = VERTICAL_GAP,
  horizontalOffset: number = HORIZONTAL_OFFSET,
): void {
  const scrollerElem = anchorElem.parentElement

  if (targetRect === null || scrollerElem == null) {
    floatingElem.style.opacity = '0'
    floatingElem.style.transform = 'translate(-10000px, -10000px)'
    return
  }

  const floatingElemRect = floatingElem.getBoundingClientRect()
  const anchorElementRect = anchorElem.getBoundingClientRect()
  const editorScrollerRect = scrollerElem.getBoundingClientRect()

  let top = targetRect.top - floatingElemRect.height - verticalGap
  let left = targetRect.left - horizontalOffset

  if (horizontalPosition === 'center') {
    // Calculate left to position floatingElem to the horizontal middle of targetRect
    left = targetRect.left + targetRect.width / 2 - floatingElemRect.width / 2
  }

  if (top < editorScrollerRect.top) {
    top += floatingElemRect.height + targetRect.height + verticalGap * 2
  }

  if (horizontalPosition === 'center') {
    if (left + floatingElemRect.width > editorScrollerRect.right) {
      left = editorScrollerRect.right - floatingElemRect.width - horizontalOffset
    } else if (left < editorScrollerRect.left) {
      left = editorScrollerRect.left + horizontalOffset
    }
  } else {
    if (left + floatingElemRect.width > editorScrollerRect.right) {
      left = editorScrollerRect.right - floatingElemRect.width - horizontalOffset
    }
  }

  top -= anchorElementRect.top
  left -= anchorElementRect.left

  floatingElem.style.opacity = '1'
  floatingElem.style.transform = `translate(${left}px, ${top}px)`
}
