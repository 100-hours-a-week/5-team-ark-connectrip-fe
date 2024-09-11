'use client'
import { create } from 'zustand'

interface ChatRoomState {
  chatRoomId: number
  postId: number
  setChatRoom: (chatRoomData: { chatRoomId: number; postId: number }) => void
  clearChatRoom: () => void
  resetChatRoom: (chatRoomId: number, postId: number) => void
}

const useChatRoomStore = create<ChatRoomState>((set) => ({
  chatRoomId: 0,
  postId: 0,

  // chatRoomId와 postId를 설정
  setChatRoom: ({ chatRoomId, postId }) =>
    set({
      chatRoomId,
      postId,
    }),

  // chatRoomId와 postId를 초기화
  clearChatRoom: () =>
    set({
      chatRoomId: 0,
      postId: 0,
    }),

  // chatRoomId와 postId를 새로운 값으로 재설정
  resetChatRoom: (chatRoomId, postId) =>
    set({
      chatRoomId,
      postId,
    }),
}))

export default useChatRoomStore
