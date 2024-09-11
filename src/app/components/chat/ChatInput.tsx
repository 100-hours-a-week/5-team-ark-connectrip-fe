import React from 'react'

interface ChatInputProps {
  content: string
  setContent: (value: string) => void
  onSendMessage: () => void
}

const ChatInput: React.FC<ChatInputProps> = ({
  content,
  setContent,
  onSendMessage,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSendMessage()
  }

  return (
    <div className='px-4 py-2 fixed w-full max-w-[500px] bg-white bottom-[60px] z-10'>
      <form className='flex items-center w-full' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='메시지를 입력하세요.'
          className='flex-1 w-full h-[35px] p-2 px-4 border border-gray-300 rounded-full focus:border-sub focus:border-2 outline-none'
          value={content}
          onChange={(e) => {
            const value = e.target.value
            if (value.length <= 258) {
              setContent(value)
            }
          }}
        />
        <button
          type='submit'
          className='ml-3 h-[35px] bg-sub text-white py-0 px-5 rounded-full text-sm whitespace-nowrap'
        >
          전송
        </button>
      </form>
    </div>
  )
}

export default ChatInput
