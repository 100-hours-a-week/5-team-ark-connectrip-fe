import React from 'react'

// utils/linkify.ts
export const linkify = (text: string) => {
  const urlPattern = /(https?:\/\/[^\s]+)/g
  return text.split(urlPattern).map((part, index) => {
    if (urlPattern.test(part)) {
      return (
        <React.Fragment key={index}>
          <a
            href={part}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500 underline'
          >
            {part}
          </a>
        </React.Fragment>
      )
    }
    return part
  })
}
