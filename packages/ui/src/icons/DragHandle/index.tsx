import React from 'react'

import './index.scss'

export const DragHandleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={['icon icon--drag-handle', className].filter(Boolean).join(' ')}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className="fill"
      d="M7.99999 10.6667C8.36818 10.6667 8.66666 10.3682 8.66666 9.99999C8.66666 9.6318 8.36818 9.33332 7.99999 9.33332C7.63181 9.33332 7.33333 9.6318 7.33333 9.99999C7.33333 10.3682 7.63181 10.6667 7.99999 10.6667Z"
      strokeLinecap="square"
    />
    <path
      className="fill"
      d="M7.99999 5.99999C8.36818 5.99999 8.66666 5.70151 8.66666 5.33332C8.66666 4.96513 8.36818 4.66666 7.99999 4.66666C7.63181 4.66666 7.33333 4.96513 7.33333 5.33332C7.33333 5.70151 7.63181 5.99999 7.99999 5.99999Z"
      strokeLinecap="square"
    />
    <path
      className="fill"
      d="M7.99999 15.3333C8.36818 15.3333 8.66666 15.0348 8.66666 14.6667C8.66666 14.2985 8.36818 14 7.99999 14C7.63181 14 7.33333 14.2985 7.33333 14.6667C7.33333 15.0348 7.63181 15.3333 7.99999 15.3333Z"
      strokeLinecap="square"
    />
    <path
      className="fill"
      d="M12 10.6667C12.3682 10.6667 12.6667 10.3682 12.6667 9.99999C12.6667 9.6318 12.3682 9.33332 12 9.33332C11.6318 9.33332 11.3333 9.6318 11.3333 9.99999C11.3333 10.3682 11.6318 10.6667 12 10.6667Z"
      strokeLinecap="square"
    />
    <path
      className="fill"
      d="M12 5.99999C12.3682 5.99999 12.6667 5.70151 12.6667 5.33332C12.6667 4.96513 12.3682 4.66666 12 4.66666C11.6318 4.66666 11.3333 4.96513 11.3333 5.33332C11.3333 5.70151 11.6318 5.99999 12 5.99999Z"
      strokeLinecap="square"
    />
    <path
      className="fill"
      d="M12 15.3333C12.3682 15.3333 12.6667 15.0348 12.6667 14.6667C12.6667 14.2985 12.3682 14 12 14C11.6318 14 11.3333 14.2985 11.3333 14.6667C11.3333 15.0348 11.6318 15.3333 12 15.3333Z"
      strokeLinecap="square"
    />
  </svg>
)